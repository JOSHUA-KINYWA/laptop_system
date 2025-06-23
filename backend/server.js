require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://6696-41-89-198-6.ngrok-free.app'
  ],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Serve static frontend build files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Route imports (assuming these exist)
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const laptopRoutes = require('./routes/laptop');
const controllerRoutes = require('./routes/controller');
const applicationRoutes = require('./routes/application');
const dashboardRoutes = require('./routes/dashboard');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/laptops', laptopRoutes);
app.use('/api/controller', controllerRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the SLFS Backend API');
});

// M-Pesa STK Push Route (your existing code)
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const shortcode = process.env.MPESA_SHORTCODE;
const passkey = process.env.MPESA_PASSKEY;
const callbackURL = "https://yourdomain.com/mpesa/callback";
const baseURL = "https://sandbox.safaricom.co.ke";

app.post('/api/stkpush', async (req, res) => {
  const { phoneNumber } = req.body;
  const amount = 1;
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
  const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  try {
    const tokenResponse = await axios.get(`${baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
      auth: {
        username: consumerKey,
        password: consumerSecret
      }
    });

    const accessToken = tokenResponse.data.access_token;

    const stkRes = await axios.post(`${baseURL}/mpesa/stkpush/v1/processrequest`, {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackURL,
      AccountReference: "LaptopRental",
      TransactionDesc: "Laptop rental payment"
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    res.status(200).json({ success: true, response: stkRes.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

const LaptopApplication = require('./models/laptopapplication');

// === Clearance Application Route ===
app.post('/api/clearance/apply', async (req, res) => {
  try {
    const { name, email, laptopId, department, reason } = req.body;

    // Basic validation
    if (!name || !email || !laptopId || !department || !reason) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if laptopId exists in laptops collection
    // Assuming you have a Laptop model (you can import it from ./routes/laptop or define it here)
    // Here is a quick mockup, you should replace it with your actual Laptop model
    /*
    const laptopExists = await Laptop.findOne({ laptopId });
    if (!laptopExists) {
      return res.status(400).json({ error: 'Laptop ID not found in inventory.' });
    }
    */

    // Save new clearance application
    const newApplication = new LaptopApplication({
      name,
      email,
      laptopId,
      department,
      reason
    });

    await newApplication.save();

    res.json({ message: 'Clearance application submitted successfully. Please wait for approval.' });

  } catch (error) {
    console.error('Clearance application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Catch-all route to serve React SPA
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
