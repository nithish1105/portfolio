import React from 'react';
import { motion } from 'framer-motion';

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
              About Me
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
            className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          >
            <h3 className="text-3xl md:text-4xl font-heavy text-white mb-4 leading-tight">
              Full Stack Developer crafting polished, production-ready experiences.
            </h3>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed font-sans font-medium tracking-wide">
              4+ years building scalable web applications with React.js, Angular, Next.js, Node.js, and NestJS. Skilled in microservices architecture, CMS development, and low-code platforms. Passionate about creating high-performance, production-ready solutions from concept to deployment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="flex flex-wrap gap-3 text-sm text-white/70"
          >
            {['Scalable UI', 'Microservices', 'High-performance builds', 'End-to-end delivery'].map((pill) => (
              <span key={pill} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
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
