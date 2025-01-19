import express from "express";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js";
import {
  createQueue,
  joinQueue,
  completeQueue,
  removeExpiredCustomers,
  getCustomerQueues,
  getAdminQueues
} from "../controllers/queueController.js";

const router = express.Router();

// Admin-only route to create a queue
router.post("/create", protect, verifyAdmin, createQueue);

// Customer joins a queue
router.post("/join/:queueId", protect, joinQueue);

// Customer marks queue as completed
router.post("/complete/:queueId", protect, completeQueue);

// Get queues for customers
router.get("/customer", protect, getCustomerQueues);

// Get queues for admin
router.get("/admin", protect, verifyAdmin, getAdminQueues);

// Auto-remove expired customers every 15 minutes
setInterval(removeExpiredCustomers, 15 * 60 * 1000);

export default router;
