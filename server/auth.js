import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

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

router.post('/login', (req, res) => {
  const { email } = req.body || {};
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'email is required' });
  }
  const token = signToken({ sub: email, email });
  res.json({ token, user: { email } });
});

router.post('/signup', (req, res) => {
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
  // TODO: Hash password and store in database
  // For now, we just validate it exists and create the token
  const token = signToken({ sub: email, email });
  res.json({ token, user: { email } });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: { email: req.user.email } });
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

    const email = payload.email;
    const token = signToken({ sub: email, email });
    res.json({ token, user: { email } });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(401).json({ error: 'Invalid Google token', details: error.message });
  }
});

export default router;
