import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [progress, setProgressState] = useState(0); // 0 to 1
  const [isReady, setIsReady] = useState(false);
  const isReadyRef = useRef(false);

  // setProgress is called by the splash screen (video timeupdate → 0..1)
  // When it reaches 1.0, flip isReady after a short delay so the exit
  // animation has time to start before the main content renders.
  const setProgress = (val) => {
    setProgressState(val);
    if (val >= 1.0 && !isReadyRef.current) {
      isReadyRef.current = true;
      // Short delay so the framer-motion exit transition is fully kicked off
      setTimeout(() => setIsReady(true), 1200);
    }
  };

  return (
    <LoadingContext.Provider value={{ progress, setProgress, isReady }}>
      {children}
    </LoadingContext.Provider>
  );
};
