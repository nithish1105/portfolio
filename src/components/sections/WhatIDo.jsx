import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, PenTool, Database, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: Code2, title: "Frontend Architecture", desc: "Building scalable, dynamic UI layers with React, Next.js, and TypeScript leveraging modern state management." },
  { icon: Compass, title: "Interactive 3D", desc: "Crafting immersive WebGL experiences using Three.js, React Three Fiber, and custom GLSL shaders." },
  { icon: Database, title: "Backend Systems", desc: "Designing robust APIs and microservices with Node.js, Express, Postgres, and real-time sockets." },
  { icon: PenTool, title: "UI/UX Engineering", desc: "Iterating on high-fidelity designs, micro-interactions, and accessibility to ensure premium user experiences." }
];

const WhatIDo = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-32 relative bg-grid-pattern">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-amber-500" />
            <span className="text-amber-400 font-mono tracking-[0.2em] text-sm uppercase">Capabilities</span>
            <div className="w-12 h-[1px] bg-amber-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What I Do</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, idx) => (
            <div 
              key={idx} 
              ref={addToRefs}
              className="glass p-8 rounded-2xl hover:bg-white/5 transition-colors group cursor-none border-t border-white/10 border-l border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-amber-500/20 transition-colors duration-500" />

              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300">
                <s.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatIDo;
