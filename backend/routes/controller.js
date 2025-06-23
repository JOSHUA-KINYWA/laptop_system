const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/controller');
const authMiddleware = require('../middleware/auth');

// Protect routes, allow only admin and staff roles to create/update/delete
router.get('/', laptopController.getAllLaptops);
router.get('/:id', laptopController.getLaptopById);
router.post('/', authMiddleware(['admin', 'staff']), laptopController.createLaptop);
router.put('/:id', authMiddleware(['admin', 'staff']), laptopController.updateLaptop);
router.delete('/:id', authMiddleware(['admin', 'staff']), laptopController.deleteLaptop);

module.exports = router;
