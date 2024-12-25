import express from 'express';
import { getAllUsers, grantAdminRole } from '../controllers/adminController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

// Admin-only routes
router.get('/users', protect, adminOnly, getAllUsers);    // Get all users
router.post('/grant-admin', protect, adminOnly, grantAdminRole); // Grant admin role to a user

export default router;
