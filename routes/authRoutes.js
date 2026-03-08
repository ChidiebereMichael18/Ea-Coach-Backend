const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  deleteCurrentUser,
  getTotalBookingAmount
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.delete('/profile', protect, deleteCurrentUser);
router.get('/bookings/total-amount', protect, getTotalBookingAmount);

module.exports = router;