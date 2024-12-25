import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import queueRoutes from './routes/queueRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Import middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import logger from './middleware/loggerMiddleware.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(logger);         // Log requests

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedback', feedbackRoutes);

// Handle undefined routes (404 errors)
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
