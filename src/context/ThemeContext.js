import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'alphacodeai-theme';

export const ThemeProvider = ({ children, initialTheme = 'light', campaign = false }) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', campaign
        ? (theme === 'light' ? '#faf8f1' : '#000000')
        : (theme === 'light' ? '#f4f0e6' : '#050014'));
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, campaign]);

  const value = useMemo(
    () => ({
      theme,
      isLight: theme === 'light',
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
};
