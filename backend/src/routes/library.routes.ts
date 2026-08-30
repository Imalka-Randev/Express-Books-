import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { checkoutSchema, extendRentalSchema } from '../schemas/library.schema.js';
import { checkout, getLibrary, extendRental } from '../controllers/library.controller.js';

const router = express.Router();

// Apply auth middleware to all library routes
router.use(protect);

router.post('/checkout', validate(checkoutSchema), checkout);
router.get('/', getLibrary);
router.post('/extend', validate(extendRentalSchema), extendRental);

export default router;
