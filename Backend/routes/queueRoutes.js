import express from "express";
import {
  createQueue,
  getAllQueues,
  getCreatedQueues,
  getWaitingQueues,
  updateQueueStatus,
  deleteQueue,
} from "../controllers/queueController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", protect, createQueue);              // Create a new queue
router.get("/", protect, getAllQueues);              // Get all queues
router.get("/created", protect, getCreatedQueues);   // Get queues created by the user
router.get("/waiting", protect, getWaitingQueues);   // Get queues the user is waiting for
router.put("/:id", protect, updateQueueStatus);      // Update queue status
router.delete("/:id", protect, deleteQueue);         // Delete a queue

export default router;
