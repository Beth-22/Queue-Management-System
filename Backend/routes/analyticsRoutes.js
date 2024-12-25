import express from 'express';
import { updateAnalytics, getAnalytics } from '../controllers/analyticsController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

// Admin-only routes
router.post('/', protect, adminOnly, updateAnalytics); // Create or update analytics data
router.get('/', protect, adminOnly, getAnalytics);     // Get analytics data

export default router;
