'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { MonitorPlay, LineChart, ShoppingBag, MessageCircle } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Cinematic Portfolio',
    category: 'Web Experience',
    desc: 'Award-winning portfolio with frame-by-frame scroll animation, WebGL particles, and GSAP-orchestrated cinematic transitions.',
    tech: ['Next.js', 'GSAP', 'Three.js', 'WebGL'],
    gradient: 'from-amber-900/40 to-yellow-900/40',
    border: 'rgba(251,191,36,0.3)',
    glow: 'rgba(251,191,36,0.15)',
    emoji: <MonitorPlay size={32} />,
    year: '2024',
  },
  {
    id: 2,
    title: 'AI SaaS Dashboard',
    category: 'Full-Stack App',
    desc: 'Real-time analytics dashboard with AI-powered insights, live data streams, and interactive 3D data visualizations.',
    tech: ['React', 'Python', 'FastAPI', 'D3.js'],
    gradient: 'from-orange-900/40 to-amber-900/40',
    border: 'rgba(245,158,11,0.3)',
    glow: 'rgba(245,158,11,0.15)',
    emoji: <LineChart size={32} />,
    year: '2024',
  },
  {
    id: 3,
    title: 'E-Commerce 3D Store',
    category: '3D Product Showcase',
    desc: 'Luxury brand experience with 3D product configurator, AR preview, real-time customization, and smooth checkout flow.',
    tech: ['Next.js', 'Three.js', 'Stripe', 'Prisma'],
    gradient: 'from-yellow-900/40 to-orange-900/40',
    border: 'rgba(253,230,138,0.3)',
    glow: 'rgba(253,230,138,0.15)',
    emoji: <ShoppingBag size={32} />,
    year: '2023',
  },
  {
    id: 4,
    title: 'Social Media App',
    category: 'Mobile App',
    desc: 'Real-time social platform with WebRTC video calls, live reactions, community hubs, and end-to-end encryption.',
    tech: ['React Native', 'Firebase', 'WebRTC', 'Node.js'],
    gradient: 'from-amber-800/40 to-yellow-800/40',
    border: 'rgba(217,119,6,0.3)',
    glow: 'rgba(217,119,6,0.15)',
    emoji: <MessageCircle size={32} />,
    year: '2023',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: 8 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.8, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Tilt on mouse move */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 12, rotateX: -y * 12,
      transformPerspective: 800,
      duration: 0.4, ease: 'power2.out',
    });
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.8)' });
    setHoveredId(null);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="gradient-blob blob-2" style={{ opacity: 0.07 }} />

      <div className="section-container">
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase text-amber-500 mb-3 font-medium">
            Portfolio
          </p>
          <h2 className="section-title mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A selection of work that demonstrates my ability to build complex,
            beautiful, and high-performance digital products.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              ref={el => { cardRefs.current[i] = el; }}
              className="relative rounded-2xl overflow-hidden group glass-strong h-full flex flex-col"
              style={{
                background: `linear-gradient(135deg, var(--bg-tertiary), ${proj.gradient.split(' ').pop()?.replace('/40', '')?.replace('to-', '') ?? 'var(--bg-primary)'}33)`,
                border: `1px solid ${hoveredId === proj.id ? proj.border : 'rgba(255,255,255,0.06)'}`,
                boxShadow: hoveredId === proj.id ? `0 0 40px ${proj.glow}` : 'none',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseEnter={() => setHoveredId(proj.id)}
              onMouseLeave={() => handleMouseLeave(i)}
              data-cursor-hover
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${proj.gradient} opacity-40`} />

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-amber-400">
                    {proj.emoji}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] tracking-widest uppercase text-white/30 font-bold">
                      {proj.year}
                    </span>
                    <span className="text-[10px] text-amber-500/80 glass-strong px-2.5 py-1 rounded-full border border-amber-500/20 font-medium">
                      {proj.category}
                    </span>
                  </div>
                </div>

                <h3
                  className="text-xl font-bold mb-3 transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: hoveredId === proj.id ? 'white' : 'rgba(255,255,255,0.9)',
                  }}
                >
                  {proj.title}
                </h3>

                <p className="text-sm text-white/50 leading-relaxed mb-6 flex-grow">
                  {proj.desc}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.tech.map(t => (
                    <span
                      key={t}
                      className="text-[10px] px-2.5 py-1 rounded-lg border border-white/5"
                      style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="mt-auto">
                  <button
                    className="magnetic-btn w-full py-2.5 text-xs group/btn"
                    style={{ borderRadius: '12px' }}
                    data-cursor-hover
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Project 
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Hover glow border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
                style={{
                  boxShadow: `inset 0 0 60px ${proj.glow}`,
                  opacity: hoveredId === proj.id ? 1 : 0,
                }}
              />
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="flex justify-center mt-16">
          <button className="magnetic-btn px-10" data-cursor-hover>
            <span>Explore All Projects</span>
          </button>
        </div>
      </div>
    </section>
  );
}
