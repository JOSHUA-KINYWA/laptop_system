const express = require('express');
const router = express.Router();

// Dummy handler for M-Pesa STK push
router.post('/', async (req, res) => {
  try {
    console.log('Received body:', req.body); 
    const { phoneNumber } = req.body;

    // Basic validation
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    // TODO: Integrate with M-Pesa API here

    // For now, just simulate success
    res.json({ success: true, message: 'STK push simulated (no real payment made)' });
  } catch (err) {
    console.error('❌ Error in /api/stkpush:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;


MediaCapabilities