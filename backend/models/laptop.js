const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  model: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String, required: true },
  subscriptionType: { type: String, required: true },
  features: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // base64 or URL
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Laptop || mongoose.model('Laptop', laptopSchema);