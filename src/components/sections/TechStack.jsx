import React, { useRef, useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'languages',
    label: 'Languages',
    icon: '⌨️',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.3)',
    skills: [
      { name: 'Python',     icon: '🐍', level: 90 },
      { name: 'JavaScript', icon: '🌐', level: 82 },
      { name: 'C++',        icon: '⚙️', level: 75 },
      { name: 'Java',       icon: '☕', level: 70 },
      { name: 'SQL',        icon: '🗄️', level: 78 },
    ],
  },
  {
    id: 'ai_ml',
    label: 'AI & ML',
    icon: '🤖',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    skills: [
      { name: 'Machine Learning',  icon: '📊', level: 85 },
      { name: 'Deep Learning',     icon: '🧠', level: 80 },
      { name: 'Computer Vision',   icon: '👁️', level: 78 },
      { name: 'NLP',               icon: '💬', level: 75 },
      { name: 'LangChain / RAG',   icon: '🔗', level: 72 },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Tools',
    icon: '🛠️',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    skills: [
      { name: 'React',       icon: '⚛️', level: 80 },
      { name: 'React Native',icon: '📱', level: 75 },
      { name: 'Node.js',     icon: '🟢', level: 70 },
      { name: 'TensorFlow',  icon: '🔶', level: 72 },
      { name: 'PyTorch',     icon: '🔥', level: 74 },
    ],
  },
  {
    id: 'cs',
    label: 'CS Fundamentals',
    icon: '📐',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    skills: [
      { name: 'Data Structures', icon: '🌲', level: 88 },
      { name: 'Algorithms',      icon: '🔢', level: 85 },
      { name: 'OOP',             icon: '🎯', level: 83 },
      { name: 'DBMS',            icon: '💾', level: 78 },
      { name: 'Networking',      icon: '🌐', level: 70 },
    ],
  },
  {
    id: 'devtools',
    label: 'Dev Tools',
    icon: '🔧',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    skills: [
      { name: 'Git',          icon: '🗃️', level: 85 },
      { name: 'GitHub',       icon: '🐙', level: 85 },
      { name: 'OpenCV',       icon: '🎨', level: 76 },
      { name: 'REST APIs',    icon: '🔌', level: 78 },
      { name: 'Cloud / Vercel',icon: '☁️', level: 68 },
    ],
  },
];

const MARQUEE_SKILLS = [
  'Python','Machine Learning','React','Deep Learning','LangChain',
  'PyTorch','TensorFlow','Node.js','Computer Vision','NLP',
  'C++','Java','SQL','Git','OpenCV','React Native','REST APIs',
  'Data Structures','Algorithms','OOP','DBMS','RAG',
];

/* ─────────────────────────────────────────────────────────────
   SKILL CARD
───────────────────────────────────────────────────────────── */
const SkillCard = ({ skill, color, glow, index }) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.4s ease ${index * 0.06}s, transform 0.4s ease ${index * 0.06}s`,
        boxShadow: hovered ? `0 0 20px ${glow}, 0 8px 32px rgba(0,0,0,0.4)` : '0 2px 12px rgba(0,0,0,0.3)',
        borderColor: hovered ? color : 'rgba(255,255,255,0.07)',
        background: hovered
          ? `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.2) 100%)`
          : `rgba(255,255,255,0.03)`,
        transition: 'all 0.25s ease',
      }}
      className="rounded-xl border p-3 cursor-default"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{skill.icon}</span>
          <span className="text-sm font-semibold text-white/90">{skill.name}</span>
        </div>
        <span style={{ color }} className="text-xs font-bold font-mono">
          {skill.level}%
        </span>
      </div>
      {/* Progress Bar */}
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          style={{
            width: visible ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transition: `width 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.08 + 0.3}s`,
            boxShadow: `0 0 8px ${color}`,
          }}
          className="h-full rounded-full"
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CATEGORY TAB
───────────────────────────────────────────────────────────── */
const CategoryTab = ({ cat, isActive, onClick }) => (
  <button
    onClick={() => onClick(cat.id)}
    style={{
      borderColor: isActive ? cat.color : 'rgba(255,255,255,0.1)',
      color: isActive ? cat.color : 'rgba(255,255,255,0.5)',
      background: isActive
        ? `linear-gradient(135deg, ${cat.color}15, ${cat.color}05)`
        : 'transparent',
      boxShadow: isActive ? `0 0 16px ${cat.glow}` : 'none',
    }}
    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 whitespace-nowrap"
  >
    <span>{cat.icon}</span>
    <span className="hidden sm:inline">{cat.label}</span>
  </button>
);

/* ─────────────────────────────────────────────────────────────
   MARQUEE ROW
───────────────────────────────────────────────────────────── */
const MarqueeRow = ({ reverse = false }) => {
  const doubled = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="overflow-hidden w-full">
      <div
        style={{
          display: 'flex',
          gap: '12px',
          width: 'max-content',
          animation: `marquee${reverse ? 'Reverse' : ''} 30s linear infinite`,
        }}
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/60 whitespace-nowrap backdrop-blur-sm"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const TechStack = () => {
  const [activeId, setActiveId] = useState('languages');
  const activeCategory = CATEGORIES.find(c => c.id === activeId);

  return (
    <>
      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }
      `}</style>

      <section id="techstack" className="relative py-28 bg-[#050505] overflow-hidden">

        {/* Background ambient blobs */}
        <div
          style={{
            position: 'absolute', top: '10%', left: '5%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '10%', right: '5%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }}
        />

        {/* Top divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          {/* ── Header ── */}
          <div className="text-center mb-16" style={{ animation: 'fadeUp 0.6s ease both' }}>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/30 mb-4">
              skills & expertise
            </p>
            <h2
              className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight"
              style={{
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'gradientShift 4s ease infinite',
              }}
            >
              Tech Stack
            </h2>
            <p className="mt-4 text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
              A curated overview of the technologies, frameworks, and tools I work with daily to build AI-powered products.
            </p>
          </div>

          {/* ── Category Tabs ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <CategoryTab
                key={cat.id}
                cat={cat}
                isActive={activeId === cat.id}
                onClick={setActiveId}
              />
            ))}
          </div>

          {/* ── Active Category Panel ── */}
          <div
            key={activeId}
            style={{
              animation: 'fadeUp 0.35s ease both',
              borderColor: `${activeCategory.color}30`,
              boxShadow: `0 0 60px ${activeCategory.glow}`,
            }}
            className="rounded-2xl border bg-white/[0.02] backdrop-blur-sm p-6 md:p-8"
          >
            {/* Panel Header */}
            <div className="flex items-center gap-3 mb-8">
              <div
                style={{ background: `${activeCategory.color}20`, border: `1px solid ${activeCategory.color}40` }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              >
                {activeCategory.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{activeCategory.label}</h3>
                <p className="text-xs text-white/40 font-mono">{activeCategory.skills.length} skills</p>
              </div>
              {/* Decorative accent line */}
              <div
                className="ml-auto h-px flex-1 max-w-[120px]"
                style={{ background: `linear-gradient(90deg, ${activeCategory.color}, transparent)` }}
              />
            </div>

            {/* Skill Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategory.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  color={activeCategory.color}
                  glow={activeCategory.glow}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* ── All Skills Summary (Stat Numbers) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { value: '5+', label: 'Programming Languages', color: '#6366f1' },
              { value: '8+', label: 'Certifications Earned', color: '#a855f7' },
              { value: '4+', label: 'Live Projects Built',    color: '#06b6d4' },
              { value: '20+', label: 'Tools & Frameworks',   color: '#10b981' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  borderColor: `${stat.color}30`,
                  animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                }}
                className="rounded-xl border bg-white/[0.025] backdrop-blur-sm p-5 text-center"
              >
                <div
                  style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}` }}
                  className="text-3xl font-black font-mono"
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 mt-1 font-mono leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scrolling Marquee ── */}
        <div className="mt-16 space-y-3">
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>
    </>
  );
};

export default TechStack;
