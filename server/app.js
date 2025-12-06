import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import corsMiddleware from './middleware/cors.middleware.js';
import { registerRoutes } from './routes/index.js';
import config from './config/index.js';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create and configure Express application
 * @returns {Express} - Configured Express app
 */
export function createApp() {
  const app = express();

  // Middleware
  app.use(corsMiddleware);
  app.use(express.json());

  // Routes
  registerRoutes(app);

  // Production: Serve React client
  if (config.isProduction) {
    setupProductionClient(app);
  }

  return app;
}

/**
 * Setup static file serving and SPA routing for production
 * @param {Express} app - Express application instance
 */
function setupProductionClient(app) {
  const clientDistPath = path.resolve(__dirname, '../client/dist');

  if (!fs.existsSync(clientDistPath)) {
    console.warn(
      `Client build directory not found at ${clientDistPath}. ` +
      'Run "cd client && npm run build" before starting the server.'
    );
    return;
  }

  // Serve static assets from the React build
  app.use(express.static(clientDistPath));

  // Fallback to index.html for any non-API route (SPA routing)
  app.get('*', (req, res, next) => {
    const isApiRoute = req.path.startsWith('/auth') ||
                       req.path.startsWith('/api') ||
                       req.path.startsWith('/health');

    if (isApiRoute) {
      return next();
    }

    return res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

export default createApp;

