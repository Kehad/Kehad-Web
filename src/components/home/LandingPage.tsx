"use client";
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import HeroSection from './HeroSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function LandingPage() {
  // Custom Cursor Trackers
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXRaw = useMotionValue(-100);
  const cursorYRaw = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Small core dot (4px x 4px centered)
      cursorXRaw.set(e.clientX - 4);
      cursorYRaw.set(e.clientY - 4);
      // Trailing outline circle (32px x 32px centered)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, cursorXRaw, cursorYRaw]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="w-full h-screen bg-[#0B0F19] text-white relative flex flex-col font-sans overflow-x-hidden overflow-y-auto cursor-none"
      style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '48px 48px' }}
    >
      {/* Decorative Starry Background & Floating Blobs */}
      {/* <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '48px 48px' }}></div> */}
      <div className="absolute top-[15%] left-[30%] w-16 h-12 bg-white rounded-[40%_60%_70%_30%] opacity-90 blur-[1px] rotate-12 shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>

      {/* Hero Wrapper max out at 100vh for scroll effect */}
      <HeroSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Custom Framer Motion Mouse Cursors */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white/80 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ x: cursorXRaw, y: cursorYRaw }}
      />
    </motion.div>
  );
}
