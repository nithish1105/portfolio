import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../../contexts/LoadingContext';

const LoadingScreen = () => {
  const { progress, isReady } = useLoading();
  const [showWelcome, setShowWelcome] = React.useState(false);
  
  const pctValue = Math.floor(progress * 100);

  React.useEffect(() => {
    if (progress >= 1) {
      const timer = setTimeout(() => setShowWelcome(true), 800); // Wait 0.8s shows 100% before switching
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Text for marquee
  const marqueeText = "FULL STACK DEVELOPER • CREATOR • PROBLEM SOLVER • SOFTWARE ENGINEER • ";

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* Massive Scrolling Marquee Background */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex overflow-hidden pointer-events-none select-none">
             <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }} 
              className="flex whitespace-nowrap min-w-full"
            >
              {[...Array(6)].map((_, i) => (
                <span 
                  key={i} 
                  className="text-[12vw] font-black text-black/10 stroke-text tracking-tighter mx-4 uppercase shrink-0"
                  style={{ WebkitTextStroke: "3px rgba(0, 0, 0, 0.3)" }}
                >
                  {marqueeText}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Centered Pill Loader - Improved Visuals */}
          <motion.div 
            className="z-10 relative flex flex-col items-center justify-center gap-4 w-72 py-8 bg-white/90 backdrop-blur-md rounded-2xl border border-black/5 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
             {/* Progress Number or Welcome Message */}
             <AnimatePresence mode="wait">
                {!showWelcome ? (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-start justify-center relative">
                      <h2 className="text-6xl font-heavy text-black leading-none tracking-tighter tabular-nums">
                        {pctValue}
                      </h2>
                      <span className="text-xl text-[#00e5b0] font-bold ml-1 mt-1 font-mono">%</span>
                    </div>
                    
                    {/* Loading Bar */}
                    <div className="w-40 h-1 bg-black/5 rounded-full overflow-hidden mt-5">
                      <motion.div 
                          className="h-full bg-[#00e5b0] shadow-[0_0_10px_#00e5b0]"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress * 100}%` }}
                      />
                    </div>

                    <p className="text-black/30 font-mono text-[10px] tracking-[0.2em] uppercase animate-pulse mt-3">
                      Loading Assets...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex flex-col items-center"
                  >
                    <h2 className="text-3xl font-heavy text-black tracking-tighter text-center">
                      WELCOME
                    </h2>
                    <p className="text-[#00e5b0] font-mono text-[10px] tracking-widest mt-1 uppercase font-bold">
                       Access Granted
                    </p>
                  </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
