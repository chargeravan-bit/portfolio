'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Core layout components
import GrainOverlay from '@/components/GrainOverlay';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';

// Loading screen
import LoadingScreen from '@/components/LoadingScreen';

// Sections
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import TechStackSection from '@/sections/TechStackSection';
import ProjectsSection from '@/sections/ProjectsSection';
import TimelineSection from '@/sections/TimelineSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ContactSection from '@/sections/ContactSection';
import FooterSection from '@/sections/FooterSection';

// Frame sequence persistent background — dynamically loaded (client-only, no SSR)
const FrameBackground = dynamic(() => import('@/components/FrameBackground'), {
  ssr: false,
});

// Custom cursor — desktop only
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <GrainOverlay />
      <CustomCursor />

      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <SmoothScroll>
        <main
          className="relative min-h-screen"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          {/* This provides the fixed background sequence for the entire scroll */}
          {loaded && <FrameBackground />}

          <Navbar />

          {/* All content sections are stacked on top of the fixed background. 
              They need to have transparent backgrounds to let the frames show through. */}
          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <TechStackSection />
            <ProjectsSection />
            <TimelineSection />
            <TestimonialsSection />
            <ContactSection />
            <FooterSection />
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
