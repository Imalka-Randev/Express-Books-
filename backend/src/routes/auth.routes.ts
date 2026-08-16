import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';

const router = Router();

// Define the routes and attach the controller functions
router.post('/signup', signup);
router.post('/login', login);

export default router;