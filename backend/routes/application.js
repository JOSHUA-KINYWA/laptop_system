const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // ✅ make sure this path is correct

const {
  applyLaptop,
  getApplications,
  updateApplicationStatus
} = require('../controllers/laptopapplication');

// ✅ Apply Laptop - only 'student' role
router.post('/apply', auth('student'), applyLaptop);

// ✅ Get Applications - any authenticated user (no role restriction)
router.get('/', auth(), getApplications);

// ✅ Admin can update status
router.put('/:id/status', auth('admin'), updateApplicationStatus);

module.exports = router;
