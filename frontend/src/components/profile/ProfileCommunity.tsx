import { type FC } from 'react';

const ProfileCommunity: FC = () => {
  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display-lg">Community</h1>
        <p className="text-gray-500 dark:text-gray-400">Join discussions, write reviews, and connect with other readers.</p>
      </header>

      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-[#112240]/40 rounded-2xl border border-white/5">
        <span className="material-symbols-outlined text-6xl mb-4 opacity-50">forum</span>
        <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Coming Soon</p>
        <p className="text-sm max-w-md text-center mb-6">The community features are currently under development. Soon you'll be able to discuss your favorite books with others!</p>
      </div>
    </div>
  );
};

export default ProfileCommunity;
