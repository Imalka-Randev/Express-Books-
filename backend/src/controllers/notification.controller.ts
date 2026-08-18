import type { Response } from 'express';
import Notification from '../models/Notification.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export const getUserNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filter: any = { user: req.user?._id };
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filter: any = { _id: req.params.id, user: req.user?._id };
    const notification = await Notification.findOneAndUpdate(
      filter,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const markAllAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filter: any = { user: req.user?._id, isRead: false };
    await Notification.updateMany(
      filter,
      { isRead: true }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
