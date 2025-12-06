import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // Dify API
  dify: {
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL || 'https://api.dify.ai/v1',
  },

  // CORS
  cors: {
    allowedOrigins: [
      'https://ai-student-advisor-1.onrender.com',
      'http://localhost:5175',
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
};

export default config;

