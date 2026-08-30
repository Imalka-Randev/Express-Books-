import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createPaymentIntent } from '../controllers/payment.controller.js';

const router = express.Router();

router.use(protect);

router.post('/create-intent', createPaymentIntent);

export default router;
