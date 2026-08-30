import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

import type { Document } from 'mongoose';

export interface IUserDocument extends Document {
  _id: any;
  fullName: string;
  email: string;
  role: string;
  purchasedBooks: any[];
  rentedBooks: any[];
  refreshToken?: string;
  passwordHash: string;
}

export interface AuthRequest extends Request {
  user?: IUserDocument;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!token) throw new Error("No token");
      
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('FATAL: JWT_SECRET environment variable not set');
      }
      const decoded: any = jwt.verify(token, jwtSecret);

      req.user = await User.findById(decoded.userId).select('-passwordHash');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
