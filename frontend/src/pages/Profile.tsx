import { type FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type RootState, type AppDispatch } from '../store/store';
import { logout } from '../store/authSlice';
import { fetchLibrary } from '../store/librarySlice';

import ProfileSidebar, { type ProfileTab } from '../components/profile/ProfileSidebar';
import ProfileOverview from '../components/profile/ProfileOverview';
import ProfileLibrary from '../components/profile/ProfileLibrary';
import ProfileRentedBooks from '../components/profile/ProfileRentedBooks';
import ProfileCommunity from '../components/profile/ProfileCommunity';
import ProfileNotifications from '../components/profile/ProfileNotifications';

const Profile: FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { purchasedBooks, rentedBooks } = useSelector((state: RootState) => state.library);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');

  // Redirect if not authenticated, fetch library if authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(fetchLibrary());
    }
  }, [isAuthenticated, navigate, dispatch]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // Token exists but user not in store (stale session before user persistence was added)
  // Auto-redirect to login to re-authenticate and populate user
  if (!user) {
    dispatch(logout());
    navigate('/login');
    return null;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <ProfileOverview user={user} purchasedBooks={purchasedBooks} rentedBooks={rentedBooks} />;
      case 'library':
        return <ProfileLibrary purchasedBooks={purchasedBooks} />;
      case 'rented':
        return <ProfileRentedBooks rentedBooks={rentedBooks} />;
      case 'notifications':
        return <ProfileNotifications />;
      case 'community':
        return <ProfileCommunity />;
      default:
        return <ProfileOverview user={user} purchasedBooks={purchasedBooks} rentedBooks={rentedBooks} />;
    }
  };

  return (
    <div className="bg-[#0a192f] text-gray-200 font-body-md min-h-screen flex selection:bg-primary-container selection:text-black">
      <ProfileSidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pt-24 md:pt-12 px-4 md:px-12 pb-24 max-w-[1400px] mx-auto w-full">
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default Profile;
