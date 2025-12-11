import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcrypt';
import prisma from './prisma/client.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const TOKEN_TTL_SECONDS = 60 * 60 * 12; // 12 hours

// Google OAuth credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '358854383197-8ohq3jacu2721lc8k2ce5r63brj8mem4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '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';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5175';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL_SECONDS });
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'email is required' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'password is required' });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(404).json({ error: 'Email not registered. Please sign up first.' });
    }

    // If user has a password, verify it
    if (user.password) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    } else {
      // User signed up with Google OAuth, password login not available
      return res.status(401).json({ error: 'Please sign in with Google' });
    }

    const token = signToken({ sub: user.id, email: user.email });
    res.json({ 
      token, 
      user: { 
        email: user.email, 
        id: user.id,
        name: user.name,
        major: user.major,
        yearOfStudy: user.yearOfStudy,
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'email is required' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'password is required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'password must be at least 6 characters' });
    }

    // Ensure Prisma client is connected
    await prisma.$connect().catch(() => {
      // Already connected, ignore error
    });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    const token = signToken({ sub: user.id, email: user.email });
    res.json({ 
      token, 
      user: { 
        email: user.email, 
        id: user.id,
        name: user.name,
        major: user.major,
        yearOfStudy: user.yearOfStudy,
      } 
    });
  } catch (error) {
    console.error('Signup error:', error);
    console.error('Error code:', error.code);
    console.error('Error meta:', error.meta);
    const errorMessage = error.message || 'Failed to create user';
    res.status(500).json({ error: 'Failed to create user', details: errorMessage });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      select: {
        id: true,
        email: true,
        name: true,
        major: true,
        yearOfStudy: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user', details: error.message });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, major, yearOfStudy } = req.body || {};
    
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'name is required' });
    }
    if (!major || typeof major !== 'string' || !major.trim()) {
      return res.status(400).json({ error: 'major is required' });
    }
    if (!yearOfStudy || typeof yearOfStudy !== 'string') {
      return res.status(400).json({ error: 'yearOfStudy is required' });
    }

    // Update user profile in database
    const updatedUser = await prisma.user.update({
      where: { id: req.user.sub },
      data: {
        name: name.trim(),
        major: major.trim(),
        yearOfStudy,
      },
      select: {
        id: true,
        email: true,
        name: true,
        major: true,
        yearOfStudy: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
});

// Google OAuth: Verify ID token from client
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body || {};
    if (!idToken || typeof idToken !== 'string') {
      return res.status(400).json({ error: 'idToken is required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'Invalid token: email not found' });
    }

    const email = payload.email.toLowerCase();
    const googleId = payload.sub; // Google's unique user ID
    const name = payload.name || null;

    // Find or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { googleId },
        ],
      },
    });

    if (!user) {
      // Create new user with Google OAuth
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          name,
        },
      });
    } else if (!user.googleId) {
      // User exists with email/password, link Google account
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId },
      });
    } else if (user.email !== email) {
      // Update email if it changed
      user = await prisma.user.update({
        where: { id: user.id },
        data: { email },
      });
    }

    const token = signToken({ sub: user.id, email: user.email });
    res.json({ 
      token, 
      user: { 
        email: user.email, 
        id: user.id,
        name: user.name,
        major: user.major,
        yearOfStudy: user.yearOfStudy,
      } 
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(401).json({ error: 'Invalid Google token', details: error.message });
  }
});

export default router;
