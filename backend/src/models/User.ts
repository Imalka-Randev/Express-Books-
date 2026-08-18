import mongoose, { Document, Schema } from 'mongoose';

/* =========================================================================
   USER MODEL
   Based on the 'User Profile' UI design, we need to store their personal 
   info, their settings (location, preferred formats), and their reputation.
   ========================================================================= */

export interface IUser extends Document {
  fullName: string;
  email: string;
  passwordHash: string; // We NEVER save plain text passwords, only hashes!
  role: string; // e.g., "Elite Librarian"
  avatarUrl: string;
  preferredFormats: string; // e.g., "E-Book", "Audiobook"
  location: string;
  reputationScore: number;
  purchasedBooks: mongoose.Types.ObjectId[];
  rentedBooks: {
    book: mongoose.Types.ObjectId;
    dueDate: Date;
  }[];
  refreshToken?: string;
}

const userSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // 'unique' prevents duplicate accounts
  passwordHash: { type: String, required: true },
  role: { type: String, default: "Reader" },
  avatarUrl: { type: String },
  preferredFormats: { type: String, default: "E-Book" },
  location: { type: String },
  reputationScore: { type: Number, default: 0 },
  purchasedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  rentedBooks: [{
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    dueDate: { type: Date }
  }],
  refreshToken: { type: String }
}, {
  timestamps: true 
});

export default mongoose.model<IUser>('User', userSchema);
