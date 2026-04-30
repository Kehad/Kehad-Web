"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Float, Text3D, Environment, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence, Variants } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MenuSection from "@/components/home/MenuSection";

// Placeholder Project Data
const projectsData: Record<string, any> = {
  "quidrop": {
    title: "Quidrop App",
    tagline: "High-performance dynamic data management",
    color: "#3b82f6", // blue
    tech: ["React Native", "TypeScript", "Next.js", "Tailwind"],
    overview: "Quidrop is a robust mobile application bridging seamless data APIs with an intuitive UX designed for maximum performance."
  },
  "lokatalent": {
    title: "Lokatalent",
    tagline: "Connecting service providers with users",
    color: "#f97316", // orange
    tech: ["React", "Next.js", "TypeScript", "Tailwind"],
    overview: "Built an interactive dashboard handling complex two-way booking channels and third-party integrations."
  },
  "cr8iviti": {
    title: "Cr8iviti",
    tagline: "Digital branding & custom websites",
    color: "#10b981", // emerald
    tech: ["HTML5", "CSS3", "JavaScript", "React"],
    overview: "Developed tailored web pages that enhanced navigation, branding, and conversion for varying client niches."
  }
};

function Project3DTitle({ title, color }: { title: string; color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        <Text3D
          font="https://unpkg.com/three@0.77.0/examples/fonts/optimer_bold.typeface.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.03}
        >
          {title}
          <meshBasicMaterial attach="material-0" color={color} />
          <meshStandardMaterial attach="material-1" color="#ffffff" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Center>
    </Float>
  );
}

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const project = projectsData[slug] || {
    title: slug ? slug.toUpperCase() : "Project",
    tagline: "An amazing digital experience",
    color: "#8b5cf6", // violet
    tech: ["React", "Next.js", "Three.js"],
    overview: "This project pushes the boundaries of web development, focusing on high-end performance and seamless visuals."
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (  
    <AnimatePresence mode="wait">
      <motion.div 
        key={slug}
        initial={{ opacity: 0, filter: "blur(15px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(15px)" }}
        transition={{ duration: 0.8, ease: "anticipate" }}
        className="min-h-screen bg-[#0B0F19] text-white overflow-x-hidden selection:bg-blue-500/30 flex flex-col"
      >
        
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-transparent backdrop-blur-sm pointer-events-auto border-b border-white/5"
        >
          <Link href="/" className="text-xl font-black tracking-tighter hover:text-gray-300 transition-colors">
            Kehad.
          </Link>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm font-semibold text-white cursor-pointer shadow-sm pointer-events-auto"
          >
             Menu
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </motion.nav>



        {/* Main Content */}
        <main className="relative z-20 w-full max-w-[1200px] mx-auto px-6 py-12 md:py-24 flex-1 flex flex-col gap-16">
          
          {/* Header Strings */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col gap-6 items-start"
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight drop-shadow-lg" style={{ color: project.color }}>
              {project.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-3xl font-light text-gray-300 max-w-3xl leading-relaxed">
              {project.tagline}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-4">
              {project.tech.map((t: string, i: number) => (
                <span key={i} className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white backdrop-blur-md shadow-sm">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.hr 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="border-white/10 transform origin-left" 
          />

          {/* Breakdown & Demo */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pb-20"
          >
            
            <motion.div variants={itemVariants} className="flex flex-col gap-8">
              <h2 className="text-2xl font-bold tracking-widest uppercase text-white/50">Overview</h2>
              <p className="text-lg text-gray-300 leading-loose">
                {project.overview}
              </p>
              <p className="text-lg text-gray-300 leading-loose">
                By combining robust frontend architecture with an obsessive attention to detail, we ensured a fluid and scalable application capable of handling high metric volumes without stuttering in performance.
              </p>
              
              <div className="mt-8 flex gap-6">
                <a href="#" className="px-8 py-4 rounded-xl bg-white text-gray-950 font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3 shadow-lg shadow-white/10">
                  Live Site
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
                <a href="#" className="px-8 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                  GitHub Repo
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-8 w-full">
               <h2 className="text-2xl font-bold tracking-widest uppercase text-white/50">Interactive Demo</h2>
               {/* Realistic Browser Window Wrapper */}
               <div className="w-full aspect-video rounded-xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
                  <div className="h-8 bg-gray-950 flex items-center px-4 gap-2 border-b border-gray-800">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 w-full bg-gray-800/50 flex items-center justify-center relative">
                    <span className="text-white/30 font-mono tracking-widest text-sm uppercase">Iframe Demo Embed</span>
                    {/* Actually embed a mock project or a generic background */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black" />
                  </div>
               </div>
            </motion.div>

          </motion.div>

        </main>

        <MenuSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </motion.div>
    </AnimatePresence>
  );
}
