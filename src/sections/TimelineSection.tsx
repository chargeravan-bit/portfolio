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

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Put timeline entirely in the left column */}
          <div className="relative max-w-lg">
            {/* Left side line */}
            <div
              ref={lineRef}
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-blue), var(--accent-purple), var(--accent-pink))' }}
            />

            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="timeline-item relative flex items-start mb-16 last:mb-0 pl-16 text-left"
              >
                {/* Center dot */}
                <div className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-xl z-10"
                  style={{
                    background: `${m.color}20`,
                    border: `2px solid ${m.color}60`,
                    boxShadow: `0 0 20px ${m.color}30`,
                  }}
                >
                  {m.icon}
                </div>

                {/* Content card */}
                <div className="glass rounded-2xl p-6 glow-border w-full">
                  <span className="text-xs tracking-widest uppercase mb-2 block"
                    style={{ color: m.color }}>
                    {m.year}
                  </span>
                  <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {m.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Right Column for center face separation */}
          <div className="hidden lg:block pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
