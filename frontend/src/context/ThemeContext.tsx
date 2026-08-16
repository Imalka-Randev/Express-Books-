import { createContext, useState, useEffect,type ReactNode } from 'react';

// 1. Define the TypeScript rules
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 2. Create the empty Context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create the Provider (The engine)
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  
  // State: Check if they previously chose a theme, otherwise default to 'dark'
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'dark'; 
  });

  // Effect: Whenever the theme changes, update the actual HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save their choice to their browser
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Action: A simple function to flip the switch
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};