import { useState, useEffect } from 'react';

/**
 * Debounce a value — returns the value only after user stops typing for `delay` ms
 * @param {(string|number)} value - The value to debounce (string or number).
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {(string|number)} The debounced value.
 */

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
