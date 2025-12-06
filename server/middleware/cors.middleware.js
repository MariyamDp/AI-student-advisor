import cors from 'cors';
import config from '../config/index.js';

export const corsMiddleware = cors({
  origin: config.cors.allowedOrigins,
  methods: config.cors.methods,
  allowedHeaders: config.cors.allowedHeaders,
  credentials: config.cors.credentials,
});

export default corsMiddleware;

