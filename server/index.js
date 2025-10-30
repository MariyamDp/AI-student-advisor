import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DIFY_API_KEY = process.env.API_KEY;
const DIFY_BASE_URL = process.env.BASE_URL || 'https://api.dify.ai/v1';

app.use(
  cors({
    origin: ['https://ai-student-advisor-1.onrender.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { query, conversationId, inputs } = req.body || {};
    if (!DIFY_API_KEY) {
      return res.status(500).json({ error: 'Server missing DIFY_API_KEY' });
    }
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'query is required' });
    }

    const url = `${DIFY_BASE_URL}/chat-messages`;
    const payload = {
      inputs: inputs || {},
      query,
      response_mode: 'blocking',
      conversation_id: conversationId || undefined,
      user: req.headers['x-user-id'] || req.ip || 'anonymous',
    };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000,
    });

    const data = response.data || {};
    res.json({
      answer: data.answer,
      conversationId: data.conversation_id,
      raw: data,
    });
  } catch (err) {
    const status = err.response?.status || 500;
    res
      .status(status)
      .json({ error: 'Failed to contact Dify', details: err.response?.data || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
