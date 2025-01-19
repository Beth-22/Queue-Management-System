import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Protect Middleware - Ensures User is Authenticated
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Continue to next middleware
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Verify Admin Middleware - Checks Admin Code
export const verifyAdmin = (req, res, next) => {
  const { AdminCode } = req.body;

  if (AdminCode !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Unauthorized. Invalid Admin Code." });
  }

  next();
};

export default protect;