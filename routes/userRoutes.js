const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userController = require("../controllers/userController");

// Register user

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

module.exports = router; // This exports the router to be used in your server.js
