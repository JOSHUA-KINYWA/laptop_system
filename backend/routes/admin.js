const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', authMiddleware('admin'), (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

module.exports = router;
