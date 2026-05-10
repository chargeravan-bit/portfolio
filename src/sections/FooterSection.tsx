'use client';

export default function FooterSection() {
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      id="footer"
      className="relative overflow-hidden glass mix-blend-screen"
    >
      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="section-container py-16">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ background: 'var(--accent-gradient)', fontFamily: 'var(--font-heading)' }}
            >
              MR
            </div>
            <span className="text-white/60 text-sm">Creative Developer</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6 justify-center">
            {['Hero', 'About', 'Skills', 'Projects', 'Timeline', 'Contact'].map((label) => (
              <button
                key={label}
                onClick={() => document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
                data-cursor-hover
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-xs text-white/20 text-center tracking-wider max-w-sm">
            Crafting immersive digital experiences that sit at the intersection
            of design, technology, and storytelling.
          </p>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom row */}
          <div className="flex items-center justify-between w-full max-w-lg">
            <p className="text-xs text-white/25">
              © {year} Mohan Rathod Portfolio. All rights reserved.
            </p>
            <p className="text-xs text-white/25">
              Built with <span className="gradient-text">Next.js</span> & ❤️
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        data-cursor-hover
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center text-lg glass glow-border hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Scroll to top"
        style={{ boxShadow: 'var(--glow-blue)' }}
      >
        ↑
      </button>
    </footer>
  );
}
