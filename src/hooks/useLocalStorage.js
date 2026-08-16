import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for safely interacting with window.localStorage
 * Includes JSON serialization error guards and storage event listening.
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default fallback value
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state with stored value or fallback
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  // Setter function wrapping setItem with error handling
  const setValue = useCallback((value) => {
    try {
      setStoredValue((prev) => {
        const valueToStore = typeof value === 'function' ? value(prev) : value;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        return valueToStore;
      });
    } catch (error) {
      console.error(`[useLocalStorage] Error setting key "${key}":`, error);
    }
  }, [key]);

  // Sync across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (err) {
          console.warn(`[useLocalStorage] Sync error for key "${key}":`, err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
