import { type FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/authSlice';
import type { AppDispatch } from '../../store/store';

export type ProfileTab = 'overview' | 'library' | 'rented' | 'notifications' | 'community';

interface ProfileSidebarProps {
  user: any;
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
}

const ProfileSidebar: FC<ProfileSidebarProps> = ({ user, activeTab, setActiveTab }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const navItems: { id: ProfileTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Profile', icon: 'person' },
    { id: 'library', label: 'My Library', icon: 'library_books' },
    { id: 'rented', label: 'Rented Books', icon: 'history_edu' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'community', label: 'Community', icon: 'groups' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Mobile Top App Bar (Hidden on md+) */}
      <header className="md:hidden bg-white dark:bg-[#0f172a]/80 backdrop-blur-md shadow-sm fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-white/10">
        <div className="font-display-lg text-2xl font-bold text-primary-fixed cursor-pointer" onClick={() => navigate('/')}>Express Book</div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`${activeTab === 'notifications' ? 'text-primary-fixed' : 'text-gray-700 dark:text-gray-200'} hover:text-black dark:hover:text-white transition-colors scale-95 active:scale-90 transition-transform`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'notifications' ? 'icon-fill' : ''}`}>notifications</span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors scale-95 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">home</span>
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors scale-95 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* Slide-down Mobile Menu (Hidden on md+) */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-[#0f172a]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-40 ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium transition-all ${
                activeTab === item.id
                  ? 'text-black bg-primary-fixed font-bold'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-primary-fixed'
              }`}
            >
              <span className={`material-symbols-outlined ${activeTab === item.id ? 'icon-fill' : ''}`}>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="my-2 border-t border-gray-200 dark:border-white/10" />
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium text-red-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-red-500 transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </nav>
      </div>

      {/* SideNavBar (Hidden on Mobile) */}
      <nav className="hidden md:flex flex-col h-screen py-8 px-4 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f172a] shadow-md w-64 fixed left-0 top-0 z-40">
        <div className="mb-8 px-4">
          <div 
            className="font-headline-lg text-2xl font-bold text-primary-fixed mb-6 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Express Book
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-fixed bg-primary-container text-black flex items-center justify-center font-bold text-lg">
              {getInitials(user?.fullName || 'User')}
            </div>
            <div>
              <div className="font-title-md text-lg font-bold text-gray-900 dark:text-white truncate max-w-[120px]">{user?.fullName}</div>
              <div className="font-label-md text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'Reader'}</div>
            </div>
          </div>
        </div>

        {/* Removed Share a Book CTA as requested */}

        <ul className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all translate-x-1 duration-200 group ${
                    isActive
                      ? 'text-primary-fixed font-bold bg-primary-fixed/10 border-l-4 border-primary-fixed !rounded-r-lg !rounded-l-none'
                      : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span 
                    className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive ? 'icon-fill' : ''}`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label-md text-sm font-semibold">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-gray-200 dark:border-white/10 pt-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => navigate('/')}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-[20px]">home</span>
                <span>Home</span>
              </button>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors text-sm group"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">logout</span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default ProfileSidebar;
