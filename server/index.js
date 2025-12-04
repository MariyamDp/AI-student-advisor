import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes, { authMiddleware } from './auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DIFY_API_KEY = process.env.API_KEY;
const DIFY_BASE_URL = process.env.BASE_URL || 'https://api.dify.ai/v1';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: ['https://ai-student-advisor-1.onrender.com', 'http://localhost:5175', 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());

// Auth routes
app.use('/auth', authRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', authMiddleware, async (req, res) => {
  try {
    const { query, conversationId, inputs } = req.body || {};
    if (!DIFY_API_KEY) {
      return res.status(500).json({ error: 'Server missing DIFY_API_KEY' });
    }
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'query is required' });
    }

    // Debug: Log inputs received from client
    console.log('Received inputs from client:', inputs);
    console.log('DIFY_API_KEY exists:', !!DIFY_API_KEY);
    console.log('DIFY_BASE_URL:', DIFY_BASE_URL);

    const url = `${DIFY_BASE_URL}/chat-messages`;
    
    // Clean inputs - remove null/undefined values and ensure proper types
    const cleanInputs = {};
    if (inputs && typeof inputs === 'object') {
      Object.keys(inputs).forEach(key => {
        const value = inputs[key];
        if (value !== null && value !== undefined && value !== '') {
          cleanInputs[key] = String(value);
        }
      });
    }

    const payload = {
      inputs: cleanInputs,
      query: query.trim(),
      response_mode: 'blocking',
      user: req.user?.sub || req.user?.email || req.ip || 'anonymous',
    };

    // Only include conversation_id if it's provided and not empty
    if (conversationId && conversationId.trim()) {
      payload.conversation_id = conversationId.trim();
    }

    // Debug: Log payload being sent to Dify
    console.log('Sending to Dify API:', JSON.stringify(payload, null, 2));
    console.log('Request URL:', url);

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000,
      validateStatus: (status) => status < 500, // Don't throw on 4xx errors
    });

    // Check if Dify returned an error
    if (response.status >= 400) {
      console.error('Dify API error response:', {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
      
      // Return a more helpful error message
      const errorMessage = response.data?.message || response.data?.error || 'Dify API returned an error';
      return res.status(response.status).json({
        error: 'Dify API error',
        details: {
          status: response.status,
          message: errorMessage,
          code: response.data?.code,
        },
      });
    }

    const data = response.data || {};
    
    if (!data.answer) {
      console.warn('Dify response missing answer field:', data);
      return res.status(500).json({
        error: 'Invalid response from Dify',
        details: 'Response missing answer field',
      });
    }

    res.json({
      answer: data.answer,
      conversationId: data.conversation_id,
      raw: data,
    });
  } catch (err) {
    console.error('Chat API error:', {
      message: err.message,
      code: err.code,
      response: err.response?.data,
      status: err.response?.status,
      stack: err.stack,
    });

    // Handle different types of errors
    if (err.response) {
      // Dify API returned an error response
      const status = err.response.status;
      const errorData = err.response.data || {};
      
      return res.status(status).json({
        error: 'Failed to contact Dify',
        details: {
          status,
          message: errorData.message || errorData.error || 'Unknown error from Dify API',
          code: errorData.code,
        },
      });
    } else if (err.request) {
      // Request was made but no response received
      return res.status(503).json({
        error: 'Dify API unavailable',
        details: 'The Dify service did not respond. Please try again later.',
      });
    } else {
      // Error setting up the request
      return res.status(500).json({
        error: 'Failed to contact Dify',
        details: err.message,
      });
    }
  }
});

// In production, serve the React client and support SPA routing
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.resolve(__dirname, '../client/dist');

  if (fs.existsSync(clientDistPath)) {
    // Serve static assets from the React build
    app.use(express.static(clientDistPath));

    // Fallback to index.html for any non-API route so browser refresh works
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/auth') || req.path.startsWith('/api') || req.path.startsWith('/health')) {
        return next();
      }

      return res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  } else {
    console.warn(`Client build directory not found at ${clientDistPath}. Run "cd client && npm run build" before starting the server.`);
  }
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
