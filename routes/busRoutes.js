const express = require('express');
const router = express.Router();
const { getBuses, getBusById, searchBuses } = require('../controllers/busController');

router.get('/', getBuses);
router.get('/search', searchBuses);
router.get('/:id', getBusById);

module.exports = router;