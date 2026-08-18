import { type Response } from 'express';
import User from '../models/User.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export const checkout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { purchasedBooks, rentedBooks } = req.body;
    
    if (!req.user) {
      res.status(401).json({ message: "Not authorized." });
      return;
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Process purchases
    if (purchasedBooks && Array.isArray(purchasedBooks)) {
      purchasedBooks.forEach((bookId: string) => {
        // Ensure no duplicates
        if (!user.purchasedBooks.includes(bookId as any)) {
          user.purchasedBooks.push(bookId as any);
        }
        
        // Remove from rentedBooks if they decided to purchase it
        user.rentedBooks = user.rentedBooks.filter(r => r.book.toString() !== bookId);
      });
    }

    // Process rentals
    if (rentedBooks && Array.isArray(rentedBooks)) {
      rentedBooks.forEach((rentItem: { bookId: string, rentDays: number }) => {
        // Skip if they already own it
        if (user.purchasedBooks.includes(rentItem.bookId as any)) {
          return;
        }

        // Check if already rented
        const existingRent = user.rentedBooks.find(r => r.book.toString() === rentItem.bookId);
        
        if (existingRent) {
          // If already rented, extend the due date
          existingRent.dueDate.setDate(existingRent.dueDate.getDate() + rentItem.rentDays);
        } else {
          // New rental
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + rentItem.rentDays);
          
          user.rentedBooks.push({
            book: rentItem.bookId as any,
            dueDate: dueDate
          });
        }
      });
    }

    await user.save();

    res.status(200).json({ 
      message: "Checkout successful", 
      purchasedBooks: user.purchasedBooks,
      rentedBooks: user.rentedBooks
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ message: "Server error during checkout." });
  }
};

export const getLibrary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized." });
      return;
    }

    // Populate book details
    const user = await User.findById(req.user._id)
      .populate('purchasedBooks')
      .populate('rentedBooks.book');
      
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Filter out rented books that are already purchased (self-healing for bad data)
    const purchasedIds = user.purchasedBooks.map((b: any) => b._id.toString());
    const validRentedBooks = user.rentedBooks.filter((r: any) => !purchasedIds.includes(r.book._id.toString()));
    
    // If we found corrupted duplicates, heal the database silently
    if (validRentedBooks.length !== user.rentedBooks.length) {
       user.rentedBooks = validRentedBooks as any;
       await user.save();
    }

    res.status(200).json({
      purchasedBooks: user.purchasedBooks,
      rentedBooks: user.rentedBooks
    });
  } catch (error) {
    console.error("Get Library Error:", error);
    res.status(500).json({ message: "Server error fetching library." });
  }
};

export const extendRental = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { bookId, daysToExtend } = req.body;
    
    if (!req.user) {
      res.status(401).json({ message: "Not authorized." });
      return;
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const rentItem = user.rentedBooks.find(r => r.book.toString() === bookId);
    
    if (!rentItem) {
      res.status(404).json({ message: "Active rental not found for this book." });
      return;
    }

    // Extend due date
    rentItem.dueDate.setDate(rentItem.dueDate.getDate() + daysToExtend);
    await user.save();

    res.status(200).json({ 
      message: "Rental extended successfully", 
      newDueDate: rentItem.dueDate 
    });
  } catch (error) {
    console.error("Extend Rental Error:", error);
    res.status(500).json({ message: "Server error extending rental." });
  }
};
