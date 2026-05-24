import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../../contexts/LoadingContext';

/* ─────────────────────────────────────────────
   Video Splash Screen
   - Plays /portfolio/video.mp4 full-screen
   - Overlays cinematic gradient + name badge
   - Fades out when video ends or skip is clicked
   - 15s hard timeout as safety net
   ───────────────────────────────────────────── */

// Module-level flag so StrictMode double-mounts don't cause double-dismiss
let globalDismissed = false;

const LoadingScreen = () => {
  const { setProgress } = useLoading();
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(!globalDismissed);
  const [videoReady, setVideoReady] = useState(false);

  const dismiss = useCallback(() => {
    if (globalDismissed) return;
    globalDismissed = true;
    clearTimeout(timeoutRef.current);
    setProgress(1.0);
    setVisible(false);
  }, [setProgress]);

  useEffect(() => {
    // If already dismissed (StrictMode re-mount), bail immediately
    if (globalDismissed) return;

    const video = videoRef.current;
    if (!video) return;

    const onCanPlayThrough = () => {
      setVideoReady(true);
    };

    const onEnded = () => {
      dismiss();
    };

    const onError = (e) => {
      console.warn('[Splash] Video failed to load:', e);
      timeoutRef.current = setTimeout(dismiss, 800);
    };

    const onTimeUpdate = () => {
      if (video.duration > 0 && !globalDismissed) {
        setProgress(Math.min(video.currentTime / video.duration, 0.99));
      }
    };

    video.addEventListener('canplaythrough', onCanPlayThrough);
    video.addEventListener('ended', onEnded);
    video.addEventListener('error', onError);
    video.addEventListener('timeupdate', onTimeUpdate);

    // Attempt to play (muted so browsers never block it)
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('[Splash] play() rejected:', err);
        // Only dismiss if autoplay truly can't start
        if (!video.paused) return; // it started anyway
        timeoutRef.current = setTimeout(dismiss, 2000);
      });
    }

    // Hard cap
    timeoutRef.current = setTimeout(dismiss, 15_000);

    return () => {
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('error', onError);
      video.removeEventListener('timeupdate', onTimeUpdate);
      // Don't pause the video on cleanup — StrictMode will re-mount
      // the component but we want video to keep playing
      clearTimeout(timeoutRef.current);
    };
  }, [dismiss, setProgress]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] overflow-hidden bg-black"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* ── VIDEO ── */}
          <video
            ref={videoRef}
            src="/portfolio/video.mp4"
            preload="auto"
            muted
            playsInline
            autoPlay
            loop={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: videoReady ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              willChange: 'opacity',
              zIndex: 0,
            }}
          />

          {/* Solid black shown while video buffers */}
          <div
            className="absolute inset-0 bg-black"
            style={{
              opacity: videoReady ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* ── Cinematic gradient overlay ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 3,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.7) 100%)',
            }}
          />

          {/* ── Vignette ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 3, boxShadow: 'inset 0 0 150px rgba(0,0,0,0.65)' }}
          />

          {/* ── Name badge – bottom-left ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.8 }}
            className="absolute bottom-10 left-10 flex flex-col gap-1 select-none pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <span
              className="text-[11px] tracking-[0.35em] uppercase font-mono font-semibold"
              style={{ color: '#00e5b0' }}
            >
              Portfolio
            </span>
            <p
              className="text-4xl font-black tracking-tight leading-none text-white"
              style={{ textShadow: '0 2px 28px rgba(0,0,0,0.9)' }}
            >
              Nithish Kumar Reddy
            </p>
            <p className="text-white/50 text-sm font-light tracking-wide mt-1">
              Full Stack Developer
            </p>
          </motion.div>

          {/* ── Teal accent underline ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
            className="absolute bottom-9 left-10 h-[1.5px] w-52"
            style={{
              zIndex: 10,
              background: 'linear-gradient(to right, #00e5b0, transparent)',
              transformOrigin: 'left center',
            }}
          />

          {/* ── Skip Intro button – bottom-right ── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            onClick={dismiss}
            className="absolute bottom-10 right-10 flex items-center gap-2 group z-10"
            style={{ cursor: 'default' }}
            aria-label="Skip intro"
          >
            <span className="text-white/40 group-hover:text-white/80 text-xs tracking-[0.22em] uppercase font-mono transition-colors duration-300">
              Skip Intro
            </span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="text-white/40 group-hover:text-[#00e5b0] transition-colors duration-300"
            >
              <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <path d="M10 9l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="18" y1="9" x2="18" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
