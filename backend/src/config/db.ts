import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return; // Already connected
  }
  try {
    const mongoUri = process.env.MONGO_URI as string;
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('✅ Successfully connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    // process.exit(1); -> Removed because it crashes Serverless functions
  }
};

export default connectDB;
