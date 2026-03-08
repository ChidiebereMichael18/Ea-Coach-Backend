const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide driver name'],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please provide license number'],
    unique: true
  },
  phone: {
    type: String
  },
  experienceYears: {
    type: Number,
    default: 0
  },
  assignedBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Driver', driverSchema);

