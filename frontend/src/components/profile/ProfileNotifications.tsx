import { type FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';

interface Notification {
  _id: string;
  type: 'purchase_success' | 'rental_due_soon' | 'new_arrival';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const ProfileNotifications: FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:5000/api/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`http://localhost:5000/api/notifications/read-all`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'purchase_success': return { icon: 'check_circle', color: 'text-green-400', bg: 'bg-green-400/10' };
      case 'rental_due_soon': return { icon: 'schedule', color: 'text-red-400', bg: 'bg-red-400/10' };
      case 'new_arrival': return { icon: 'new_releases', color: 'text-blue-400', bg: 'bg-blue-400/10' };
      default: return { icon: 'notifications', color: 'text-primary-container', bg: 'bg-primary-container/10' };
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-full">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-display-lg">Notifications</h1>
          <p className="text-gray-400">Stay updated on your rentals, purchases, and new arrivals.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-blue-400 hover:text-blue-300 font-bold transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">done_all</span>
            Mark all as read
          </button>
        )}
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-container border-t-transparent"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-[#112240]/40 rounded-2xl border border-white/5">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-50">notifications_off</span>
          <p className="text-lg font-bold text-white mb-2">No notifications</p>
          <p className="text-sm max-w-md text-center mb-6">You're all caught up! We'll let you know when there are updates.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const { icon, color, bg } = getIconForType(notification.type);
            const date = new Date(notification.createdAt).toLocaleDateString(undefined, {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            return (
              <div 
                key={notification._id} 
                className={`p-4 rounded-xl border transition-all flex gap-4 ${
                  notification.isRead 
                    ? 'bg-[#112240]/50 border-white/5 opacity-70' 
                    : 'bg-[#112240] border-white/20 shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${bg} ${color}`}>
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className={`font-bold ${notification.isRead ? 'text-gray-300' : 'text-white'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{date}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                    {notification.message}
                  </p>
                  
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification._id)}
                      className="mt-3 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileNotifications;
