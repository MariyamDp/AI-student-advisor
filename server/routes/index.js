import authRoutes from '../auth.js';
import chatRoutes from './chat.routes.js';
import healthRoutes from './health.routes.js';
import transcriptRoutes from './transcript.routes.js';

/**
 * Register all application routes
 * @param {Express} app - Express application instance
 */
export function registerRoutes(app) {
  // Health check
  app.use('/health', healthRoutes);

  // Authentication
  app.use('/auth', authRoutes);

  // Chat API
  app.use('/api/chat', chatRoutes);

  // Transcript API
  app.use('/api/transcript', transcriptRoutes);
}

export default registerRoutes;

