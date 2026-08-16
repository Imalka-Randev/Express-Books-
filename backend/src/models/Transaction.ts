import mongoose, { Document, Schema } from 'mongoose';

/* =========================================================================
   TRANSACTION MODEL (The Glue)
   The UI shows "Books Purchased", "Rented", and "Shared". 
   Instead of putting all this data inside the User or Book model, we create 
   a "Transaction" model to link a User and a Book together. 
   ========================================================================= */

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId; // A link to the User model
  bookId: mongoose.Types.ObjectId; // A link to the Book model
  transactionType: string; // e.g., "Purchase", "Rent", "Share"
  status: string; // e.g., "Active", "Returned", "Pending"
  dueDate?: Date; // Only used if it is a rental
}

const transactionSchema: Schema = new Schema({
  // 'ref' tells Mongoose which model this ID belongs to. This is how we do "Relationships" in MongoDB!
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  
  transactionType: { 
    type: String, 
    required: true,
    enum: ['Purchase', 'Rent', 'Share'] // 'enum' strictly limits what words can be saved here
  },
  status: { 
    type: String, 
    default: 'Active',
    enum: ['Active', 'Returned', 'Pending'] 
  },
  dueDate: { type: Date }
}, {
  timestamps: true 
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
