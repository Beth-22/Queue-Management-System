import express from "express";
import { getQueues, createQueue } from "../controllers/queueController.js";
import { protect, verifyAdmin } from "../middleware/authMiddleware.js"; // ✅ Protect routes

const router = express.Router();

router.get("/", getQueues); // ✅ Correct GET route: "/api/queues"
router.post("/", protect, verifyAdmin, createQueue); // ✅ Only Admins can create queues

export default router;
