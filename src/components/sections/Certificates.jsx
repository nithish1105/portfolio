import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, ExternalLink, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const CERTIFICATES = [
	{
		title: 'AWS Machine Learning Foundations',
		issuer: 'AWS Academy',
		date: '2026',
		link: '/certificates/AWS_ML_Foundations.pdf',
	},
	{
		title: 'Introduction to Artificial Intelligence',
		issuer: 'LinkedIn Learning',
		date: '2025',
		link: '/certificates/Intro_to_AI.pdf',
	},
	{
		title: 'Introduction to Data Science',
		issuer: 'IBM',
		date: '2025',
		link: '/certificates/Intro_to_Data_Science.pdf',
	},
	{
		title: 'Introduction to NLP',
		issuer: 'Coursera',
		date: '2025',
		link: '/certificates/Intro_to_NLP.pdf',
	},
	{
		title: 'IBM Design Thinking Practitioner',
		issuer: 'IBM',
		date: '2025',
		link: '/certificates/IBM_Design_Thinking.pdf',
	},
	{
		title: 'AI Lab',
		issuer: 'Microsoft',
		date: '2025',
		link: '/certificates/AI_Lab.pdf',
	},
	{
		title: 'Hack Sprint',
		issuer: 'Hackathon',
		date: '2025',
		link: '/certificates/Hack_Sprint.pdf',
	},
];

const CertificateCard = ({ cert }) => {
	return (
		<a
			href={cert.link}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative w-[320px] md:w-[450px] aspect-[4/5] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shrink-0 transition-all duration-500 hover:border-[#00e5b0]/50 hover:shadow-[0_0_30px_rgba(0,229,176,0.15)] flex flex-col"
		>
			{/* Dynamic Background Gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

			{/* Top Section: Icon/Visual */}
			<div className="flex-1 relative flex items-center justify-center bg-[#0a0a0a]/50 group-hover:bg-[#0a0a0a]/30 transition-colors">
				<div className="w-full h-full absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

				{/* Animated Icon Container */}
				<div className="relative z-10 w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00e5b0]/30 transition-all duration-500 shadow-xl backdrop-blur-sm">
					<Award className="w-10 h-10 text-white/40 group-hover:text-[#00e5b0] transition-colors duration-500" />
				</div>

				{/* Floating Decoration */}
				<div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
					<ExternalLink className="w-5 h-5 text-white/60" />
				</div>
			</div>

			{/* Bottom Section: Info */}
			<div className="relative p-8 bg-[#050505] border-t border-white/5">
				<div className="flex items-center gap-3 mb-4">
					<span className="px-3 py-1 rounded-full text-[10px] font-heavy tracking-widest uppercase bg-white/5 text-[#00e5b0] border border-[#00e5b0]/20">
						{cert.issuer}
					</span>
					<span className="text-white/30 text-xs font-mono">
						{cert.date}
					</span>
				</div>

				<h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#00e5b0] transition-colors duration-300">
					{cert.title}
				</h3>

				<div className="mt-6 flex items-center gap-2 text-sm text-white/50 group-hover:text-white transition-colors">
					<FileText className="w-4 h-4" />
					<span className="font-mono text-xs tracking-wider uppercase">
						View Credential
					</span>
				</div>
			</div>
		</a>
	);
};

const Certificates = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="certificates" className="py-32 relative bg-[#0a0a0a] min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#00e5b0]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-2">
              <span className="h-px w-8 bg-[#00e5b0]" />
              <span className="text-[#00e5b0] font-mono text-xs tracking-widest uppercase">Achievements</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-heavy text-white uppercase tracking-tighter opacity-90">
              Certifications
            </h2>
          </div>

          {/* Horizontal Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 scrollbar-none snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              cursor: 'grab' 
            }}
          >
            {CERTIFICATES.map((cert, i) => (
              <div key={i} className="snap-center">
                <CertificateCard cert={cert} />
              </div>
            ))}
            {/* Added padding to end */}
            <div className="w-10 shrink-0" />
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
             <div className="flex items-center gap-4 text-white/30 font-mono text-xs tracking-widest pointer-events-none">
                <div className="w-12 h-px bg-white/20" />
                <span>DRAG OR SCROLL</span>
             </div>

             <div className="flex gap-4">
                <button 
                  onClick={() => scroll('left')}
                  className="group w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-[#00e5b0]/50 hover:bg-white/10 transition-all active:scale-95 z-20"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="group w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-[#00e5b0]/50 hover:bg-white/10 transition-all active:scale-95 z-20"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
             </div>
          </div>
        </div>
    </section>
  );
};

export default Certificates;