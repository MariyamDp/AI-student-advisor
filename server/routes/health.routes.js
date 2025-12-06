import { Router } from 'express';

const router = Router();

/**
 * @route   GET /health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

export default router;

