import app from '../app.js';
import connectDB from '../config/db.js';

// Connect to the database when Vercel spins up this serverless function
connectDB();

// Export the Express app so Vercel can handle the incoming requests
export default app;
