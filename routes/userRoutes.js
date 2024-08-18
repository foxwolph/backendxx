const express = require('express');
const router = express.Router(); 
const user = require('../models/user'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 

// Register user
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, Address, Gender, password, profilePicture } = req.body;

  try {
    // Check if user exists
    let existingUser = await user.findOne({ email }); 
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    let newUser = new user({ firstName, lastName, email, phoneNumber, Address, Gender, password, profilePicture }); // Create new user
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during registration:', error.message); 
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; // This exports the router to be used in your server.js
