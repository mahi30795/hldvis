import { useEffect, useRef } from 'react';
import { useDesignStore } from '../store/useDesignStore';

const SAVE_KEY = 'hldvis-design';
const DEBOUNCE_MS = 1000;

export function useAutoSave() {
  const { nodes, edges } = useDesignStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({ nodes, edges }));
      } catch {
        // Ignore storage errors
      }
    }, DEBOUNCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [nodes, edges]);
}
