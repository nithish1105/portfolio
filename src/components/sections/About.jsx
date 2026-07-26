import React from 'react';
import { motion } from 'framer-motion';

import { GraduationCap, Trophy, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <section
      id="about"
      className="py-32 relative bg-gradient-to-b from-transparent via-[#050505]/85 to-[#050505] min-h-screen flex items-center border-t border-white/5 overflow-hidden"
    >
      {/* Ambient glow + soft vignette to frame the character like the reference photo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-12%] top-1/2 -translate-y-1/2 w-[70vw] max-w-[860px] aspect-square bg-gradient-to-tr from-[#00e5b0]/20 via-[#8b5cf6]/12 to-transparent blur-[120px] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.06),transparent_38%),radial-gradient(circle_at_80%_60%,rgba(0,229,176,0.08),transparent_36%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.55),transparent_65%)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        {/* Empty left column keeps space for the 3D character crop */}
        <div className="hidden md:block" />

        {/* Right column content */}
        <div className="flex flex-col justify-center max-w-xl text-left space-y-6 md:space-y-7">
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#00e5b0] font-heavy"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#00e5b0] shadow-[0_0_16px_rgba(0,229,176,0.8)]" />
              About Me & Education
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
            className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          >
            <h3 className="text-2xl md:text-3xl font-heavy text-white mb-4 leading-tight">
              AI & Data Science Student & Distributed Systems Developer
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-sans font-medium tracking-wide">
              Hands-on experience building distributed systems, machine learning pipelines, and full-stack mobile applications. Proficient in Python, C++, and Java with strong foundations in data structures, algorithms, and software design. Practical exposure to concurrency, multi-threading, synchronization, data mining, and performance optimization across real-time deployed projects.
            </p>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-[#00e5b0]/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#00e5b0]/10 border border-[#00e5b0]/20 flex items-center justify-center shrink-0 text-[#00e5b0]">
                <GraduationCap size={22} />
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="text-lg font-bold text-white">B.Tech – Artificial Intelligence & Data Science</h4>
                  <span className="text-xs font-mono text-[#00e5b0] bg-[#00e5b0]/10 px-2.5 py-1 rounded-full border border-[#00e5b0]/20">2024 – Present</span>
                </div>
                <p className="text-white/70 text-sm font-medium mt-1">Aditya College of Engineering, Madanapalli, Andhra Pradesh</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/50 font-mono">
                  <BookOpen size={14} className="text-[#00e5b0]" />
                  <span>Coursework: DSA • OOP • DBMS • ML • AI • Networks • OS • Software Engineering</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Trophy size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">1st Prize Winner</span>
                <span className="text-[10px] text-amber-300/60 font-mono">HackSprint, Fusion 2K26</span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">First place at Aditya College annual tech fest — built a live working solution under time constraints.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="flex flex-wrap gap-2 text-xs text-white/70"
          >
            {['Distributed Systems', 'ML Pipelines', 'Computer Vision', 'Concurrency & Threads', 'Data Mining', 'Performance Debugging'].map((pill) => (
              <span key={pill} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md font-mono text-[11px] text-[#00e5b0]">
                {pill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
