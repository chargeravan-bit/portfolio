'use client';

const testimonials1 = [
  {
    name: 'Sarah K.',
    role: 'CEO, TechVentures',
    text: 'Absolutely blew us away. The website feels like a luxury digital experience — our conversions doubled after launch.',
    initial: 'SK',
  },
  {
    name: 'Marcus R.',
    role: 'Product Designer at Spotify',
    text: 'The animations and interactions are on another level. This developer truly understands both code and design.',
    initial: 'MR',
  },
  {
    name: 'Priya M.',
    role: 'Founder, StartupX',
    text: 'Delivered beyond our expectations. The 3D product showcase is cinematic — exactly what our brand needed.',
    initial: 'PM',
  },
  {
    name: 'James W.',
    role: 'CTO, FinTech Inc.',
    text: 'Exceptional technical skills. Built our complex real-time dashboard with flawless performance across all devices.',
    initial: 'JW',
  },
];

function TestimonialCard({ name, role, text, initial }: (typeof testimonials1)[0]) {
  return (
    <div
      className="w-full glass rounded-2xl p-6 mb-6"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <p className="text-sm text-white/60 leading-relaxed mb-4 italic">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-amber-500"
          style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
          {initial}
        </div>
        <div>
          <div className="text-sm font-semibold text-white/80">{name}</div>
          <div className="text-xs text-white/30">{role}</div>
        </div>
      </div>
      {/* Stars */}
      <div className="flex gap-0.5 mt-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xs">★</span>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
    >

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left column for Testimonials */}
          <div className="relative z-10 text-left max-w-lg pr-8">
            <div className="mb-12">
              <p className="text-sm tracking-widest uppercase text-amber-500 mb-3 font-medium">
                Testimonials
              </p>
              <h2 className="section-title mb-4">
                What Clients <span className="gradient-text">Say</span>
              </h2>
              <p className="section-subtitle">
                Building lasting relationships through exceptional work and
                transparent communication.
              </p>
            </div>

            <div className="flex flex-col">
              {testimonials1.map((t, i) => (
                <TestimonialCard key={`row1-${i}`} {...t} />
              ))}
            </div>
          </div>

          {/* Empty right column for face separation */}
          <div className="hidden lg:block pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
