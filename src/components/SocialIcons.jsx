import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const SocialIcons = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <a href="https://github.com/nithish1105" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/10 hover:border-teal-400 hover:bg-teal-400/10 hover:text-teal-400 text-gray-400 transition-all hover:scale-110 cursor-none relative group pointer-events-auto">
        <Github size={18} />
      </a>
      <a href="https://www.linkedin.com/in/nithishkumarreddy-nare-151539382" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/10 hover:border-teal-400 hover:bg-teal-400/10 hover:text-teal-400 text-gray-400 transition-all hover:scale-110 cursor-none relative group pointer-events-auto">
        <Linkedin size={18} />
      </a>
      <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/10 hover:border-teal-400 hover:bg-teal-400/10 hover:text-teal-400 text-gray-400 transition-all hover:scale-110 cursor-none relative group pointer-events-auto">
        <Twitter size={18} />
      </a>
    </div>
  );
};

export default SocialIcons;
