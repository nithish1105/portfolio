import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const SocialIcons = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <a href="https://github.com/nithish1105" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-none">
        <Github size={18} />
      </a>
      <a href="https://www.linkedin.com/in/nithishkumarreddy-nare-151539382" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-none">
        <Linkedin size={18} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-none">
        <Twitter size={18} />
      </a>
    </div>
  );
};

export default SocialIcons;
