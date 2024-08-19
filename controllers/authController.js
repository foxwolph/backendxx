const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// user registration
exports.register = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, Address, Gender, password, profilePicture } = req.body;
    try {
        let user = await user.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'user already exists' });
        }
        user = new user({ firstName, lastName, email, phoneNumber, Address, Gender, password, profilePicture });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ token });
    } catch (err) {
        console.error('Registration error:', err);  // Log the error
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);  // Log the error
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

