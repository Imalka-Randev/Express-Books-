import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';

interface ThemeLanguageToggleProps {
  className?: string;
}

const ThemeLanguageToggle: React.FC<ThemeLanguageToggleProps> = ({ className = "absolute top-4 right-4 z-50 flex gap-4" }) => {
  const { i18n } = useTranslation();
  const themeContext = useContext(ThemeContext);

  return (
    <div className={className}>
      <select 
        onChange={(e) => i18n.changeLanguage(e.target.value)} 
        value={i18n.language}
        className="bg-surface-dim text-black px-2 py-1 rounded"
      >
        <option value="en">English</option>
        <option value="si">සිංහල</option>
        <option value="ta">தமிழ்</option>
      </select>
      
      <button 
        onClick={themeContext?.toggleTheme} 
        className="bg-primary-container text-black px-4 py-1 rounded font-bold flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[20px]">
          {themeContext?.theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
        {themeContext?.theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </div>
  );
};

export default ThemeLanguageToggle;
