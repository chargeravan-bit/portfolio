'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

export default function FrameSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const displayFrameRef = useRef(0);
  const isLoadedRef = useRef(false);
  const rafRef = useRef<number>(0);

  /* ── Preload all frames ── */
  useEffect(() => {
    const frames: HTMLImageElement[] = [];
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded === TOTAL_FRAMES) {
        isLoadedRef.current = true;
        framesRef.current = frames;
        drawFrame(0);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = onLoad;
      img.onerror = onLoad; // still count errors so we don't hang
      frames[i - 1] = img;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Draw a specific frame onto canvas ── */
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames[index]) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = frames[index];
    const { width: cw, height: ch } = canvas;
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  /* ── Smooth interpolation RAF loop ── */
  useEffect(() => {
    const animate = () => {
      const target = currentFrameRef.current;
      const current = displayFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.3) {
        displayFrameRef.current += diff * 0.12;
        const frameIdx = Math.round(displayFrameRef.current);
        if (frameIdx >= 0 && frameIdx < TOTAL_FRAMES && isLoadedRef.current) {
          drawFrame(frameIdx);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Canvas resize ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (isLoadedRef.current) drawFrame(Math.round(currentFrameRef.current));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── ScrollTrigger ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: false,
      scrub: true,
      onUpdate: (self) => {
        const frame = Math.min(
          Math.floor(self.progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );
        currentFrameRef.current = frame;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="frames"
      style={{ height: `${TOTAL_FRAMES * 6}px` }}  /* scroll room */
      className="relative"
    >
      {/* Sticky viewport for canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="frame-canvas absolute inset-0"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Vignette */}
        <div className="vignette" />

        {/* Glow ring */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 120px rgba(99,102,241,0.12)',
          }}
        />

        {/* Side text labels */}
        <div className="absolute left-8 bottom-12 flex flex-col gap-2 opacity-60">
          <span className="text-xs tracking-widest uppercase text-white/40" style={{ fontFamily: 'var(--font-body)' }}>
            Scroll to reveal
          </span>
          <div className="w-12 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
        </div>

        <div className="absolute right-8 bottom-12 text-right opacity-60">
          <span className="text-xs tracking-widest uppercase text-white/40" style={{ fontFamily: 'var(--font-body)' }}>
            360° View
          </span>
        </div>

        {/* Holographic corner accents */}
        {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`}>
            <div className="w-full h-full" style={{
              borderTop: i < 2 ? '1px solid rgba(99,102,241,0.4)' : 'none',
              borderBottom: i >= 2 ? '1px solid rgba(99,102,241,0.4)' : 'none',
              borderLeft: i % 2 === 0 ? '1px solid rgba(99,102,241,0.4)' : 'none',
              borderRight: i % 2 === 1 ? '1px solid rgba(99,102,241,0.4)' : 'none',
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
