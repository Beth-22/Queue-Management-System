import express from 'express';
import { createNotification, getUserNotifications } from '../controllers/notificationController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/', protect, createNotification);        // Create a new notification
router.get('/:userId', protect, getUserNotifications); // Get notifications for a user

export default router;
