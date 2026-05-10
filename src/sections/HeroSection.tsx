'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  /* ── Entrance animations ── */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 });

    // Stagger each word in the title
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { y: 80, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' }
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0, filter: 'blur(8px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    );

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (titleRef.current)
          gsap.set(titleRef.current, { y: self.progress * 120 });
        if (subtitleRef.current)
          gsap.set(subtitleRef.current, { y: self.progress * 80 });
        if (blobsRef.current)
          gsap.set(blobsRef.current, { y: self.progress * 60 });
      },
    });
  }, []);

  /* ── Mouse glow ── */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseGlowRef.current) return;
      gsap.to(mouseGlowRef.current, {
        x: e.clientX - 200,
        y: e.clientY - 200,
        duration: 1.5,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleWords = ["Creative", "Developer", "&", "Designer"];
  const titleLine2 = ["Building", "Digital", "Experiences"];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Gradient blobs */}
      <div ref={blobsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="gradient-blob blob-1" />
        <div className="gradient-blob blob-2" />
        <div className="gradient-blob" style={{
          width: 300, height: 300,
          background: 'var(--accent-cyan)',
          top: '30%', left: '60%',
          opacity: 0.08,
          animation: 'float-slow 20s ease-in-out infinite',
        }} />
      </div>

      {/* Mouse glow */}
      <div
        ref={mouseGlowRef}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main content */}
      <div className="section-container relative z-10 flex">
        <div className="max-w-md xl:max-w-xl text-left">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass text-xs tracking-widest uppercase text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Available for work
        </div>

        {/* Title — Line 1 */}
        <h1
          ref={titleRef}
          className="section-title mb-4 leading-tight"
          style={{
            perspective: '1000px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <span className="block overflow-hidden">
            {titleWords.map((w, i) => (
              <span
                key={i}
                className={`word inline-block mr-[0.25em] opacity-0 ${
                  w === '&' ? 'gradient-text' : ''
                }`}
              >
                {w}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden mt-1">
            {titleLine2.map((w, i) => (
              <span
                key={i}
                className="word inline-block mr-[0.25em] opacity-0 gradient-text"
              >
                {w}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="section-subtitle mb-10 opacity-0 text-lg"
        >
          I craft immersive, high-performance web experiences that push the
          boundaries of what&apos;s possible on the modern web — from cinematic
          scroll effects to GPU-accelerated interactions.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-start opacity-0">
          <button
            className="magnetic-btn"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor-hover
          >
            <span>View Projects</span>
          </button>
          <button
            className="magnetic-btn"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor-hover
            style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <span>Get In Touch</span>
          </button>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap justify-start gap-2 mt-10">
          {['React', 'Next.js', 'TypeScript', 'Three.js', 'GSAP', 'Figma'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs text-white/40 glass"
              style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}
            >
              {tech}
            </span>
          ))}
        </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-indigo-500/50 to-transparent"
          style={{ animation: 'scroll-indicator 2s ease-in-out infinite' }} />
      </div>

      {/* Floating orbs — decorative */}
      {[
        { size: 80, top: '15%', left: '8%', color: 'rgba(99,102,241,0.25)', delay: '0s' },
        { size: 50, top: '70%', left: '12%', color: 'rgba(168,85,247,0.2)', delay: '2s' },
        { size: 120, top: '20%', right: '8%', color: 'rgba(34,211,238,0.15)', delay: '1s' },
        { size: 60, top: '65%', right: '15%', color: 'rgba(236,72,153,0.2)', delay: '3s' },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: (orb as { left?: string }).left,
            right: (orb as { right?: string }).right,
            background: orb.color,
            filter: 'blur(20px)',
            animation: `float ${4 + i * 1.2}s ease-in-out infinite`,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </section>
  );
}
