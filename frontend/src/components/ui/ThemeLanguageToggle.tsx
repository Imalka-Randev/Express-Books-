import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';

interface ThemeLanguageToggleProps {
  className?: string;
}

const ThemeLanguageToggle: React.FC<ThemeLanguageToggleProps> = ({ className = "absolute top-4 right-4 z-50 flex gap-4" }) => {
  const { i18n } = useTranslation();
  const themeContext = useContext(ThemeContext);

  return (
    <div className={className}>
      <button 
        onClick={themeContext?.toggleTheme} 
        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        title="Toggle Theme"
      >
        <span className={`material-symbols-outlined text-[22px] transition-transform duration-500 ${themeContext?.theme === 'dark' ? '-rotate-180' : 'rotate-0'}`}>
          {themeContext?.theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      <select 
        onChange={(e) => i18n.changeLanguage(e.target.value)} 
        value={i18n.language}
        className="bg-surface-dim text-black px-2 py-1 rounded-lg text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
      >
        <option value="en">English</option>
        <option value="si">සිංහල</option>
        <option value="ta">தமிழ்</option>
      </select>
    </div>
  );
};

export default ThemeLanguageToggle;
