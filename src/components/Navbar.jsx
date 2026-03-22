import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'ABOUT', href: '#about' },
  { name: 'WORK', href: '#work' },
  { name: 'RESUME', href: '/Nithish_Resume.pdf', target: '_blank' },
  { name: 'CONTACT', href: '#contact' },
];

const AudioVisualizer = () => {
  return (
    <div className="flex items-end gap-1 h-4 ml-6 pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#00e5b0]"
          animate={{ height: ["4px", "16px", "8px", "14px", "4px"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <a href="#home" className="text-xl font-heavy text-white tracking-widest cursor-none relative group">
            NKR
            <div className="absolute -inset-2 bg-white/5 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Email - Center */}
        <div className="hidden lg:flex justify-center flex-1">
          <a href="mailto:nithishkumarreddynare1@gmail.com" className="text-white/70 hover:text-white transition-colors text-sm font-medium tracking-wide">
            nithishkumarreddynare1@gmail.com
          </a>
        </div>

        {/* Links & Visualizer - Right */}
        <div className="flex-shrink-0 flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                target={link.target}
                rel={link.target ? "noopener noreferrer" : undefined}
                className={`text-xs font-medium tracking-widest transition-colors duration-300 cursor-none ${
                    link.target ? 'text-[#00e5b0] hover:text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <AudioVisualizer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
