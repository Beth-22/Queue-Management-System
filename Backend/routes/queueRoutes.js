import express from 'express';
import { createQueue, getAllQueues, updateQueueStatus, deleteQueue } from '../controllers/queueController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/', protect, createQueue);          // Create a new queue entry
router.get('/', protect, getAllQueues);          // Get all queues
router.put('/:id', protect, updateQueueStatus);  // Update queue status
router.delete('/:id', protect, deleteQueue);     // Delete a queue entry

export default router;
