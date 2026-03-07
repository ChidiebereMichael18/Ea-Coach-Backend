const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Bus = require('../models/Bus');
const connectDB = require('../config/database');

dotenv.config();
connectDB();

const seedBuses = [
  {
    busNumber: 'UBA-001',
    busType: 'Luxury',
    totalSeats: 53,
    amenities: {
      wifi: true,
      ac: true,
      usbCharging: true,
      entertainment: true,
      bulletproof: false
    },
    route: {
      from: 'Kampala',
      to: 'Nairobi',
      departureTime: '08:00',
      arrivalTime: '18:00',
      distance: '800 km',
      price: 150000
    },
    operator: {
      name: 'Uganda Bus Lines',
      contact: '+256 700 123456',
      logo: 'ubl-logo.png'
    },
    status: 'active'
  },
  {
    busNumber: 'UBA-002',
    busType: 'VIP',
    totalSeats: 53,
    amenities: {
      wifi: true,
      ac: true,
      usbCharging: true,
      entertainment: true,
      bulletproof: true
    },
    route: {
      from: 'Kampala',
      to: 'Kigali',
      departureTime: '09:00',
      arrivalTime: '16:00',
      distance: '500 km',
      price: 120000
    },
    operator: {
      name: 'Royal Express',
      contact: '+256 700 789012',
      logo: 'royal-logo.png'
    },
    status: 'active'
  },
  {
    busNumber: 'UBA-003',
    busType: 'Standard',
    totalSeats: 53,
    amenities: {
      wifi: false,
      ac: true,
      usbCharging: false,
      entertainment: false,
      bulletproof: false
    },
    route: {
      from: 'Jinja',
      to: 'Kampala',
      departureTime: '07:00',
      arrivalTime: '09:00',
      distance: '80 km',
      price: 20000
    },
    operator: {
      name: 'City Link',
      contact: '+256 700 345678',
      logo: 'citylink-logo.png'
    },
    status: 'active'
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Bus.deleteMany();
    console.log('Buses cleared');

    // Insert new data
    await Bus.insertMany(seedBuses);
    console.log('Sample buses created');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();