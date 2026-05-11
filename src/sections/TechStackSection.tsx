'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { SiReact, SiNextdotjs, SiTypescript, SiThreedotjs, SiGreensock, SiNodedotjs, SiPython, SiTailwindcss, SiFirebase, SiPostgresql, SiFigma } from 'react-icons/si';
import { FaGitAlt } from 'react-icons/fa';

const techStack = [
  { name: 'React', icon: <SiReact size={24} />, color: '#61dafb', category: 'Frontend' },
  { name: 'Next.js', icon: <SiNextdotjs size={24} />, color: '#ffffff', category: 'Frontend' },
  { name: 'TypeScript', icon: <SiTypescript size={24} />, color: '#3178c6', category: 'Language' },
  { name: 'Three.js', icon: <SiThreedotjs size={24} />, color: '#049ef4', category: '3D' },
  { name: 'GSAP', icon: <SiGreensock size={24} />, color: '#88ce02', category: 'Animation' },
  { name: 'Node.js', icon: <SiNodedotjs size={24} />, color: '#68a063', category: 'Backend' },
  { name: 'Python', icon: <SiPython size={24} />, color: '#3776ab', category: 'Backend' },
  { name: 'Tailwind', icon: <SiTailwindcss size={24} />, color: '#38bdf8', category: 'Styling' },
  { name: 'Firebase', icon: <SiFirebase size={24} />, color: '#ffca28', category: 'Cloud' },
  { name: 'PostgreSQL', icon: <SiPostgresql size={24} />, color: '#336791', category: 'Database' },
  { name: 'Figma', icon: <SiFigma size={24} />, color: '#f24e1e', category: 'Design' },
  { name: 'Git', icon: <FaGitAlt size={24} />, color: '#f05032', category: 'Tools' },
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        gridRef.current?.querySelectorAll('.tech-item') ?? [],
        { scale: 0.7, opacity: 0, y: 30 },
        {
          scale: 1, opacity: 1, y: 0,
          duration: 0.5, stagger: { each: 0.06, from: 'random' }, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="section-container">
        <div ref={titleRef} className="text-center md:text-left mb-16 max-w-xl">
          <p className="text-sm tracking-widest uppercase text-amber-500 mb-3 font-medium">
            Tech Arsenal
          </p>
          <h2 className="section-title mb-4">
            Tools &{' '}
            <span className="gradient-text-2">Technologies</span>
          </h2>
          <p className="section-subtitle">
            The technologies powering every project — carefully chosen for
            performance, developer experience, and user delight.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="tech-item glass rounded-xl p-6 flex flex-col items-center gap-4 group transition-all duration-300 hover:bg-white/[0.05]"
              data-cursor-hover
            >
              <div
                className="text-2xl w-14 h-14 flex items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 shadow-lg"
                style={{
                  background: `${tech.color}10`,
                  border: `1px solid ${tech.color}20`,
                  color: tech.color,
                }}
              >
                {tech.icon}
              </div>
              <div className="text-center">
                <span className="text-[11px] text-white/80 font-bold block mb-1">{tech.name}</span>
                <span className="text-[9px] text-white/30 tracking-widest uppercase font-medium">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee row — extra soft logos */}
        <div className="mt-16 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, transparent, transparent)' }} />

          <div className="flex gap-6 marquee-track opacity-30 select-none">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech.name}-${i}`}
                className="whitespace-nowrap text-sm font-medium text-white/40 px-4 py-2 glass rounded-full"
              >
                <div className="flex items-center gap-2">
                  <span className="opacity-80" style={{ color: tech.color }}>{tech.icon}</span> {tech.name}
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
