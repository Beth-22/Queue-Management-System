import Admin from '../models/Admin.js';
import User from '../models/User.js';

// Get all users for admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Grant admin role to a user
export const grantAdminRole = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'Admin role granted', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
