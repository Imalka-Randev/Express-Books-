import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return; // Already connected
  }
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('FATAL: MONGO_URI environment variable not set');
    }
    await mongoose.connect(mongoUri, {
      maxPoolSize: 1
    });
    isConnected = true;
    console.log('✅ Successfully connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    // process.exit(1); -> Removed because it crashes Serverless functions
  }
};

export default connectDB;
