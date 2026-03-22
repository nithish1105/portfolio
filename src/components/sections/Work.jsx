import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Smart Academy',
    description: 'An educational platform for smart learning featuring interactive courses, student progress tracking, and resource management.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    link: 'https://nithish1105.github.io/smart-academy/',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Text to Emoji',
    description: 'A fun and interactive tool that converts plain text into relevant emojis instantly, enhancing digital communication.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Emoji API'],
    link: 'https://nithish1105.github.io/text-to-emoji/',
    image: 'https://images.unsplash.com/photo-1541359927273-d76820fc43f9?q=80&w=2070&auto=format&fit=crop'
  }
];

const Work = () => {
  const [index, setIndex] = useState(0);

  const nextProject = () => setIndex((prev) => (prev + 1) % PROJECTS.length);
  const prevProject = () => setIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));

  return (
    <section id="work" className="py-32 relative bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto px-6 md:px-12 flex flex-col h-full">
        
        {/* Header */}
        <div className="w-full">
          <h2 className="text-5xl md:text-7xl font-heavy text-white uppercase tracking-tighter">
            My Work
          </h2>
          <div className="w-full h-px bg-white/10 mt-8 mb-16" />
        </div>

        {/* Content layout */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 flex-1">
          
          {/* Left Text Detail */}
          <div className="w-full lg:w-5/12 text-left relative z-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
              >
                <div className="text-[#00e5b0] font-mono text-2xl font-bold mb-4">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-heavy text-white uppercase leading-tight">
                  {PROJECTS[index].title}
                </h3>
                
                <p className="mt-6 text-white/60 text-lg leading-relaxed font-sans font-light">
                  {PROJECTS[index].description}
                </p>

                <div className="mt-12">
                  <span className="text-[#00e5b0] font-mono text-sm uppercase tracking-widest block mb-6 font-bold">
                    Tools & Features
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {PROJECTS[index].tech.map((t, i) => (
                      <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-white/70 uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href={PROJECTS[index].link} 
                  className="mt-12 group flex items-center gap-3 self-start cursor-none"
                >
                  <span className="text-white font-heavy uppercase tracking-widest text-sm group-hover:text-[#00e5b0] transition-colors">
                    View Project
                  </span>
                  <ExternalLink className="w-4 h-4 text-white group-hover:text-[#00e5b0] transition-colors" />
                </a>

              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 mt-16">
              <button onClick={prevProject} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00e5b0] hover:text-[#00e5b0] transition-colors cursor-none text-white">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button onClick={nextProject} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00e5b0] hover:text-[#00e5b0] transition-colors cursor-none text-white">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Mockup Display */}
          <div className="w-full lg:w-7/12 relative h-[400px] lg:h-[600px] [perspective:1200px] mt-10 lg:mt-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: 25, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: -15, x: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -45, x: -100, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="absolute inset-x-0 w-[90%] md:w-[80%] aspect-[16/10] mx-auto [transform-style:preserve-3d]"
              >
                {/* Browser Window Mockup */}
                <div className="w-full h-full bg-[#111111] rounded-xl border border-white/10 shadow-[30px_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col group">
                  
                  {/* Browser Bar */}
                  <div className="h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5 w-full">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                  
                  {/* Browser Content */}
                  <div className="flex-1 w-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#00e5b0] mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none" />
                    <img 
                      src={PROJECTS[index].image} 
                      alt={PROJECTS[index].title} 
                      className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 scale-105 group-hover:scale-100" 
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Work;
