import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import validateInputs from '../utils/validateInputs.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    const { name, email, password, isAdmin, adminCode } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Verify Admin Code
        const adminStatus = isAdmin && adminCode === process.env.ADMIN_SECRET;

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin: adminStatus, // Only true if correct Admin Code is provided
        });

        const token = generateToken(user._id);

        res.status(201).json({
            token,
            isAdmin: user.isAdmin, // ✅ Return admin status in response
            message: "User registered successfully."
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const token = generateToken(user._id, user.isAdmin); // Include isAdmin in JWT
        res.json({
            token,
            isAdmin: user.isAdmin, // Ensure frontend receives this
            user: { name: user.name, email: user.email, isAdmin: user.isAdmin }
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user); // ✅ Return full user data (including `isAdmin`)
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

