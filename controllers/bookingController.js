const Booking = require('../models/Booking');
const Bus = require('../models/Bus');

// @desc    Create a booking
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const {
      busId,
      from,
      to,
      departureDate,
      departureTime,
      passengers,
      totalSeats,
      totalAmount,
      paymentMethod
    } = req.body;

    // Get bus details
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      bus: busId,
      route: {
        from,
        to,
        departureDate,
        departureTime,
        price: bus.route.price
      },
      passengers,
      totalSeats,
      totalAmount,
      paymentMethod,
      bookedSeats: passengers.map(p => p.seatNumber)
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('bus', 'busNumber busType amenities')
      .sort('-createdAt');
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('bus', 'busNumber busType amenities operator');
    
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update booking payment status (simulated payment)
// @route   PUT /api/bookings/:id/pay
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (booking) {
      booking.paymentStatus = paymentStatus;
      await booking.save();
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  createBooking, 
  getUserBookings, 
  getBookingById, 
  updatePaymentStatus 
};