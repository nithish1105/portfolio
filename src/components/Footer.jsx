import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 glass mt-20 relative z-10">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono tracking-wider">
              DEV<span className="text-neon-purple">.</span>
            </span>
          </div>
          
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>&copy; {currentYear} Created with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by You</span>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/nithish1105" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-300 group">
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/nithishkumarreddy-nare-151539382" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-300 group">
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-300 group">
              <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:nithishkumarreddynare1@gmail.com" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-all duration-300 group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
