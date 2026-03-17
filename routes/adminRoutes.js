const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllBuses,
  createBus,
  updateBus,
  deleteBus,
  getAllBookings,
  getAllDrivers,
  createDriver,
  updateDriver,
  deleteDriver
} = require('../controllers/adminController');
// const { protect, admin } = require('../middleware/auth');

// All admin routes require authentication and admin role
// router.use(protect, admin);

// User management
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Bus management
router.get('/buses', getAllBuses);
router.post('/buses', createBus);
router.put('/buses/:id', updateBus);
router.delete('/buses/:id', deleteBus);

// Driver management
router.get('/drivers', getAllDrivers);
router.post('/drivers', createDriver);
router.put('/drivers/:id', updateDriver);
router.delete('/drivers/:id', deleteDriver);

// Booking management
router.get('/bookings', getAllBookings);

module.exports = router;