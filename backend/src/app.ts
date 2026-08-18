import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import notificationRoutes from './routes/notification.routes.js';

// 1. Load environment variables
dotenv.config();

// 2. Initialize the Express application
const app: Express = express();


// 3. Setup Middleware (Request Handling Code)
app.use(cors()); // Allows our React frontend to communicate with this API
app.use(express.json()); // Tells Express to parse incoming requests as JSON

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/notifications', notificationRoutes);

// 4. Basic Route to test the server
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express Books API!');
});

export default app;


