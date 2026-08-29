import { type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { setCartOpen } from '../../store/cartSlice';
import ThemeLanguageToggle from '../ui/ThemeLanguageToggle';

interface NavLink { name: string; id: string; }
interface DesktopNavProps {
  navLinks: NavLink[];
  activeSection: string;
  handleScroll: (id: string) => void;
  handleProfileClick: () => void;
  isAuthenticated: boolean;
}

const DesktopNav: FC<DesktopNavProps> = ({
  navLinks,
  activeSection,
  handleScroll,
  handleProfileClick,
  isAuthenticated,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="flex items-center px-4 md:px-12 w-full h-16">
      
      {/* Left spacer — matches logo width to keep nav truly centered */}
      <div className="flex-1" />

      {/* Center: Main Navigation */}
      <nav className="flex items-center justify-center gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            className={`font-label-md text-sm py-1 transition-colors ${
              activeSection === link.id && location.pathname === '/'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-gray-600 dark:text-on-tertiary-fixed-variant hover:text-primary'
            }`}
          >
            {link.name}
          </button>
        ))}
      </nav>

      {/* Right Side: Tools & Profile */}
      <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
        <button
          onClick={() => dispatch(setCartOpen(true))}
          className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-fixed transition-colors hover:scale-110 active:scale-95"
        >
          <ShoppingCart size={22} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm shadow-red-500/50">
              {cartItems.length}
            </span>
          )}
        </button>

        <div
          onClick={handleProfileClick}
          className="w-9 h-9 rounded-full border-2 border-primary dark:border-secondary overflow-hidden active:scale-95 hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer group"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            alt="User Avatar"
            src={isAuthenticated
              ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
              : 'https://ui-avatars.com/api/?name=Guest&background=f1f5f9&color=94a3b8'}
          />
        </div>

        <ThemeLanguageToggle className="flex gap-2" />
      </div>
    </div>
  );
};

export default DesktopNav;
