import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Download } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    } else {
      const erasingInterval = setInterval(() => {
        if (text.length > 0) {
          setText((prev) => prev.slice(0, -1));
        } else {
          clearInterval(erasingInterval);
          setIsTyping(true);
        }
      }, 50);
      return () => clearInterval(erasingInterval);
    }
  }, [text, isTyping]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block py-1 px-4 rounded-full border border-white/10 glass text-neon-blue text-sm font-semibold tracking-wide mb-4 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
          >
            Welcome to my universe
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple neon-glow inline-block pb-2">John Doe</span>
          </h1>
          
          <div className="h-12 md:h-16 flex items-center justify-center gap-1">
            <span className="text-2xl md:text-4xl font-medium text-gray-300">
              I am a <span className="text-white font-mono">{text}</span>
            </span>
            <span className="w-[3px] h-8 md:h-10 bg-neon-purple animate-ping" />
          </div>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mt-6">
            Building digital experiences that combine stunning design with robust engineering. 
            I specialize in React, Node.js, and creating modern web applications.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          >
            <a 
              href="#projects"
              className="group relative px-8 py-4 bg-white text-dark-bg font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center gap-2"
            >
              <span className="relative z-10">View Projects</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            
            <a 
              href="#contact"
              className="group px-8 py-4 rounded-full border border-white/20 glass text-white font-bold transition-all hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center gap-2"
            >
              <span>Download CV</span>
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
