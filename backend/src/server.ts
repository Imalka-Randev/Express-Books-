import app from './app.js';
// Import our separated database connection logic!
import connectDB from './config/db.js';

const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  connectDB(); // Attempt to connect to the database when the server starts
});
