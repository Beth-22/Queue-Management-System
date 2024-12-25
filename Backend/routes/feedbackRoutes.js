import express from 'express';
import { submitFeedback, getServiceFeedback } from '../controllers/feedbackController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/', protect, submitFeedback);         // Submit feedback
router.get('/:service', protect, getServiceFeedback); // Get feedback for a service

export default router;
