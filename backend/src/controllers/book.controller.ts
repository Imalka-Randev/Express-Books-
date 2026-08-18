import { type Request, type Response } from 'express';
import Book from '../models/Book.js';

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { genre, search } = req.query;
    
    // Build query object
    let query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { genres: { $regex: search, $options: 'i' } }
      ];
    }
    
    // In the future, we can add a genre field to the model if needed
    // if (genre) query.genre = genre;

    const books = await Book.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
