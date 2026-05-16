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

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-[15px] sm:left-[31px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"
          />

          <div className="space-y-12 sm:space-y-20 relative pt-10 pb-10">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="timeline-item relative pl-12 sm:pl-32"
              >
                {/* Glowing Node */}
                <div className="absolute left-[7px] sm:left-[23px] top-1.5 sm:top-2 w-[18px] h-[18px] rounded-full bg-[#050505] border-[3px] border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)] z-10 transition-transform duration-300 hover:scale-125" />

                {/* Content */}
                <div className="relative group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 mb-3 sm:mb-4">
                    <span className="text-amber-500 font-bold tracking-widest text-xl sm:text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
                      {m.year}
                    </span>
                    <h3 className="font-semibold text-xl sm:text-2xl text-white/90">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
