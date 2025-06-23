const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addLaptop,
  getLaptops,
  updateLaptop,
  deleteLaptop
} = require('../controllers/laptopcontroller');
const Laptop = require('../models/laptop'); // ✅ ensure this is correct

// 🟢 Public route: get all laptops
router.get('/', getLaptops);

// 🟢 Public route: get one laptop by ID
router.get('/:id', async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) return res.status(404).json({ message: 'Laptop not found' });
    res.json(laptop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔒 Admin-only routes
router.post('/', auth('admin'), addLaptop);
router.put('/:id', auth('admin'), updateLaptop);
router.delete('/:id', auth('admin'), deleteLaptop);

module.exports = router;
