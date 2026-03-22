import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../../contexts/LoadingContext';

const LoadingScreen = () => {
  const { progress, isReady } = useLoading();
  const [counter, setCounter] = useState(0);

  // Custom counter that uses the loading progress but adds a ticker effect
  useEffect(() => {
    const target = Math.floor(progress * 100);
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < target) return prev + 1;
        return prev;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [progress]);

  const pctString = counter.toString().padStart(3, '0');

  // Text for marquee
  const headlines = [
    "A CREATOR • A PROBLEM SOLVER • ",
    "FULL STACK DEVELOPER • VISIONARY • ",
    "A CREATOR • A PROBLEM SOLVER • "
  ];

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden pointer-events-auto"
        >
          {/* Background Marquee - Subtle & Stylish */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.03] gap-0 rotate-[-5deg] scale-110">
            {headlines.map((text, idx) => (
              <div key={idx} className="w-full flex overflow-hidden py-4">
                <motion.div
                  initial={{ x: idx % 2 === 0 ? "0%" : "-50%" }}
                  animate={{ x: idx % 2 === 0 ? "-50%" : "0%" }}
                  transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: 25 + idx * 5 
                  }}
                  className="flex whitespace-nowrap"
                >
                  {[...Array(4)].map((_, i) => (
                    <span 
                      key={i} 
                      className="text-[10vw] font-black text-black tracking-tighter mx-8 uppercase leading-none"
                      style={{ WebkitTextStroke: '2px black', color: 'transparent' }}
                    >
                      {text}
                    </span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Centered Modern Loader */}
          <motion.div 
            className="z-10 relative flex flex-col items-center gap-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Minimalist Pill Container */}
            <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-full p-2 px-8 shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center gap-6">
              
              {/* Status Text */}
              <div className="flex flex-col items-end min-w-[120px]">
                <span className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase mb-0.5">
                  {counter > 99 ? "Complete" : "Loading..."}
                </span>
                <div className={`font-bold text-black tracking-tighter leading-none ${counter > 99 ? "text-[22px] font-black" : "text-3xl font-mono"}`}>
                  {counter > 99 ? (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block"
                    >
                      WELCOME
                    </motion.span>
                  ) : (
                    <span>{pctString}%</span>
                  )}
                </div>
              </div>

              {/* Vertical Separator */}
              <div className="w-[1px] h-8 bg-black/10"></div>

              {/* Progress Bar */}
              <div className="w-32 h-1.5 bg-black/5 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-black rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

            </div>
          </motion.div>

          {/* Bottom Branding */}
          <div className="absolute bottom-12 left-0 right-0 text-center opacity-30">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-black">
              Portfolio 2026 • Nithish Reddy
            </span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
