import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { signup, login, updatePassword, refresh, logout } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { signupSchema, loginSchema, updatePasswordSchema } from '../schemas/auth.schema.js';

// Rate limiter: max 10 requests per 15 minutes for login/signup
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: { message: 'Too many authentication attempts, please try again after 15 minutes' }
});

const router = Router();

// Define the routes and attach the controller functions with validation & rate limiting
router.post('/signup', authLimiter, validate(signupSchema), signup);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.put('/update-password', protect, validate(updatePasswordSchema), updatePassword);

export default router;