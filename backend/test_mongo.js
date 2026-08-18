import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log("Connecting to", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => { console.log("Connected!"); process.exit(0); })
  .catch(err => { console.error("Error:", err.message); process.exit(1); });
