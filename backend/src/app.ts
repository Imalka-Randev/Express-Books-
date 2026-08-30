import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';


import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import libraryRoutes from './routes/library.routes.js';
import paymentRoutes from './routes/payment.routes.js';

// 1. Load environment variables
dotenv.config();

// Import and connect to DB for Serverless compatibility
import connectDB from './config/db.js';

// 2. Initialize the Express application
const app: Express = express();

// Vercel Serverless Middleware: Ensure DB connects before any route runs
app.use(async (req: Request, res: Response, next) => {
  await connectDB();
  next();
});


// 3. Setup Middleware (Request Handling Code)
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',') 
  : ['http://localhost:5173'];
  
app.use(helmet()); // Add secure HTTP headers
app.use(cors({ origin: allowedOrigins, credentials: true })); // Allows secure cookies from React
app.use(express.json()); // Tells Express to parse incoming requests as JSON
app.use(cookieParser()); // Parses cookies attached to incoming requests

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/payment', paymentRoutes);

// 4. Basic Route to test the server
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express Books API!');
});

export default app;


