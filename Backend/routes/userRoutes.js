import express from "express";
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/register', registerUser); // User registration
router.post('/login', loginUser);       // User login

router.get("/profile", protect, getUserProfile); // ✅ New route to get user data

export default router;




