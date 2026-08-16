import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const THEME_STORAGE_KEY = 'todo_theme_v1';

/**
 * Custom hook for managing Dark/Light/System theme with OS color scheme sync.
 */
export function useTheme() {
  const [themeMode, setThemeMode] = useLocalStorage(THEME_STORAGE_KEY, 'system');
  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (themeMode === 'system' && typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themeMode === 'dark' ? 'dark' : 'light';
  });

  // Re-evaluate active theme whenever mode or OS preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const computeTheme = () => {
      let activeTheme = themeMode;
      if (themeMode === 'system') {
        activeTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      setResolvedTheme(activeTheme);
      document.documentElement.setAttribute('data-theme', activeTheme);
    };

    computeTheme();

    const handleChange = () => {
      if (themeMode === 'system') {
        computeTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light'; // From system to light
    });
  }, [setThemeMode]);

  const setTheme = useCallback((mode) => {
    setThemeMode(mode);
  }, [setThemeMode]);

  return {
    themeMode,       // 'light' | 'dark' | 'system'
    resolvedTheme,   // 'light' | 'dark'
    toggleTheme,
    setTheme,
  };
}
