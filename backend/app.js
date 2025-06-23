const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('SmartLaptop Finance System Backend Running');
});

// Auth & payment routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const stkpushRoutes = require('./routes/stkpush');
app.use('/api/stkpush', stkpushRoutes);

const inventoryRoutes = require('./routes/inventory');
app.use('/api', inventoryRoutes);

// ✅ New: Data routes for application, clearance, laptops
const dataRoutes = require('./routes/data');
app.use('/api', dataRoutes);

module.exports = app;
