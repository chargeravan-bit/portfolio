'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Mail, MapPin, CheckCircle, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';

const social = [
  { label: 'GitHub', href: '#', icon: <FaGithub size={20} /> },
  { label: 'LinkedIn', href: '#', icon: <FaLinkedin size={20} /> },
  { label: 'Twitter', href: '#', icon: <FaTwitter size={20} /> },
  { label: 'Dribbble', href: '#', icon: <FaDribbble size={20} /> },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="gradient-blob blob-1" style={{ opacity: 0.08, left: '30%', top: '0' }} />
      <div className="gradient-blob blob-2" style={{ opacity: 0.08 }} />

      <div className="section-container">
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase text-amber-400 mb-3 font-medium">
            Contact
          </p>
          <h2 className="section-title mb-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind? Whether it&apos;s a startup MVP, a luxury
            brand experience, or something completely experimental — I&apos;m in.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Left info panel */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {/* Email card */}
              <div className="glass rounded-2xl p-6 glow-border">
                <div className="text-amber-400 mb-3"><Mail size={28} /></div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Email</div>
                <div className="text-sm text-amber-400 font-medium">mohanlaxmanrathod@outlook.com</div>
              </div>

              {/* Location card */}
              <div className="glass rounded-2xl p-6 glow-border">
                <div className="text-amber-400 mb-3"><MapPin size={28} /></div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Location</div>
                <div className="text-sm text-white/70">India — Remote Worldwide</div>
              </div>
            </div>

            {/* Availability */}
            <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(52,211,153,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 uppercase tracking-widest font-medium">Available Now</span>
              </div>
              <p className="text-sm text-white/50">
                Open for freelance projects, full-time roles, and creative collaborations.
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="glass w-12 h-12 rounded-xl flex items-center justify-center text-lg hover:scale-110 transition-transform duration-300 border border-white/10 hover:border-amber-500/30"
                  data-cursor-hover
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div ref={formRef}>
            <div className="glass-strong rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                  <div className="text-amber-400 animate-bounce"><CheckCircle size={54} /></div>
                  <h3 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                    Message Sent!
                  </h3>
                  <p className="text-white/50 text-sm max-w-[250px]">
                    Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="IU"
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/10 outline-none transition-all duration-300 bg-white/[0.03] border border-white/5 focus:border-amber-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/10 outline-none transition-all duration-300 bg-white/[0.03] border border-white/5 focus:border-amber-500/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">Project Message</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your project vision..."
                      className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/10 outline-none resize-none transition-all duration-300 bg-white/[0.03] border border-white/5 focus:border-amber-500/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="magnetic-btn w-full justify-center py-4 text-sm font-bold uppercase tracking-widest"
                    data-cursor-hover
                  >
                    <span className="flex items-center gap-3">Send Message <Send size={18} className="rotate-12" /></span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
