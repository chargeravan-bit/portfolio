'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Rocket, Code, Laptop, Sparkles, Layout } from 'lucide-react';

const milestones = [
  {
    year: '2021',
    title: 'Started the Journey',
    desc: 'Began learning web development, fell in love with HTML, CSS, and JavaScript. Built my first interactive website.',
    icon: <Code size={20} />,
    color: 'var(--accent-cyan)',
  },
  {
    year: '2022',
    title: 'React & Beyond',
    desc: 'Dove deep into React, mastered hooks and state management. Started building real-world applications and freelancing.',
    icon: <Layout size={20} />,
    color: 'var(--accent-blue)',
  },
  {
    year: '2023',
    title: 'Full-Stack & Design',
    desc: 'Expanded into Node.js, databases, UI/UX design. Delivered 20+ client projects ranging from e-commerce to SaaS products.',
    icon: <Rocket size={20} />,
    color: 'var(--accent-purple)',
  },
  {
    year: '2024',
    title: 'Creative Dev & 3D',
    desc: 'Mastered Three.js, WebGL, and GSAP. Started building award-level web experiences combining art and engineering.',
    icon: <Laptop size={20} />,
    color: 'var(--accent-pink)',
  },
  {
    year: '2025+',
    title: 'Building the Future',
    desc: 'Focused on cutting-edge AI integrations, immersive XR experiences, and pushing creative boundaries of the web.',
    icon: <Sparkles size={20} />,
    color: 'var(--accent-cyan)',
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
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

      // Animate the vertical line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      // Stagger each milestone
      gsap.fromTo(
        '.timeline-item',
        { x: -60, opacity: 0, filter: 'blur(6px)' },
        {
          x: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-item', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="gradient-blob blob-3" style={{ opacity: 0.05 }} />

      <div className="section-container">
        <div ref={titleRef} className="text-left mb-20">
          <p className="text-sm tracking-widest uppercase text-amber-500 mb-3 font-medium">
            Journey
          </p>
          <h2 className="section-title mb-4">
            My <span className="gradient-text">Timeline</span>
          </h2>
          <p className="section-subtitle">
            From curious beginner to seasoned creative developer — every
            chapter of the story.
          </p>
        </div>

        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"
          />

          <div className="space-y-16 relative">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="timeline-item relative pl-8 sm:pl-20"
              >
                {/* Glowing Node */}
                <div className="absolute left-[-5px] sm:left-[11px] top-10 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)] z-10" />

                {/* Content card */}
                <div className="glass-strong rounded-3xl p-8 sm:p-10 glow-border relative overflow-hidden group">
                  {/* Giant background year watermark */}
                  <div className="absolute -bottom-8 -right-4 text-9xl font-black text-white/[0.02] select-none group-hover:text-amber-500/[0.04] transition-colors duration-500 font-sans tracking-tighter">
                    {m.year}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-amber-500 shadow-inner hidden sm:block">
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="sm:hidden text-amber-500">{m.icon}</span>
                        <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">
                          {m.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-2xl sm:text-3xl mb-4 text-white/90" style={{ fontFamily: 'var(--font-heading)' }}>
                        {m.title}
                      </h3>
                      <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
