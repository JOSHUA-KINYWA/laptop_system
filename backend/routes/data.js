const express = require('express');
const router = express.Router();

// Mock data
const applications = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Approved" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" }
];

const clearance = [
  { email: "john@example.com", status: "Cleared" },
  { email: "jane@example.com", status: "Not Cleared" }
];

const laptops = [
  { email: "john@example.com", brand: "HP Pavilion" },
  { email: "jane@example.com", brand: "Dell Inspiron" }
];

// Routes
router.get('/application', (req, res) => {
  res.json(applications);
});

router.get('/clearance', (req, res) => {
  res.json(clearance);
});

router.get('/available-laptops', (req, res) => {
  res.json(laptops);
});

module.exports = router;
