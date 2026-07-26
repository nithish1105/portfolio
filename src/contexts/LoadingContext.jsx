import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isReady, setIsReady] = useState(false);

  // Smooth progress simulator
  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      // 1 / 0.0025 = 400 steps. 400 * 10ms = 4000ms (4 seconds)
      current += 0.0025; 
      
      if (current >= 1) {
        current = 1;
        clearInterval(timer);
        setTimeout(() => setIsReady(true), 2000); // Wait 2s (matches 6s timeline)
      }
      
      setProgress((prev) => Math.max(prev, current));
    }, 10); // Ultra smooth 10ms interval

    return () => clearInterval(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ progress, setProgress, isReady }}>
      {children}
    </LoadingContext.Provider>
  );
};
