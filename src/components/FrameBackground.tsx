'use client';

import { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

export default function FrameBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const displayFrameRef = useRef(0);
  const isLoadedRef = useRef(false);
  const rafRef = useRef<number>(0);

  /* ── Preload all frames ── */
  useEffect(() => {
    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          framesRef.current = frames;
          isLoadedRef.current = true;
          drawFrame(0);
        }
      };
      frames[i - 1] = img;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Canvas resize ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (isLoadedRef.current) drawFrame(Math.round(displayFrameRef.current));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Draw frame on canvas ── */
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames[index]) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = frames[index];
    if (!img || !img.naturalWidth) return;

    const { width: cw, height: ch } = canvas;

    // Scale to cover center nicely — contain+center
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight) * 1.05;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    // Shift image slightly right to center the face in the overall layout
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  /* ── Smooth RAF interpolation loop ── */
  useEffect(() => {
    const animate = () => {
      const target = currentFrameRef.current;
      const current = displayFrameRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.2) {
        displayFrameRef.current += diff * 0.1;
        const idx = Math.round(displayFrameRef.current);
        if (idx >= 0 && idx < TOTAL_FRAMES && isLoadedRef.current) {
          drawFrame(idx);
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Scroll → frame index ── */
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
      currentFrameRef.current = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    /* Fixed full-screen background — behind everything */
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* The canvas renders the frame */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Dark vignette on left — so left-side content is readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              to right,
              rgba(5,5,5,0.96) 0%,
              rgba(5,5,5,0.85) 22%,
              rgba(5,5,5,0.50) 38%,
              rgba(5,5,5,0.15) 50%,
              rgba(5,5,5,0.15) 55%,
              rgba(5,5,5,0.50) 68%,
              rgba(5,5,5,0.85) 80%,
              rgba(5,5,5,0.96) 100%
            )
          `,
        }}
      />

      {/* Top dark fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '15%',
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.9), transparent)',
      }} />

      {/* Bottom dark fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%',
        background: 'linear-gradient(to top, rgba(5,5,5,0.9), transparent)',
      }} />

      {/* Subtle holographic corner accents */}
      {(['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'] as const).map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8`} style={{
          borderTop:    i < 2  ? '1px solid rgba(99,102,241,0.3)' : 'none',
          borderBottom: i >= 2 ? '1px solid rgba(99,102,241,0.3)' : 'none',
          borderLeft:   i % 2 === 0 ? '1px solid rgba(99,102,241,0.3)' : 'none',
          borderRight:  i % 2 === 1 ? '1px solid rgba(99,102,241,0.3)' : 'none',
        }} />
      ))}

      {/* Frame counter — small UI element */}
      <div style={{
        position: 'absolute', bottom: 16, right: 20,
        fontSize: 10, letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.2)',
        fontFamily: 'monospace',
      }}>
        360°
      </div>
    </div>
  );
}
