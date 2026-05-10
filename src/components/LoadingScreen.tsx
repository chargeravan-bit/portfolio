'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const counter = { val: 0 };

    tl.to(counter, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counter.val);
        if (barRef.current) barRef.current.style.width = `${v}%`;
        if (percentRef.current) percentRef.current.textContent = `${v}%`;
      },
    })
    .to(textRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, '-=0.3')
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete,
    });
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div ref={textRef} className="flex flex-col items-center gap-6">
        <div style={{ fontFamily: 'var(--font-heading)' }} className="text-4xl font-bold tracking-tight">
          <span className="gradient-text">IU</span>
          <span className="text-white/20 ml-3 text-2xl font-light">Portfolio</span>
        </div>

        {/* Animated bars */}
        <div className="flex items-end gap-1 h-10">
          {[30, 70, 45, 90, 55, 80, 40, 65, 75, 50, 85, 35, 60, 95, 45, 70, 55, 80, 40, 65].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full"
              style={{
                background: 'var(--accent-gradient)',
                height: `${h}%`,
                animation: `pulse-glow ${0.6 + (i % 4) * 0.2}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        <div className="loader-bar">
          <div ref={barRef} className="loader-bar-fill" style={{ width: '0%' }} />
        </div>

        <p className="text-white/30 text-xs tracking-widest uppercase font-light">
          Loading Experience <span ref={percentRef}>0%</span>
        </p>
      </div>
    </div>
  );
}
