const Laptop = require('../models/laptop');

// Admin: Add new laptop
exports.addLaptop = async (req, res) => {
  try {
    console.log('Received body:', req.body); // Log the incoming data
    const laptop = await Laptop.create(req.body);
    res.status(201).json({ message: 'Laptop added', laptop });
  } catch (err) {
    console.error('Add Laptop Error:', err.message); // Log the error message
    res.status(400).json({ error: err.message });
  }
};

// Admin/User: Get all laptops
exports.getLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Update laptop
exports.updateLaptop = async (req, res) => {
  try {
    const updated = await Laptop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Laptop updated', updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Delete laptop
exports.deleteLaptop = async (req, res) => {
  try {
    await Laptop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Laptop deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
