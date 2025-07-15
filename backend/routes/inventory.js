// routes/inventory.js
const express = require('express');
const router = express.Router();

// Dummy data (replace with DB query)
const inventory = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    laptopBrand: 'HP',
    applicationStatus: 'Approved',
    clearanceStatus: 'Cleared',
    paymentStatus: 'Pending',
    remainingBalance: 200,
  },
  // more records...
];

router.get('/inventory', (req, res) => {
  res.json(inventory);
});

router.post('/inventory/pay/:id', (req, res) => {
  const { id } = req.params;
  // TODO: handle real DB update
  res.json({ message: `Payment received for ID ${id}` });
});

module.exports = router;
const express = require('express');