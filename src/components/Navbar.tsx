'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll.current && current > 100);
      setScrolled(current > 50);
      lastScroll.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: 'power3.out' }
    );
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 z-[10000] opacity-0"
      style={{
        transform: `translateX(-50%) translateY(${hidden ? '-120px' : '0px'})`,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-lg shadow-black/20'
            : 'glass'
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            data-cursor-hover
            className="relative px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white rounded-full transition-all duration-300 hover:bg-white/5"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
