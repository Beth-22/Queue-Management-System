import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import validateInputs from '../utils/validateInputs.js';

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        validateInputs(req.body, ['name', 'email', 'password']);

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        res.status(201).json({ token, user: { name, email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// User login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        validateInputs(req.body, ['email', 'password']);

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
