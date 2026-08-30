import { z } from 'zod';

/** Zod schemas for request body validation on library routes */

export const checkoutSchema = z.object({
  purchasedBooks: z.array(z.string().min(1)).optional().default([]),
  rentedBooks: z.array(z.object({
    bookId: z.string().min(1, 'bookId is required'),
    rentDays: z.number().int().min(7, 'Minimum rental period is 7 days').max(365),
  })).optional().default([]),
  // paymentIntentId is the one-time token issued by /api/payment/create-intent
  paymentIntentId: z.string().min(1, 'A valid paymentIntentId is required'),
});

export const extendRentalSchema = z.object({
  bookId: z.string().min(1, 'bookId is required'),
  daysToExtend: z.number().int().min(1).max(365),
});
