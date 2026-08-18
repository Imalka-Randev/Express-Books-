import { type FC, type ReactNode } from 'react';
import Navbar from './Navbar';
import CartModal from '../ui/CartModal';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-theme-light-bg dark:bg-[#0a192f] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="w-full">
        {children}
      </main>
      <Footer />
      <CartModal />
    </div>
  );
};

export default Layout;
