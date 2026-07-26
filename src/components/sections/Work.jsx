import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Smart Farm – Crop Prediction & Agriculture Platform',
    subtitle: 'Distributed Agriculture Web Application',
    description: 'Designed system architecture for a distributed agriculture web application with 3 integrated modules: crop prediction, live mandi price tracking, and pesticide/medicine recommendation served from a unified backend.',
    points: [
      'Architected distributed agriculture web app integrating crop prediction, live mandi price tracking, and pesticide recommendation.',
      'Applied data mining techniques on agricultural datasets & evaluated ML classification algorithms, achieving 90% accuracy with interactive data visualization dashboards.'
    ],
    tech: ['Python', 'Machine Learning', 'React', 'Data Mining', 'Data Visualization'],
    link: 'https://farm-beta-topaz.vercel.app',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Medical Image Disease Detection System',
    subtitle: 'End-to-End Deep Learning Pipeline',
    description: 'Architected an end-to-end deep learning pipeline for automated disease detection from medical images, covering multi-stage preprocessing, augmentation, model training, inference, and benchmarking.',
    points: [
      'Achieved 93% test accuracy across medical image classification datasets with multi-stage preprocessing and data augmentation.',
      'Conducted systematic debugging and performance analysis across training loops; implemented early stopping and learning-rate scheduling to eliminate overfitting.'
    ],
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'PyTorch', 'Model Optimization'],
    link: 'https://github.com/nithish1105',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Smart Academy – Mobile Learning Platform',
    subtitle: 'Distributed Client-Server Mobile App',
    description: 'Architected a distributed client-server mobile platform with React Native and Node.js, implementing synchronization mechanisms to maintain consistent state across concurrent user sessions.',
    points: [
      'Built distributed client-server architecture with state synchronization across concurrent active user sessions.',
      'Integrated ML algorithms for personalized content delivery, decoupling AI inference from presentation layer for maximum maintainability.'
    ],
    tech: ['React Native', 'Node.js', 'AI', 'State Synchronization', 'Mobile App'],
    link: 'https://smart-academy.vercel.app',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'WorkLink – Job Portal for Workers',
    subtitle: 'Full-Stack Distributed Mobile Platform',
    description: 'Full-stack distributed mobile platform connecting daily-wage workers with employers, implementing concurrency handling and thread-safe real-time messaging.',
    points: [
      'Implemented thread-safe real-time messaging and concurrency handling supporting multiple simultaneous user sessions reliably.',
      'Designed normalized database schema and custom data-structure driven job-matching algorithm optimized for low-end devices.'
    ],
    tech: ['Full-Stack', 'Mobile Development', 'Concurrency', 'Thread-Safety', 'Database Schema'],
    link: 'https://nithish1105.github.io/worklink',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop'
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
            Featured Projects
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
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#00e5b0] font-mono text-2xl font-bold">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#00e5b0]/80 bg-[#00e5b0]/10 px-3 py-1 rounded-full border border-[#00e5b0]/20">
                    {PROJECTS[index].subtitle}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-heavy text-white uppercase leading-tight">
                  {PROJECTS[index].title}
                </h3>
                
                <p className="mt-4 text-white/70 text-base leading-relaxed font-sans font-light">
                  {PROJECTS[index].description}
                </p>

                {/* Technical Accomplishments / Points */}
                <ul className="mt-6 space-y-3">
                  {PROJECTS[index].points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/80 font-sans">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00e5b0] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <span className="text-[#00e5b0] font-mono text-xs uppercase tracking-widest block mb-4 font-bold">
                    Technologies & Concepts
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PROJECTS[index].tech.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-white/80 uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href={PROJECTS[index].link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 group flex items-center gap-3 self-start cursor-none"
                >
                  <span className="text-white font-heavy uppercase tracking-widest text-sm group-hover:text-[#00e5b0] transition-colors">
                    Live Demo / Source
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#00e5b0] group-hover:translate-x-1 transition-transform" />
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
