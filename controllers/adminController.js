const User = require('../models/User');
const Bus = require('../models/Bus');
const Booking = require('../models/Booking');

// @desc    Get all users
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all buses (admin)
// @route   GET /api/admin/buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({});
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new bus
// @route   POST /api/admin/buses
const createBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a bus
// @route   PUT /api/admin/buses/:id
const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    
    if (bus) {
      const updatedBus = await Bus.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.json(updatedBus);
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a bus
// @route   DELETE /api/admin/buses/:id
const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    
    if (bus) {
      await bus.deleteOne();
      res.json({ message: 'Bus removed' });
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/admin/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('bus', 'busNumber busType')
      .sort('-createdAt');
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllBuses,
  createBus,
  updateBus,
  deleteBus,
  getAllBookings
};