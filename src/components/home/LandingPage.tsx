"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from '../others/CustomCursor';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="w-full h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-white relative flex flex-col font-sans overflow-x-hidden overflow-y-auto transition-colors duration-500 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.06)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)]"
      style={{ backgroundSize: '48px 48px' }}
    >
      <CustomCursor />
      
      {/* Decorative Starry Background & Floating Blobs */}
      <div className="absolute top-[15%] left-[30%] w-16 h-12 bg-white rounded-[40%_60%_70%_30%] opacity-90 blur-[1px] rotate-12 shadow-[0_0_20px_rgba(200,200,200,0.8)] dark:shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>


      {/* Hero Wrapper max out at 100vh for scroll effect */}
      <HeroSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

    </motion.div>
  );
}
