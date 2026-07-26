import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ExternalLink, Shield, Cpu, Zap, ChevronDown } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   CERTIFICATE DATA
══════════════════════════════════════════════════════════════ */
const CERTIFICATES = [
  {
    id: 'hacksprint',
    title: 'HackSprint — 1st Prize',
    issuer: 'Aditya College of Engineering',
    category: 'Achievement',
    year: '2026',
    tag: 'GOLD',
    accent: '#fbbf24',
    file: 'Hack_Sprint.pdf',
  },
  {
    id: 'aws',
    title: 'AWS Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    category: 'Cloud & ML',
    year: '2026',
    tag: 'VERIFIED',
    accent: '#f97316',
    file: 'AWS_ML_Foundations.pdf',
  },

  {
    id: 'ibm-skills',
    title: 'SkillsBuild Program',
    issuer: 'IBM',
    category: 'Industry',
    year: '2025',
    tag: 'CERTIFIED',
    accent: '#60a5fa',
    file: 'IBM_SkillsBuild.pdf',
  },
  {
    id: 'ibm-design',
    title: 'Enterprise Design Thinking',
    issuer: 'IBM',
    category: 'Industry',
    year: '2025',
    tag: 'CERTIFIED',
    accent: '#60a5fa',
    file: 'IBM_Design_Thinking.pdf',
  },
  {
    id: 'genai-principles',
    title: 'Principles of Generative AI',
    issuer: 'Infosys Springboard',
    category: 'Generative AI',
    year: '2025',
    tag: 'AI',
    accent: '#a78bfa',
    file: 'Infosys_GenAI_Principles.pdf',
  },
  {
    id: 'genai-unleash',
    title: 'Generative AI Unleashing',
    issuer: 'Infosys Springboard',
    category: 'Generative AI',
    year: '2025',
    tag: 'AI',
    accent: '#a78bfa',
    file: 'Infosys_GenAI_Unleashing.pdf',
  },
  {
    id: 'genai-models',
    title: 'Generative Models for Developers',
    issuer: 'Infosys Springboard',
    category: 'Generative AI',
    year: '2025',
    tag: 'AI',
    accent: '#a78bfa',
    file: 'Infosys_GenAI_Models.pdf',
  },
  {
    id: 'openai-gpt',
    title: 'Introduction to OpenAI GPT Models',
    issuer: 'Infosys Springboard',
    category: 'Generative AI',
    year: '2025',
    tag: 'AI',
    accent: '#a78bfa',
    file: 'Infosys_OpenAI_GPT.pdf',
  },
  {
    id: 'gpt3',
    title: 'OpenAI GPT-3 for Developers',
    issuer: 'Infosys Springboard',
    category: 'Generative AI',
    year: '2025',
    tag: 'AI',
    accent: '#a78bfa',
    file: 'Infosys_GPT3.pdf',
  },
  {
    id: 'prompt',
    title: 'Prompt Engineering',
    issuer: 'Infosys Springboard',
    category: 'Generative AI',
    year: '2025',
    tag: 'AI',
    accent: '#a78bfa',
    file: 'Infosys_Prompt_Eng.pdf',
  },
  {
    id: 'ai-primer',
    title: 'Artificial Intelligence Primer',
    issuer: 'Infosys Springboard',
    category: 'Artificial Intelligence',
    year: '2025',
    tag: 'CORE',
    accent: '#34d399',
    file: 'Infosys_AI_Primer.pdf',
  },
  {
    id: 'ai-main',
    title: 'Artificial Intelligence',
    issuer: 'Infosys Springboard',
    category: 'Artificial Intelligence',
    year: '2025',
    tag: 'CORE',
    accent: '#34d399',
    file: 'Infosys_AI.pdf',
  },
  {
    id: 'intro-ai',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Infosys Springboard',
    category: 'Artificial Intelligence',
    year: '2025',
    tag: 'CORE',
    accent: '#34d399',
    file: 'Infosys_Intro_AI.pdf',
  },
  {
    id: 'dl-dev',
    title: 'Deep Learning for Developers',
    issuer: 'Infosys Springboard',
    category: 'Deep Learning',
    year: '2025',
    tag: 'NEURAL',
    accent: '#f87171',
    file: 'Infosys_DeepLearning.pdf',
  },
  {
    id: 'intro-dl',
    title: 'Introduction to Deep Learning',
    issuer: 'Infosys Springboard',
    category: 'Deep Learning',
    year: '2025',
    tag: 'NEURAL',
    accent: '#f87171',
    file: 'Infosys_Intro_DL.pdf',
  },
  {
    id: 'cv',
    title: 'Computer Vision 101',
    issuer: 'Infosys Springboard',
    category: 'Computer Vision',
    year: '2025',
    tag: 'VISION',
    accent: '#38bdf8',
    file: 'Infosys_CV101.pdf',
  },
  {
    id: 'nlp',
    title: 'Introduction to Natural Language Processing',
    issuer: 'Infosys Springboard',
    category: 'NLP',
    year: '2025',
    tag: 'LANGUAGE',
    accent: '#fb923c',
    file: 'Infosys_NLP.pdf',
  },
  {
    id: 'ds',
    title: 'Introduction to Data Science',
    issuer: 'Infosys Springboard',
    category: 'Data Science',
    year: '2025',
    tag: 'DATA',
    accent: '#06b6d4',
    file: 'Infosys_Intro_DS.pdf',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    issuer: 'Infosys Springboard',
    category: 'Robotics',
    year: '2025',
    tag: 'SYSTEMS',
    accent: '#94a3b8',
    file: 'Infosys_Robotics.pdf',
  },
  {
    id: 'agile',
    title: 'Agile Scrum in Practice',
    issuer: 'Infosys Springboard',
    category: 'Engineering',
    year: '2025',
    tag: 'AGILE',
    accent: '#4ade80',
    file: 'Infosys_Agile_Scrum.pdf',
  },
];

const FILTERS = ['ALL', ...Array.from(new Set(CERTIFICATES.map(c => c.category.toUpperCase())))];

/* ══════════════════════════════════════════════════════════════
   HOLOGRAPHIC CERT CARD
══════════════════════════════════════════════════════════════ */
const CertCard = ({ cert, index }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 60);
    return () => clearTimeout(t);
  }, [index]);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const href = `${import.meta.env.BASE_URL}certificates/${cert.file}`;

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 12 : 0}px)`
          : 'translateY(24px)',
        transition: hovered
          ? 'transform 0.08s ease, opacity 0.5s ease, box-shadow 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease, box-shadow 0.4s ease',
        transitionDelay: `${index * 0.04}s`,
        borderColor: hovered ? cert.accent : 'rgba(255,255,255,0.07)',
        boxShadow: hovered
          ? `0 0 0 1px ${cert.accent}50, 0 20px 60px ${cert.accent}25, 0 4px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`
          : '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      className="group relative flex flex-col border rounded-2xl overflow-hidden cursor-pointer"
      style2={{}} // intentional – using inline style above
    >
      {/* Holographic shimmer overlay */}
      <div
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(135deg, transparent 30%, ${cert.accent}12 50%, transparent 70%)`,
          transition: 'opacity 0.4s ease',
        }}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Animated top border line */}
      <div
        style={{
          background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)`,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.4s ease',
          transformOrigin: 'left',
        }}
        className="absolute top-0 left-0 right-0 h-px z-20"
      />

      {/* Card background */}
      <div
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.7) 100%)`
            : `linear-gradient(160deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.6) 100%)`,
          backdropFilter: 'blur(12px)',
          transition: 'background 0.4s ease',
        }}
        className="absolute inset-0"
      />

      {/* Scan line effect */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col gap-4 h-full">

        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          {/* Tag badge */}
          <span
            style={{
              color: cert.accent,
              borderColor: `${cert.accent}40`,
              background: `${cert.accent}10`,
              boxShadow: hovered ? `0 0 12px ${cert.accent}30` : 'none',
              transition: 'box-shadow 0.3s ease',
              fontFamily: 'monospace',
            }}
            className="px-2.5 py-0.5 rounded text-[9px] font-black tracking-[0.2em] border uppercase"
          >
            ◈ {cert.tag}
          </span>

          {/* Year */}
          <span className="text-white/20 font-mono text-[10px] tracking-widest">{cert.year}</span>
        </div>

        {/* Decorative ID line */}
        <div className="flex items-center gap-2">
          <div style={{ background: `${cert.accent}40` }} className="h-px flex-1" />
          <span className="text-white/15 font-mono text-[8px] tracking-widest uppercase">
            {cert.id.toUpperCase().replace(/-/g, '_')}
          </span>
          <div style={{ background: `${cert.accent}20` }} className="h-px w-4" />
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3
            style={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.85)', transition: 'color 0.3s ease' }}
            className="font-bold text-[15px] leading-snug tracking-tight"
          >
            {cert.title}
          </h3>
          <p className="text-white/35 text-[11px] font-mono mt-1.5 tracking-wide">{cert.issuer}</p>
        </div>

        {/* Footer */}
        <div
          style={{ borderTopColor: 'rgba(255,255,255,0.06)' }}
          className="flex items-center justify-between border-t pt-3"
        >
          <span
            style={{ color: `${cert.accent}80` }}
            className="text-[10px] font-mono uppercase tracking-widest"
          >
            {cert.category}
          </span>
          <div
            style={{
              color: cert.accent,
              opacity: hovered ? 1 : 0.4,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              transform: hovered ? 'translateX(2px)' : 'translateX(0)',
            }}
            className="flex items-center gap-1"
          >
            <span className="text-[9px] font-mono font-black tracking-widest">VIEW PDF</span>
            <ExternalLink size={10} />
          </div>
        </div>
      </div>
    </a>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════════ */
const Certificates = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showAll, setShowAll] = useState(false);

  const filtered = activeFilter === 'ALL'
    ? CERTIFICATES
    : CERTIFICATES.filter(c => c.category.toUpperCase() === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, 9);
  const hasMore = filtered.length > 9 && !showAll;

  return (
    <>
      <style>{`
        @keyframes scanDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes gridFade {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseAccent {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>

      <section
        id="certificates"
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050508 0%, #080810 50%, #050508 100%)' }}
      >

        {/* ── Background Grid ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          }}
        />

        {/* ── Ambient glow blobs ── */}
        <div className="absolute pointer-events-none" style={{
          top: '-10%', right: '-5%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div className="absolute pointer-events-none" style={{
          bottom: '-10%', left: '-5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />

        {/* ── Moving scan line ── */}
        <div
          className="absolute left-0 right-0 h-[2px] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)',
            animation: 'scanDown 8s linear infinite',
          }}
        />

        <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          {/* ── HEADER ── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div style={{ animation: 'blink 1.2s step-end infinite' }} className="w-2 h-2 rounded-full bg-[#a78bfa]" />
                <span className="text-[#a78bfa] font-mono text-xs tracking-[0.35em] uppercase">
                  sys.credentials.verified
                </span>
              </div>
              <div style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0.4), transparent)' }} className="h-px flex-1 max-w-[200px]" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h2
                  className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
                  style={{
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 0.9,
                  }}
                >
                  CERTIFI
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    CATIONS
                  </span>
                </h2>
              </div>

              {/* Terminal-style stat block */}
              <div
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
                className="rounded-xl border p-5 font-mono text-xs space-y-2 min-w-[220px]"
              >
                {[
                  { k: 'total_certs', v: `${CERTIFICATES.length}`, color: '#a78bfa' },
                  { k: 'platforms',   v: '5',        color: '#06b6d4' },
                  { k: 'achievement', v: '1 × GOLD', color: '#fbbf24' },
                  { k: 'status',      v: 'ACTIVE',   color: '#34d399' },
                ].map(({ k, v, color }) => (
                  <div key={k} className="flex justify-between items-center gap-6">
                    <span className="text-white/25 tracking-wider">{k}</span>
                    <span style={{ color }} className="font-black tracking-widest">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── FILTER TABS ── */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.slice(0, 10).map(f => {
              const isActive = f === activeFilter;
              return (
                <button
                  key={f}
                  onClick={() => { setActiveFilter(f); setShowAll(false); }}
                  style={{
                    borderColor: isActive ? 'rgba(167,139,250,0.5)' : 'rgba(255,255,255,0.07)',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.3)',
                    background: isActive ? 'rgba(167,139,250,0.12)' : 'transparent',
                    boxShadow: isActive ? '0 0 16px rgba(167,139,250,0.2)' : 'none',
                    fontFamily: 'monospace',
                  }}
                  className="px-3.5 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-200"
                >
                  {isActive && <span className="text-[#a78bfa] mr-1">◈</span>}
                  {f}
                </button>
              );
            })}
          </div>

          {/* ── CERT GRID ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ animation: 'gridFade 0.5s ease both' }}
            key={activeFilter}
          >
            {displayed.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>

          {/* ── SHOW MORE ── */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                style={{
                  borderColor: 'rgba(167,139,250,0.3)',
                  color: '#a78bfa',
                  background: 'rgba(167,139,250,0.06)',
                }}
                className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl border font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-[rgba(167,139,250,0.12)] hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]"
              >
                <span>LOAD {filtered.length - 9} MORE</span>
                <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* ── BOTTOM BAR ── */}
          <div
            style={{ borderTopColor: 'rgba(255,255,255,0.06)' }}
            className="flex items-center justify-between mt-14 pt-6 border-t"
          >
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-white/20" />
              <span className="text-white/20 font-mono text-[10px] tracking-widest uppercase">
                All credentials verified · Click any card to open PDF
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div style={{ animation: 'pulseAccent 2s ease infinite' }} className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span className="text-[#34d399] font-mono text-[10px] tracking-widest">LIVE</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Certificates;