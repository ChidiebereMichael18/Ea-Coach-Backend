const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: [true, 'Please provide bus number'],
    unique: true
  },
  busType: {
    type: String,
    required: [true, 'Please provide bus type'],
    enum: ['Standard', 'Luxury', 'VIP', 'Executive']
  },
  totalSeats: {
    type: Number,
    default: 53
  },
  amenities: {
    wifi: { type: Boolean, default: false },
    ac: { type: Boolean, default: false },
    usbCharging: { type: Boolean, default: false },
    entertainment: { type: Boolean, default: false },
    bulletproof: { type: Boolean, default: false }
  },
  route: {
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    distance: { type: String },
    price: { type: Number, required: true }
  },
  operator: {
    name: { type: String, required: true },
    contact: { type: String },
    logo: { type: String }
  },
  status: {
    type: String,
    enum: ['active', 'maintenance', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bus', busSchema);