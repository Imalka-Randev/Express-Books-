import type { Response } from 'express';
import crypto from 'crypto';
import type { AuthRequest } from '../middleware/auth.middleware.js';

/**
 * In-memory store for payment intents.
 * 
 * In a real app backed by Stripe/Razorpay, this would be stored in Redis or the DB.
 * For this simulated gateway, we use a Map keyed by intentId.
 * 
 * Each intent expires in 10 minutes — enough time to complete the checkout form.
 */
interface PaymentIntent {
  userId: string;
  amount: number;
  items: { bookId: string; type: 'buy' | 'rent'; rentDays?: number }[];
  createdAt: Date;
  used: boolean;
}

// Global in-memory store (persists for the lifetime of the serverless function instance)
const paymentIntents = new Map<string, PaymentIntent>();

const INTENT_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * POST /api/payment/create-intent
 * 
 * Step 1 of 2 in the payment flow.
 * The client sends the cart items and the server issues a one-time payment intent ID.
 * This ID must be presented at checkout to prove a payment was initiated.
 * 
 * Best Practice: In a real gateway (Stripe), this call creates a PaymentIntent
 * server-side, which returns a `client_secret`. The frontend uses the client_secret
 * to render the payment UI. The backend only fulfills the order on webhook confirmation.
 */
export const createPaymentIntent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized.' });
      return;
    }

    // Verify the user's refresh token is still valid (not revoked)
    // This prevents checkout on stale/shared sessions
    const User = (await import('../models/User.js')).default;
    const freshUser = await User.findById(req.user._id).select('refreshToken');
    if (!freshUser || !freshUser.refreshToken) {
      res.status(401).json({ 
        message: 'Your session has expired or been revoked. Please log in again.' 
      });
      return;
    }

    const { items, amount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: 'Cart is empty. Add items before creating a payment intent.' });
      return;
    }

    // Clean up expired intents (keep the store lean on serverless)
    const now = new Date();
    for (const [id, intent] of paymentIntents.entries()) {
      if (now.getTime() - intent.createdAt.getTime() > INTENT_TTL_MS) {
        paymentIntents.delete(id);
      }
    }

    // Generate a cryptographically random, one-time intent ID
    const intentId = `pi_${crypto.randomBytes(24).toString('hex')}`;

    paymentIntents.set(intentId, {
      userId: req.user._id.toString(),
      amount: amount || 0,
      items,
      createdAt: new Date(),
      used: false,
    });

    res.status(201).json({
      paymentIntentId: intentId,
      expiresInSeconds: INTENT_TTL_MS / 1000,
      message: 'Payment intent created. Complete checkout within 10 minutes.',
    });
  } catch (error) {
    console.error('Create Payment Intent Error:', error);
    res.status(500).json({ message: 'Server error creating payment intent.' });
  }
};

/**
 * Exported so library.controller.ts can verify and consume intents at checkout.
 */
export const verifyAndConsumeIntent = (
  intentId: string,
  userId: string
): { valid: boolean; reason?: string } => {
  const intent = paymentIntents.get(intentId);

  if (!intent) {
    return { valid: false, reason: 'Payment intent not found or already expired.' };
  }

  if (intent.used) {
    return { valid: false, reason: 'Payment intent has already been used.' };
  }

  if (intent.userId !== userId) {
    return { valid: false, reason: 'Payment intent does not belong to this user.' };
  }

  const ageMs = new Date().getTime() - intent.createdAt.getTime();
  if (ageMs > INTENT_TTL_MS) {
    paymentIntents.delete(intentId);
    return { valid: false, reason: 'Payment intent has expired. Please restart checkout.' };
  }

  // Mark as used — one-time only
  intent.used = true;
  return { valid: true };
};
