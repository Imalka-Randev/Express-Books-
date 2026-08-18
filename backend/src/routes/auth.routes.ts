import { Router } from 'express';
import { signup, login, updatePassword, refresh, logout } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Define the routes and attach the controller functions
router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.put('/update-password', protect, updatePassword);

export default router;