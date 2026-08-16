import mongoose, { Document, Schema } from 'mongoose';

/* =========================================================================
   PART 1: THE INTERFACE (The Architect - For TypeScript Development)
   =========================================================================
   This interface only exists while we are coding in VS Code. It gives us 
   auto-complete and catches typos. 
   
   Why 'extends Document'?
   We tell TypeScript: "A Book has our custom fields (title, price, etc.) 
   PLUS (+) all the hidden database features Mongoose adds like '_id' and '.save()'."
*/
export interface IBook extends Document {
  title: string;
  author: string;
  synopsis: string;
  buyPrice: number;
  rentPrice: number;
  formatsAvailable: string[]; // e.g., ["Physical", "PDF", "Rent"]
  deliveryInfo: string;
  coverImageUrl: string;
  spineImageUrl: string;
  openPagesImageUrl: string;
  averageRating: number;
  totalReviews: number;
  // We can even define nested arrays of objects!
  reviews: {
    reviewerName: string;
    avatarUrl: string;
    rating: number;
    comment: string;
    isTopReviewer: boolean;
  }[];
}

/* =========================================================================
   PART 2: THE SCHEMA (The Bouncer - For Runtime Database Protection)
   =========================================================================
   This is the actual rulebook that runs on the live server. It physically 
   intercepts data coming from users over the internet and blocks bad data 
   from getting into MongoDB.
*/
const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: { type: String, required: true },
  buyPrice: { type: Number, required: true },
  rentPrice: { type: Number, required: true },
  formatsAvailable: [{ type: String }], 
  deliveryInfo: { type: String },
  coverImageUrl: { type: String, required: true },
  spineImageUrl: { type: String },
  openPagesImageUrl: { type: String },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  
  reviews: [{
    reviewerName: { type: String },
    avatarUrl: { type: String },
    rating: { type: Number },
    comment: { type: String },
    isTopReviewer: { type: Boolean, default: false }
  }]
}, {
  // Mongoose automatically adds 'createdAt' and 'updatedAt' timestamps to every book
  timestamps: true 
});

/* =========================================================================
   PART 3: THE MODEL (The Tool)
   =========================================================================
   This takes the Schema rulebook and turns it into a powerful object that 
   can actually talk to the database (using Book.find(), Book.create(), etc.)
   
   The string 'Book' tells Mongoose to automatically create a collection 
   in the database named 'books' (lowercase and pluralized).
*/
const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
