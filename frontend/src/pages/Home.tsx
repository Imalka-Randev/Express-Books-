import { type FC } from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import LibrarySection from '../components/sections/LibrarySection';
import CommunitySection from '../components/sections/CommunitySection';
import ContactSection from '../components/sections/ContactSection';

const Home: FC = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      
      <div className="bg-gray-50/50 dark:bg-black/10 border-t border-gray-200 dark:border-white/5">
        <AboutSection />
      </div>

      <div className="border-t-2 border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a192f]">
        <LibrarySection />
      </div>

      <div className="bg-gray-50 dark:bg-black/20 border-t border-gray-200 dark:border-white/5">
        <CommunitySection />
      </div>

      <div className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a192f]">
        <ContactSection />
      </div>
    </div>
  );
};

export default Home;
