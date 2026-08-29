import { type FC, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { useTranslation } from 'react-i18next';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (location.pathname !== '/') return;
    const observers = new Map<string, IntersectionObserver>();
    const navLinksList = ['home', 'about', 'library', 'community', 'contact'];

    navLinksList.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) setActiveSection(id);
            });
          },
          { rootMargin: '-30% 0px -70% 0px' }
        );
        observer.observe(section);
        observers.set(id, observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  const handleProfileClick = () => {
    navigate(isAuthenticated ? '/profile' : '/login');
  };

  const navLinks = [
    { name: t('nav.home', 'Home'), id: 'home' },
    { name: t('nav.about', 'About'), id: 'about' },
    { name: t('nav.library', 'Library'), id: 'library' },
    { name: t('nav.community', 'Community'), id: 'community' },
    { name: t('nav.contact', 'Contact'), id: 'contact' },
  ];

  const handleScroll = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sharedProps = { navLinks, activeSection, handleScroll, handleProfileClick, isAuthenticated };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-[#0a192f]/80 shadow-sm border-b border-gray-200 dark:border-white/10 transition-colors duration-300">

      {/* Left side logo — always visible */}
      <div className="absolute left-4 md:left-12 top-0 h-16 flex items-center">
        <Link
          to="/"
          className="font-headline-lg text-xl md:text-2xl font-bold text-black dark:text-white hover:opacity-80 transition-opacity"
        >
          Express Books
        </Link>
      </div>

      {/* Desktop Nav — hidden on mobile */}
      <div className="hidden md:block">
        <DesktopNav {...sharedProps} />
      </div>

      {/* Mobile Nav — hidden on desktop */}
      <div className="md:hidden">
        <MobileNav {...sharedProps} />
      </div>
    </header>
  );
};

export default Navbar;
