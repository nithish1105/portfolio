import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATES = [
  {
    title: "AWS Academy Graduate",
    description: "Machine Learning Foundations",
    file: "/certificates/AWS_ML_Foundations.pdf",
    type: "pdf",
    date: "Jan 2026"
  },
  {
    title: "IBM Enterprise Design Thinking",
    description: "Practitioner Certification",
    file: "/certificates/IBM_Design_Thinking.pdf",
    type: "pdf",
    date: "Sep 2025"
  },
  {
    title: "Introduction to Data Science",
    description: "Course Completion",
    file: "/certificates/Intro_to_Data_Science.pdf",
    type: "pdf",
    date: "2025"
  },
  {
    title: "Introduction to NLP",
    description: "Natural Language Processing",
    file: "/certificates/Intro_to_NLP.pdf",
    type: "pdf",
    date: "2025"
  },
  {
    title: "AI Lab",
    description: "Artificial Intelligence Lab",
    file: "/certificates/AI_Lab.pdf",
    type: "pdf",
    date: "2025"
  },
  {
    title: "Introduction to AI",
    description: "Artificial Intelligence Fundamentals",
    file: "/certificates/Intro_to_AI.pdf",
    type: "pdf",
    date: "2025"
  },
  {
    title: "Hack Sprint",
    description: "Hackathon Participation",
    file: "/certificates/Hack_Sprint.pdf",
    type: "pdf",
    date: "2025"
  }
];

const CertificateCard = ({ cert, index }) => {
  return (
    <div className="cert-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {cert.type === 'pdf' ? (
              <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full">
            {cert.date}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
          {cert.title}
        </h3>
        <p className="text-sm text-gray-400 mb-6 flex-grow">
          {cert.description}
        </p>

        <a 
          href={cert.file} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors group-hover:translate-x-1 duration-300"
        >
          View Certificate
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const Certificates = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cert-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="certificates" className="py-24 relative bg-black w-full">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heavy text-white uppercase tracking-tighter mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-teal-500/30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, index) => (
            <CertificateCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
