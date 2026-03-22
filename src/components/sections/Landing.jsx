import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';

const ScrambleText = ({ text, isActive, isTeal }) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isActive) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char, index) => {
        if (index < iteration) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 20);
    return () => clearInterval(interval);
  }, [text, isActive]);

  return (
    <span className={`${isTeal ? 'text-[#00e5b0] text-glow' : 'text-white/60 font-mono'} font-heavy text-4xl md:text-[4vw] tracking-wider block`}>
      {displayText}
    </span>
  );
};

const FlipText = () => {
  const words = [
    { text: "ENGINEER", isTeal: false }, 
    { text: "DEVELOPER", isTeal: true },
    { text: "CREATOR", isTeal: false },
    { text: "PROBLEM SOLVER", isTeal: true }
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Faster cycle
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block h-[4.5vw] min-h-[50px] overflow-hidden ml-3 align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -50, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="origin-center"
        >
          <ScrambleText text={words[index].text} isActive={true} isTeal={words[index].isTeal} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex text-left overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vh] h-[55vh] bg-radial-glow rounded-full pointer-events-none" />

      {/* Left Vertical Social Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 pointer-events-auto"
      >
        {[
          { icon: Github, href: "https://github.com/nithish1105" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/nithishkumarreddy-nare-151539382" },
          { icon: Twitter, href: "https://twitter.com" },
          { icon: Instagram, href: "https://instagram.com" }
        ].map(({ icon: Icon, href }, idx) => (
          <a 
            key={idx} 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-none pointer-events-auto"
          >
            <Icon size={18} strokeWidth={1.5} />
          </a>
        ))}
      </motion.div>

      {/* Left Content - Name */}
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute left-24 md:left-40 top-1/2 -translate-y-1/2 flex flex-col justify-center"
      >
        <span className="text-white/60 font-mono text-sm tracking-[0.2em] uppercase mb-4">
          Hello! I'm
        </span>
        <h1 className="text-5xl md:text-[6.5vw] font-heavy tracking-tighter text-white leading-[0.85]">
          NITHISH
          <br />
          REDDY
        </h1>
      </motion.div>

      {/* Right Content - Role */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute right-10 md:right-24 top-1/2 -translate-y-1/2 flex flex-col items-end text-right justify-center"
      >
        <span className="text-white font-light tracking-wider text-lg mb-2">
          A Full Stack
        </span>
        <div className="flex items-center">
          <FlipText />
        </div>
      </motion.div>

      {/* Bottom Right Resume Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-10 right-10 md:right-20 pointer-events-auto"
      >
        <a 
          href="/Nithish_Resume.pdf" 
          target="_blank"
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 glass rounded-full hover:bg-white/10 hover:border-[#00e5b0]/50 transition-all cursor-none"
        >
          <span className="text-white font-heavy text-xs tracking-[0.2em] uppercase">
            RESUME
          </span>
          <ArrowRight className="w-4 h-4 text-[#00e5b0] group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>

    </div>
  );
};

export default Landing;
