import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser); // User registration
router.post('/login', loginUser);       // User login

// Protected routes
router.get('/profile', protect, getUserProfile); // Get user profile (requires authentication)

export default router;
