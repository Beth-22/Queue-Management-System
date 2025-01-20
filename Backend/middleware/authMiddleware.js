import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Protect Route (Ensures User is Logged In)
export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized: Invalid token." });
    }
};

// ✅ Verify Admin Access
export const verifyAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: "Unauthorized: Admins only." });
    }
    next();
};

export default protect;