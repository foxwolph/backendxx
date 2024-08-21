const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } else {
      res.status(400).json({ message: "You are not logged in." });
    }
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      res
        .status(401)
        .json({ message: "Your session has expired. Please log in again." });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = { authenticateUser };
