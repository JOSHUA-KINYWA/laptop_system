const express = require('express');
const router = express.Router();
const Laptop = require('../models/laptop');
const Application = require('../models/laptopapplication');

// GET /api/dashboard/summary
router.get('/summary', async (req, res) => {
  try {
    const laptops = await Laptop.find();
    const applications = await Application.countDocuments();

    const summary = {
      totalLaptops: laptops.length,
      applications,
      subscriptions: {
        daily: laptops.filter(l => l.subscriptionType === 'daily').length,
        weekly: laptops.filter(l => l.subscriptionType === 'weekly').length,
        monthly: laptops.filter(l => l.subscriptionType === 'monthly').length,
        rented: laptops.filter(l => l.isRented).length,
      }
    };

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching summary' });
  }
});

module.exports = router;

const express = require('express');
