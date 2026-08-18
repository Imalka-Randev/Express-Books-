import { type FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { setCartOpen } from '../../store/cartSlice';
import ThemeLanguageToggle from '../ui/ThemeLanguageToggle';

interface NavLink { name: string; id: string; }
interface MobileNavProps {
  navLinks: NavLink[];
  activeSection: string;
  handleScroll: (id: string) => void;
  handleProfileClick: () => void;
  isAuthenticated: boolean;
}

const MobileNav: FC<MobileNavProps> = ({
  navLinks,
  activeSection,
  handleScroll,
  handleProfileClick,
  isAuthenticated,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    handleScroll(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex justify-end items-center px-4 w-full h-16">
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={() => dispatch(setCartOpen(true))}
            className="relative p-2 text-gray-700 dark:text-gray-300"
          >
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Profile */}
          <div
            onClick={handleProfileClick}
            className="w-8 h-8 rounded-full border-2 border-primary dark:border-secondary overflow-hidden cursor-pointer"
          >
            <img
              className="w-full h-full object-cover"
              alt="User Avatar"
              src={isAuthenticated
                ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                : 'https://ui-avatars.com/api/?name=Guest&background=f1f5f9&color=94a3b8'}
            />
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Slide-down Mobile Menu */}
      <div
        className={`absolute top-16 left-0 right-0 bg-white/95 dark:bg-[#0a192f]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-left py-3 px-4 rounded-xl text-base font-medium transition-all ${
                activeSection === link.id && location.pathname === '/'
                  ? 'text-[#e9c400] bg-[#e9c400]/10 font-bold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#e9c400]'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Bottom row: theme & language */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-white/5">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Settings</span>
          <ThemeLanguageToggle className="flex gap-2 items-center" />
        </div>
      </div>
    </>
  );
};

export default MobileNav;
