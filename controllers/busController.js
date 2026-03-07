const Bus = require('../models/Bus');

// @desc    Get all buses
// @route   GET /api/buses
const getBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    let query = { status: 'active' };

    if (from && to) {
      query['route.from'] = from;
      query['route.to'] = to;
    }

    const buses = await Bus.find(query);
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single bus
// @route   GET /api/buses/:id
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (bus) {
      res.json(bus);
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Search available buses
// @route   GET /api/buses/search
const searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    
    const buses = await Bus.find({
      'route.from': { $regex: from, $options: 'i' },
      'route.to': { $regex: to, $options: 'i' },
      status: 'active'
    });

    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getBuses, getBusById, searchBuses };