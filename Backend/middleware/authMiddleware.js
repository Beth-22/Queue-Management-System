import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes by verifying the JWT
const protect = async (req, res, next) => {
    let token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user data to the request object (excluding password)
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token verification failed, not authorized' });
    }
};

export default protect;
