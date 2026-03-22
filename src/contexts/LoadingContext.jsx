import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [progress, setProgress] = useState(0); // Display progress: 0 to 1
  const targetProgress = React.useRef(0);      // Real loading progress
  const [isReady, setIsReady] = useState(false);

  // Smoothly interpolate progress up to target, enforcing a minimum load time
  useEffect(() => {
    const update = () => {
      setProgress((prev) => {
        if (prev >= 1) return 1;

        let next = prev;
        const target = targetProgress.current;

        // Visual update speed: 0.005 per frame (approx 60fps) -> ~3.3 seconds from 0 to 1
        // If target is much further ahead, we can speed up slightly but keep it smooth
        const speed = 0.008; 
        
        if (prev < target) {
          next = prev + speed;
          if (next > target) next = target;
        }

        return next;
      });
    };

    // Run roughly 60fps
    const timer = setInterval(update, 16);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      // Once visual progress hits 100%, wait a moment before unmounting
      const t = setTimeout(() => setIsReady(true), 800);
      return () => clearTimeout(t);
    }
  }, [progress]);

  // External setter updates the ref, not the state directly
  const setProgressHandler = (val) => {
    targetProgress.current = Math.min(Math.max(val, 0), 1);
  };

  return (
    <LoadingContext.Provider value={{ progress, setProgress: setProgressHandler, isReady }}>
      {children}
    </LoadingContext.Provider>
  );
};
