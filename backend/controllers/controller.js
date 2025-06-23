const Laptop = require('../models/laptop');

// Get all laptops
exports.getAllLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a laptop by ID
exports.getLaptopById = async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) return res.status(404).json({ message: 'Laptop not found' });
    res.json(laptop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new laptop
exports.createLaptop = async (req, res) => {
  try {
    const newLaptop = new Laptop(req.body);
    await newLaptop.save();
    res.status(201).json(newLaptop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a laptop
exports.updateLaptop = async (req, res) => {
  try {
    const updatedLaptop = await Laptop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLaptop) return res.status(404).json({ message: 'Laptop not found' });
    res.json(updatedLaptop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a laptop
exports.deleteLaptop = async (req, res) => {
  try {
    const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);
    if (!deletedLaptop) return res.status(404).json({ message: 'Laptop not found' });
    res.json({ message: 'Laptop deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
