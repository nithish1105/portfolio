import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, ArrowRight, Hand, Volume2, ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS — single source of truth
───────────────────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_SPRING   = { type: 'spring', stiffness: 280, damping: 28 };

const fadeUp = (delay = 0, duration = 0.9) => ({
  initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  transition: { duration, delay, ease: EASE_OUT_EXPO },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -50, filter: 'blur(6px)' },
  animate: { opacity: 1, x: 0,   filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 50, filter: 'blur(6px)' },
  animate: { opacity: 1, x: 0,  filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
});

/* ─────────────────────────────────────────────────────────────
   SCRAMBLE TEXT
───────────────────────────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ScrambleText = ({ text, isTeal }) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let iter = 0;
    const id = setInterval(() => {
      setDisplay(
        text.split('').map((ch, i) =>
          i < iter ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      );
      if (iter >= text.length) clearInterval(id);
      iter += 0.4;
    }, 28);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span
      className={`font-heavy text-3xl md:text-[3.5vw] tracking-wider block ${
        isTeal ? 'text-[#00e5b0]' : 'text-white/55 font-mono'
      }`}
    >
      {display}
    </span>
  );
};

/* ─────────────────────────────────────────────────────────────
   FLIP TEXT (role cycling)
───────────────────────────────────────────────────────────── */
const ROLES = [
  { text: 'AI & DATA SCIENCE',    isTeal: true  },
  { text: 'ML PIPELINES',         isTeal: false },
  { text: 'DISTRIBUTED SYSTEMS',  isTeal: true  },
  { text: 'FULL-STACK MOBILE',    isTeal: false },
];

const FlipText = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(p => (p + 1) % ROLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[3.8vw] min-h-[42px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ y: 36, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0,  opacity: 1, filter: 'blur(0px)' }}
          exit  ={{ y: -36, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          <ScrambleText text={ROLES[idx].text} isTeal={ROLES[idx].isTeal} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   VERTICAL DIVIDER LINE (animated on load)
───────────────────────────────────────────────────────────── */
const VerticalLine = ({ delay }) => (
  <motion.div
    className="absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2 pointer-events-none"
    style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent)' }}
    initial={{ scaleY: 0, opacity: 0 }}
    animate={{ scaleY: 1, opacity: 1 }}
    transition={{ duration: 1.2, delay, ease: EASE_OUT_EXPO }}
  />
);

/* ─────────────────────────────────────────────────────────────
   WAVE OVERLAY
───────────────────────────────────────────────────────────── */
const WaveHandOverlay = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="wave"
        initial={{ opacity: 0, scale: 0.4, y: 20 }}
        animate={{ opacity: 1, scale: 1,   y: 0  }}
        exit  ={{ opacity: 0, scale: 0.5,  y: 16 }}
        transition={EASE_SPRING}
        className="absolute pointer-events-none z-40"
        style={{ bottom: '30%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          style={{ fontSize: '3.2rem', transformOrigin: 'bottom center', display: 'block' }}
          animate={{ rotate: [0, 22, -12, 28, -8, 18, 0] }}
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: 1, repeatDelay: 0.3 }}
        >
          👋
        </motion.div>
        {/* Ripple ring */}
        {[0, 0.3, 0.6].map(d => (
          <motion.div
            key={d}
            className="absolute inset-0 rounded-full"
            style={{ border: '1.5px solid rgba(0,229,176,0.45)' }}
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 1.4, delay: d, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─────────────────────────────────────────────────────────────
   SCROLL INDICATOR
───────────────────────────────────────────────────────────── */
const ScrollHint = ({ delay }) => (
  <motion.div
    {...fadeUp(delay, 0.7)}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
  >
    <span className="text-white/20 font-mono text-[9px] tracking-[0.35em] uppercase">Scroll</span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ChevronDown className="w-4 h-4 text-white/20" />
    </motion.div>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   MAIN LANDING
───────────────────────────────────────────────────────────── */
const Landing = ({ onSayHi, isReady }) => {
  const [showSpeech, setShowSpeech]     = useState(false);
  const [showWave, setShowWave]         = useState(false);
  const autoFiredRef                    = useRef(false);

  /* Auto greeting after loading screen exits */
  useEffect(() => {
    if (!isReady || autoFiredRef.current) return;
    autoFiredRef.current = true;

    const t1 = setTimeout(() => {
      setShowSpeech(true);
      setShowWave(true);
      const t2 = setTimeout(() => setShowWave(false),   3200);
      const t3 = setTimeout(() => setShowSpeech(false), 5500);
      return () => { clearTimeout(t2); clearTimeout(t3); };
    }, 800);

    return () => clearTimeout(t1);
  }, [isReady]);

  const handleHiClick = () => {
    setShowSpeech(true);
    setShowWave(true);
    if (onSayHi) onSayHi();
    setTimeout(() => setShowWave(false),   3200);
    setTimeout(() => setShowSpeech(false), 5500);
  };

  /* Stagger delays — all relative to isReady */
  const D = isReady ? 0 : 0.2; // base offset

  return (
    <>
      <style>{`
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 18px rgba(0,229,176,0.35); }
          50%      { box-shadow: 0 0 42px rgba(0,229,176,0.75); }
        }
        @keyframes subtleFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">

        {/* Centre radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(0,229,176,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Subtle vertical centre divider */}
        <VerticalLine delay={D + 1.0} />

        {/* Wave hand overlay */}
        <WaveHandOverlay show={showWave} />

        {/* ── Speech Bubble ── */}
        <AnimatePresence>
          {showSpeech && (
            <motion.div
              key="speech"
              initial={{ opacity: 0, scale: 0.75, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1,    y: 0,  filter: 'blur(0px)' }}
              exit  ={{ opacity: 0, scale: 0.8,   y: 12, filter: 'blur(4px)' }}
              transition={EASE_SPRING}
              className="absolute pointer-events-auto z-30"
              style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }}
            >
              <div
                style={{ animation: 'glowPulse 2.4s ease infinite' }}
                className="relative px-6 py-3 rounded-2xl bg-[#00e5b0] text-black font-heavy text-sm md:text-base tracking-wide flex items-center gap-2 border border-white/20"
              >
                <motion.span
                  style={{ display: 'inline-block', transformOrigin: 'bottom center', fontSize: '1.15rem' }}
                  animate={{ rotate: [0, 18, -10, 22, -4, 14, 0] }}
                  transition={{ duration: 1.9, ease: 'easeInOut', delay: 0.2 }}
                >
                  👋
                </motion.span>
                <span>Hi! Welcome to my portfolio!</span>
                <Volume2 className="w-4 h-4 ml-1 opacity-60 animate-pulse" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#00e5b0]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Left Social Sidebar ── */}
        <motion.div
          {...fadeLeft(D + 0.9)}
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 pointer-events-auto"
        >
          {/* Vertical line accent */}
          <motion.div
            className="w-px h-16 mx-auto"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.15))' }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: D + 1.1, ease: EASE_OUT_EXPO }}
          />
          {[
            { Icon: Github,   href: 'https://github.com/nithish1105' },
            { Icon: Linkedin, href: 'https://linkedin.com/in/nithish-reddy-nare' },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: D + 1.1 + i * 0.12, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.18, color: '#00e5b0' }}
              className="w-9 h-9 flex items-center justify-center text-white/35 hover:text-white transition-colors cursor-none"
            >
              <Icon size={17} strokeWidth={1.5} />
            </motion.a>
          ))}
          <motion.div
            className="w-px h-16 mx-auto"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)' }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: D + 1.3, ease: EASE_OUT_EXPO }}
          />
        </motion.div>

        {/* ── Left Name Block ── */}
        <div className="absolute left-24 md:left-40 top-1/2 -translate-y-1/2 flex flex-col justify-center">
          {/* Label */}
          <motion.span
            {...fadeLeft(D + 0.3)}
            className="text-white/40 font-mono text-xs tracking-[0.28em] uppercase mb-3"
          >
            Hello, I'm
          </motion.span>

          {/* NITHISH — letter-by-letter stagger */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%',   opacity: 1 }}
              transition={{ duration: 0.85, delay: D + 0.45, ease: EASE_OUT_EXPO }}
              className="text-5xl md:text-[6.5vw] font-heavy tracking-tighter text-white leading-[0.88]"
            >
              NITHISH
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%',   opacity: 1 }}
              transition={{ duration: 0.85, delay: D + 0.6, ease: EASE_OUT_EXPO }}
              className="text-5xl md:text-[6.5vw] font-heavy tracking-tighter leading-[0.88] block"
              style={{
                background: 'linear-gradient(135deg, #00e5b0 0%, #00bcd4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              REDDY
            </motion.span>
          </div>

          {/* Thin underline accent */}
          <motion.div
            className="mt-4 h-px rounded-full"
            style={{ background: 'linear-gradient(90deg, #00e5b0, transparent)' }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '80%', opacity: 1 }}
            transition={{ duration: 0.9, delay: D + 0.85, ease: EASE_OUT_EXPO }}
          />
        </div>

        {/* ── Right Role Block ── */}
        <motion.div
          {...fadeRight(D + 0.5)}
          className="absolute right-10 md:right-24 top-1/2 -translate-y-1/2 flex flex-col items-end text-right"
        >
          <motion.span
            {...fadeRight(D + 0.55)}
            className="text-white/30 font-mono text-xs tracking-[0.22em] uppercase mb-3"
          >
            Specialising in
          </motion.span>
          <FlipText />
        </motion.div>

        {/* ── Bottom CTA Buttons ── */}
        <motion.div
          {...fadeUp(D + 0.75)}
          className="absolute bottom-12 right-10 md:right-20 pointer-events-auto flex items-center gap-3"
        >
          {/* SAY HI */}
          <motion.button
            onClick={handleHiClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2.5 px-5 py-3.5 rounded-full border border-[#00e5b0]/35 bg-[#00e5b0]/10 hover:bg-[#00e5b0]/22 hover:border-[#00e5b0]/70 transition-all duration-300 cursor-none"
            style={{ boxShadow: '0 0 18px rgba(0,229,176,0.15)' }}
          >
            <motion.div
              animate={showWave ? { rotate: [0, 18, -8, 18, 0] } : {}}
              transition={{ duration: 0.9 }}
            >
              <Hand className="w-4 h-4 text-[#00e5b0]" />
            </motion.div>
            <span className="text-white font-heavy text-[11px] tracking-[0.2em] uppercase">SAY HI 👋</span>
          </motion.button>

          {/* RESUME */}
          <motion.a
            href={`${import.meta.env.BASE_URL}Nithish_Resume.pdf`}
            target="_blank"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-none"
          >
            <span className="text-white font-heavy text-[11px] tracking-[0.2em] uppercase">Resume</span>
            <motion.div
              className="text-[#00e5b0]"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* ── Scroll Hint ── */}
        <ScrollHint delay={D + 1.4} />

      </div>
    </>
  );
};

export default Landing;
