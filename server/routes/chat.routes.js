import { Router } from 'express';
import axios from 'axios';
import { authMiddleware } from '../auth.js';
import config from '../config/index.js';

const router = Router();

/**
 * Clean inputs by removing null/undefined/empty values and converting to strings
 * @param {Object} inputs - Raw inputs object
 * @returns {Object} - Cleaned inputs object
 */
function cleanInputs(inputs) {
  const cleaned = {};
  
  if (inputs && typeof inputs === 'object') {
    Object.keys(inputs).forEach((key) => {
      const value = inputs[key];
      if (value !== null && value !== undefined && value !== '') {
        cleaned[key] = String(value);
      }
    });
  }
  
  return cleaned;
}

/**
 * Build the payload for Dify API
 * @param {Object} params - Request parameters
 * @returns {Object} - Dify API payload
 */
function buildDifyPayload({ query, inputs, conversationId, userId }) {
  const payload = {
    inputs: cleanInputs(inputs),
    query: query.trim(),
    response_mode: 'blocking',
    user: userId,
  };

  if (conversationId && conversationId.trim()) {
    payload.conversation_id = conversationId.trim();
  }

  return payload;
}

/**
 * @route   POST /api/chat
 * @desc    Send message to Dify AI and get response
 * @access  Private (requires authentication)
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { query, conversationId, inputs } = req.body || {};

    // Validate API key
    if (!config.dify.apiKey) {
      return res.status(500).json({ error: 'Server missing DIFY_API_KEY' });
    }

    // Validate query
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'query is required' });
    }

    const url = `${config.dify.baseUrl}/chat-messages`;
    const userId = req.user?.sub || req.user?.email || req.ip || 'anonymous';
    const payload = buildDifyPayload({ query, inputs, conversationId, userId });

    // Debug logging
    console.log('Received inputs from client:', inputs);
    console.log('Sending to Dify API:', JSON.stringify(payload, null, 2));
    console.log('Request URL:', url);

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${config.dify.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000,
      validateStatus: (status) => status < 500,
    });

    // Handle Dify API errors
    if (response.status >= 400) {
      console.error('Dify API error response:', {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

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

    // Validate response
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

    // Handle different error types
    if (err.response) {
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
      return res.status(503).json({
        error: 'Dify API unavailable',
        details: 'The Dify service did not respond. Please try again later.',
      });
    } else {
      return res.status(500).json({
        error: 'Failed to contact Dify',
        details: err.message,
      });
    }
  }
});

export default router;

