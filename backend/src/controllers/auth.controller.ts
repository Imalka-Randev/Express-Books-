import {type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req: Request, res: Response): Promise<void> => {
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

    // 4. Generate a JWT Token
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '7d' });

    // 5. Send success response
    res.status(201).json({
      message: "User created successfully!",
      token: token,
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



export const login = async (req: Request, res: Response): Promise<void> => {
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

    // 3. Generate a new JWT token for the session
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });

    // 4. Send success response
    res.status(200).json({
      message: "Login successful!",
      token: token,
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