import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { checkout, getLibrary, extendRental } from '../controllers/library.controller.js';

const router = express.Router();

// Apply auth middleware to all library routes
router.use(protect);

router.post('/checkout', checkout);
router.get('/', getLibrary);
router.post('/extend', extendRental);

export default router;
