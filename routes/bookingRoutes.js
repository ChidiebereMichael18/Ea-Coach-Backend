const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getUserBookings, 
  getBookingById,
  updatePaymentStatus 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.use(protect); // All booking routes require authentication

router.post('/', createBooking);
router.get('/mybookings', getUserBookings);
router.get('/:id', getBookingById);
router.put('/:id/pay', updatePaymentStatus);

module.exports = router;