import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export const signup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;

    // 1. Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists with this email." });
      return;
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create and save the new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      passwordHash: hashedPassword,
    });
    
    await newUser.save();

    // 4. Generate Tokens
    const { accessToken, refreshToken } = generateTokens(newUser._id.toString());
    
    // Save refresh token to user
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // 5. Send secure cookie and response
    res.cookie('jwt_refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: "User created successfully!",
      token: accessToken, // Access token still goes in JSON body
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
};



export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by their email
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // 2. Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // 3. Generate new tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    
    // Save new refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    // 4. Send secure cookie and response
    res.cookie('jwt_refresh', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: "Login successful!",
      token: accessToken, // Access token goes in body
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

export const updatePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    if (!req.user) {
      res.status(401).json({ message: "Not authorized." });
      return;
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ message: "Incorrect old password." });
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.passwordHash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Update Password Error:", error);
    res.status(500).json({ message: "Server error during password update." });
  }
};

// --- Helper for generating tokens ---
const generateTokens = (userId: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('FATAL: JWT_SECRET environment variable not set');
  }
  
  // Access Token (short-lived: 15 minutes)
  const accessToken = jwt.sign({ userId }, jwtSecret, { expiresIn: '15m' });
  
  // Refresh Token (long-lived: random string)
  const refreshToken = crypto.randomBytes(40).toString('hex');
  
  return { accessToken, refreshToken };
};

// --- Refresh Token Endpoint ---
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const incomingRefreshToken = req.cookies.jwt_refresh;
    
    if (!incomingRefreshToken) {
      res.status(401).json({ message: "No refresh token provided." });
      return;
    }

    // Find the user with this exact refresh token
    const user = await User.findOne({ refreshToken: incomingRefreshToken });
    
    if (!user) {
      // If we got a refresh token but it doesn't match any user, it might be revoked or fake
      res.clearCookie('jwt_refresh');
      res.status(401).json({ message: "Invalid or revoked refresh token." });
      return;
    }

    // Optional: You can rotate the refresh token here by generating a new one
    // We will just issue a new Access Token to keep it simple, letting the Refresh Token live for its full 7 days.
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('FATAL: JWT_SECRET environment variable not set');
    }
    const newAccessToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '15m' });

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error("Refresh Error:", error);
    res.status(500).json({ message: "Server error during token refresh." });
  }
};

// --- Logout Endpoint ---
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const incomingRefreshToken = req.cookies.jwt_refresh;
    
    if (incomingRefreshToken) {
      // Remove refresh token from DB
      await User.findOneAndUpdate(
        { refreshToken: incomingRefreshToken },
        { $unset: { refreshToken: 1 } }
      );
    }
    
    res.clearCookie('jwt_refresh');
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error during logout." });
  }
};