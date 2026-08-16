import mongoose, { Document, Schema } from 'mongoose';

/* =========================================================================
   COMMUNITY POST MODEL
   The UI has a "Community Hub" section. This model represents a single 
   discussion post created by a user.
   ========================================================================= */

export interface ICommunityPost extends Document {
  authorId: mongoose.Types.ObjectId; // Links to the User who wrote it
  title: string;
  content: string;
  likes: number;
  tags: string[]; // e.g., ["Discussion", "Review", "Looking to Borrow"]
}

const communityPostSchema: Schema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  tags: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model<ICommunityPost>('CommunityPost', communityPostSchema);
