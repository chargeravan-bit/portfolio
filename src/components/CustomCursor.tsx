'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseEnterInteractive = () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    };

    const onMouseLeaveInteractive = () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    };

    const animate = () => {
      // Dot follows tightly
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.2;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.2;
      
      // Ring follows with lag
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.08;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.08;

      gsap.set(dot, {
        x: dotPos.current.x - dot.offsetWidth / 2,
        y: dotPos.current.y - dot.offsetHeight / 2,
      });
      gsap.set(ring, {
        x: ringPos.current.x - ring.offsetWidth / 2,
        y: ringPos.current.y - ring.offsetHeight / 2,
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    animate();

    // Observe for new interactive elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [data-cursor-hover]');
      newInteractives.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
