const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// ⚠️ Optional: fallback secret in dev
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Normalize email and check if user exists
    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create and save new user (password is hashed in model)
    user = new User({
      email: normalizedEmail,
      password,
      role: ['student', 'admin'].includes(role) ? role : 'student',
    });

    await user.save();

    // Generate JWT
    const payload = { id: user._id, role: user.role }; // <-- FIXED
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Normalize and find user
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password using schema method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = { id: user._id, role: user.role }; // <-- FIXED
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;