'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Code2, Database, PenTool, Package, TerminalSquare, LayoutDashboard } from 'lucide-react';
import { SiFigma } from 'react-icons/si';

const skillCategories = [
  {
    label: 'Frontend',
    icon: <Code2 size={24} />,
    color: 'from-amber-500 to-yellow-600',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'CSS / Tailwind', level: 95 },
      { name: 'WebGL / Three.js', level: 80 },
    ],
  },
  {
    label: 'Backend',
    icon: <Database size={24} />,
    color: 'from-yellow-500 to-orange-500',
    skills: [
      { name: 'Node.js / Express', level: 82 },
      { name: 'Python / FastAPI', level: 75 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'Firebase', level: 85 },
    ],
  },
  {
    label: 'Design',
    icon: <PenTool size={24} />,
    color: 'from-orange-500 to-amber-600',
    skills: [
      { name: 'Figma', level: 90 },
      { name: 'UI/UX Design', level: 88 },
      { name: 'Motion Design', level: 82 },
      { name: 'Brand Identity', level: 75 },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const category = skillCategories[activeTab];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="section-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Title & Tabs */}
          <div ref={leftRef}>
            <div className="mb-10 text-left">
              <p className="text-sm tracking-widest uppercase text-amber-500 mb-3 font-medium">
                Expertise
              </p>
              <h2 className="section-title mb-4">
                My <span className="gradient-text">Skills</span>
              </h2>
              <p className="section-subtitle">
                A versatile tech stack refined through years of building
                production-grade applications and creative experiments.
              </p>
            </div>

            {/* Tabs (Vertical layout) */}
            <div className="flex flex-col gap-3 max-w-sm">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveTab(i)}
                  data-cursor-hover
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-400 border ${
                    activeTab === i
                      ? 'text-white border-amber-500/50'
                      : 'glass text-white/50 hover:text-white/80 border-transparent'
                  }`}
                  style={
                    activeTab === i
                      ? { background: 'var(--accent-gradient)', boxShadow: 'var(--glow-blue)' }
                      : {}
                  }
                >
                  <span className="text-xl">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Skills grid */}
          <div ref={rightRef}>
            <div className="skill-card glass-strong rounded-2xl p-8 glow-border">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${category.color}`}
                  style={{ boxShadow: 'var(--glow-blue)' }}
                >
                  {category.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl font-semibold">
                  {category.label}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map(({ name, level }) => (
                  <div key={name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white/80">{name}</span>
                      <span className="text-xs text-amber-500 font-medium">{level}%</span>
                    </div>
                    <div className="relative h-2 rounded-full overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                        style={{
                          width: `${level}%`,
                          background: `linear-gradient(90deg, ${
                            activeTab === 0 ? '#d4af37, #ffb703' :
                            activeTab === 1 ? '#ffb703, #c5a059' :
                            '#c5a059, #b8860b'
                          })`,
                          boxShadow: '0 0 8px rgba(212,175,55,0.5)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Daily Tools beneath */}
            <div className="mt-6 glass rounded-2xl p-5 flex flex-wrap gap-4 items-center justify-center">
               <span className="text-xs text-white/40 uppercase tracking-widest w-full text-center mb-2">Daily Tools</span>
               <div className="flex gap-4 text-white/60">
                  <SiFigma size={20} className="hover:text-amber-400 transition-colors" />
                  <Package size={20} className="hover:text-amber-400 transition-colors" />
                  <TerminalSquare size={20} className="hover:text-amber-400 transition-colors" />
                  <LayoutDashboard size={20} className="hover:text-amber-400 transition-colors" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
