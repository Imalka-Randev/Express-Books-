import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: 'purchase_success' | 'rental_due_soon' | 'new_arrival';
  title: string;
  message: string;
  isRead: boolean;
  relatedBookId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['purchase_success', 'rental_due_soon', 'new_arrival'], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  relatedBookId: { type: Schema.Types.ObjectId, ref: 'Book' },
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', NotificationSchema);
