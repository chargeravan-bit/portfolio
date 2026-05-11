'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '20+', label: 'Happy Clients' },
  { value: '99%', label: 'Client Satisfaction' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      router.push('/admin');
      setClickCount(0); // reset after triggering
    } else {
      setTimeout(() => setClickCount(0), 3000); // reset if they pause
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        textRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      // Card reveal
      gsap.fromTo(
        cardRef.current,
        { x: 60, opacity: 0, rotateY: 15 },
        {
          x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      // Stats counter
      const statEls = statsRef.current?.querySelectorAll('.stat-number');
      statEls?.forEach((el) => {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

      <div className="gradient-blob" style={{
        width: 400, height: 400, top: '10%', right: '-5%',
        background: 'var(--accent-purple)', opacity: 0.07,
      }} />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <div ref={textRef} className="lg:pr-8">
            <p className="text-sm tracking-widest uppercase text-amber-400 mb-4 font-medium">
              About Me
            </p>
            <h2 className="section-title mb-6">
              Turning Ideas Into{' '}
              <span className="gradient-text">Digital Art</span>
            </h2>
            <p className="section-subtitle mb-6">
              I&apos;m a full-stack creative developer passionate about building
              immersive digital experiences that sit at the intersection of
              design and technology.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-8">
              With expertise spanning React ecosystems, WebGL shaders, and 
              motion design, I combine technical precision with creative vision
              to produce award-worthy web experiences. Every pixel, every 
              interaction, every animation is intentional.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['UI/UX Design', 'Frontend Dev', 'WebGL / Three.js', 'Motion Design', 'Performance Optimization'].map(tag => (
                <span key={tag} className="glass px-3 py-1.5 rounded-full text-xs text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Glass card */}
          <div ref={cardRef} className="relative" style={{ perspective: '1000px' }}>
            {/* Main glass card */}
            <div className="glass-strong rounded-2xl p-8 relative overflow-hidden glow-border">
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                  <Rocket className="text-amber-400" />
                </div>
                <div>
                  <h3 
                    onClick={handleSecretClick}
                    className="font-semibold text-lg cursor-pointer select-none" 
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Creative Developer
                  </h3>
                  <p className="text-white/40 text-sm mt-0.5">Full-Stack & Motion Design</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { skill: 'Frontend Development', pct: 95 },
                  { skill: 'UI/UX & Interaction Design', pct: 88 },
                  { skill: 'WebGL & 3D Graphics', pct: 80 },
                  { skill: 'Backend & APIs', pct: 75 },
                ].map(({ skill, pct }) => (
                  <div key={skill}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-white/60">{skill}</span>
                      <span className="text-xs text-amber-400">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: 'var(--accent-gradient)',
                          boxShadow: '0 0 10px rgba(212,175,55,0.4)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)' }} />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-2xl text-sm font-medium"
              style={{ border: '1px solid rgba(212,175,55,0.3)' }}>
              <span className="gradient-text">Open to Work</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl p-6 text-center glow-border group">
              <div className="stat-number section-title gradient-text mb-1 opacity-0"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {value}
              </div>
              <div className="text-sm text-white/40">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
