const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const dbUri =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/ea-coach';

    if (!dbUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 10000, // 10s timeout
    });

    console.log('MongoDB connected successfully');
    return mongoose.connection;

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;