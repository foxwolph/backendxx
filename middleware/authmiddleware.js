// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

// user authentication middleware
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
  auth(req, res, async () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Admin access denied" });
    }
  });
};

module.exports = { auth, adminAuth };
