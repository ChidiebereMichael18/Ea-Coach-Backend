const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllBuses,
  createBus,
  updateBus,
  deleteBus,
  getAllBookings
} = require('../controllers/adminController');
// const { protect, admin } = require('../middleware/auth');

// All admin routes require authentication and admin role
// router.use(protect, admin);

// User management
router.get('/users', getAllUsers);

// Bus management
router.get('/buses', getAllBuses);
router.post('/buses', createBus);
router.put('/buses/:id', updateBus);
router.delete('/buses/:id', deleteBus);

// Booking management
router.get('/bookings', getAllBookings);

module.exports = router;