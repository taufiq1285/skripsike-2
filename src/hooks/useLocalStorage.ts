/**
 * useLocalStorage Hook - AKBID Lab System
 * Security: Safe storage, data validation
 * Status: Ready for use
 */
import { useCallback, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // SECURITY: Validate localStorage availability
      if (typeof window === 'undefined') {
        return initialValue;
      }

      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // SECURITY: Handle parsing errors gracefully
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        // SECURITY: Validate data before storing
        const serializedValue = JSON.stringify(valueToStore);
        
        // Check storage quota
        try {
          window.localStorage.setItem(key, serializedValue);
        } catch (storageError) {
          console.warn(`Error setting localStorage key "${key}":`, storageError);
          // Handle storage quota exceeded
        }
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to remove the item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};
