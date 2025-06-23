const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const emailLower = email.toLowerCase().trim();

    // Find user by normalized email
    const user = await User.findOne({ email: emailLower });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check password match using your schema method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT payload and sign token
    const payload = { id: user._id, role: user.role }; // <-- changed userId to id
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send back token and user info (without password)
    res.json({
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;