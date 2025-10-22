import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleTheme = () => setIsDark(!isDark);
  const changeLanguage = (lang) => setLanguage(lang);

  const value = {
    isDark,
    toggleTheme,
    language,
    changeLanguage,
    theme: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: isDark ? '#1A1A1A' : 'var(--bg)',
        text: isDark ? '#FFFFFF' : 'var(--text-primary)',
        muted: isDark ? '#A0A0A0' : 'var(--muted)',
      },
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={isDark ? 'theme-dark' : 'theme-light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}