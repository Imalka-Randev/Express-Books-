import { type FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import apiClient from '../../api/axiosConfig';

interface ProfileOverviewProps {
  user: any;
  purchasedBooks: any[];
  rentedBooks: any[];
}

const ProfileOverview: FC<ProfileOverviewProps> = ({ user, purchasedBooks, rentedBooks }) => {
  const booksPurchased = purchasedBooks.length;
  const booksRented = rentedBooks.length;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const token = useSelector((state: RootState) => state.auth.token);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setMessage({ type: 'error', text: 'Please fill in both password fields.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await apiClient.put('/auth/update-password', {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage({ type: 'success', text: response.data.message });
      setOldPassword('');
      setNewPassword('');
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update password.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        {/* Page Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display-lg">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account settings and view your reading journey.</p>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-white dark:bg-[#112240]/70 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between items-start relative overflow-hidden group hover:-translate-y-1 transition-transform border border-gray-200 dark:border-white/10 shadow-lg">
            <span className="material-symbols-outlined text-primary-container mb-4 text-3xl">shopping_bag</span>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold mb-1">Books Purchased</p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{booksPurchased}</p>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white dark:bg-[#112240]/70 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between items-start relative overflow-hidden group hover:-translate-y-1 transition-transform border border-gray-200 dark:border-white/10 shadow-lg">
            <span className="material-symbols-outlined text-blue-400 mb-4 text-3xl">book</span>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold mb-1">Books Rented</p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{booksRented}</p>
            </div>
          </div>

          {/* Stat Card 3 (Placeholder) */}
          <div className="bg-white dark:bg-[#112240]/70 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between items-start relative overflow-hidden group hover:-translate-y-1 transition-transform border border-gray-200 dark:border-white/10 shadow-lg">
            <span className="material-symbols-outlined text-green-400 mb-4 text-3xl">schedule</span>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold mb-1">Reading Time</p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">0h</p>
            </div>
          </div>

          {/* Stat Card 4 (Placeholder) */}
          <div className="bg-white dark:bg-[#112240]/70 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between items-start relative overflow-hidden group hover:-translate-y-1 transition-transform border border-gray-200 dark:border-white/10 shadow-lg">
            <span className="material-symbols-outlined text-purple-400 mb-4 text-3xl">task_alt</span>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold mb-1">Completed</p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">0</p>
            </div>
          </div>
        </section>

        {/* User Details & Settings Form */}
        <section className="bg-white dark:bg-[#112240]/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-white/10 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Personal Information</h3>
          
          {message.text && (
            <div className={`p-4 mb-6 rounded-lg text-sm font-bold ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
              {message.text}
            </div>
          )}

          <form className="space-y-6" onSubmit={handlePasswordUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Group */}
              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Full Name</label>
                <input 
                  className="w-full bg-gray-50 dark:bg-[#0a192f] border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg px-4 py-2 opacity-70 cursor-not-allowed outline-none" 
                  type="text" 
                  defaultValue={user?.fullName || ''}
                  disabled
                />
              </div>
              {/* Input Group */}
              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Email Address</label>
                <input 
                  className="w-full bg-gray-50 dark:bg-[#0a192f] border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg px-4 py-2 opacity-70 cursor-not-allowed outline-none" 
                  type="email" 
                  defaultValue={user?.email || ''}
                  disabled
                />
              </div>
              {/* Input Group */}
              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Old Password</label>
                <input 
                  className="w-full bg-gray-50 dark:bg-[#0a192f] border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all outline-none" 
                  type="password" 
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              {/* Input Group */}
              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">New Password</label>
                <input 
                  className="w-full bg-gray-50 dark:bg-[#0a192f] border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all outline-none" 
                  type="password" 
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-6 flex justify-end gap-3 mt-4 border-t border-gray-200 dark:border-white/10">
              <button 
                className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" 
                type="button"
                onClick={() => {
                  setOldPassword('');
                  setNewPassword('');
                  setMessage({ type: '', text: '' });
                }}
              >
                Cancel
              </button>
              <button 
                className="px-6 py-2.5 rounded-full bg-primary text-black font-bold text-sm shadow-sm hover:shadow-md hover:bg-primary-container transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" 
                type="submit"
                disabled={isSubmitting || !oldPassword || !newPassword}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Updating...
                  </>
                ) : 'Update Password'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProfileOverview;
