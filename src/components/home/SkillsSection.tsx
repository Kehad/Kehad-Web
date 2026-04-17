"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TechBadge, TechItem } from '../others/techBadge';
import dynamic from 'next/dynamic';

const Skills3D = dynamic(() => import('./Skills3D'), { ssr: false });

const frontendSkills: TechItem[] = [
  { name: "React", icon: "react", color: "61DAFB" },
  { name: "Next.js", icon: "nextdotjs", color: "ffffff" },
  { name: "TypeScript", icon: "typescript", color: "3178C6" },
  { name: "JavaScript", icon: "javascript", color: "F7DF1E" },
  { name: "Tailwind CSS", icon: "tailwindcss", color: "06B6D4" },
  { name: "HTML5", icon: "html5", color: "E34F26" },
  { name: "CSS3", icon: "css3", color: "1572B6" },
  { name: "Framer Motion", icon: "framer", color: "0055FF" },
  { name: "Redux", icon: "redux", color: "764ABC" },
];

const backendSkills: TechItem[] = [
  { name: "Node.js", icon: "nodedotjs", color: "339933" },
  { name: "PHP", icon: "php", color: "777BB4" },
  { name: "Python", icon: "python", color: "3776AB" },
  { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
  { name: "MySQL", icon: "mysql", color: "4479A1" },
  { name: "MongoDB", icon: "mongodb", color: "47A248" },
  { name: "Firebase", icon: "firebase", color: "FFCA28" },
];

const toolsSkills: TechItem[] = [
  { name: "Git", icon: "git", color: "F05032" },
  { name: "GitHub", icon: "github", color: "ffffff" },
  { name: "Docker", icon: "docker", color: "2496ED" },
  { name: "Figma", icon: "figma", color: "F24E1E" },
  { name: "Postman", icon: "postman", color: "FF6C37" },
  { name: "Vercel", icon: "vercel", color: "ffffff" },
];

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-32 z-10 relative overflow-hidde" id="skills">
      {/* 3D Background */}
      <React.Suspense fallback={null}>
        <Skills3D />
      </React.Suspense>

      <div className="text-center mb-20 relative z-20">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
        >
          Expertise
        </motion.span>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[4rem] sm:text-[5rem] md:text-[7rem] font-black text-gray-900 dark:text-white tracking-tighter mb-4 leading-none"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        >
          Tech Skills
        </motion.h2>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 font-medium text-lg md:text-2xl max-w-2xl mx-auto"
        >
          Crafting digital excellence with a modern technological arsenal and deep expertise across the stack.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-20">
        {/* Frontend Category */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -10 }}
          className="group bg-white/70 dark:bg-[#0c101a]/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 hover:shadow-blue-500/10 hover:border-blue-500/30"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Frontend
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {frontendSkills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <TechBadge {...skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Backend Category */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -10 }}
          className="group bg-white/70 dark:bg-[#0c101a]/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 hover:shadow-emerald-500/10 hover:border-emerald-500/30"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Backend
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {backendSkills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <TechBadge {...skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools Category */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -10 }}
          className="group bg-white/70 dark:bg-[#0c101a]/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 hover:shadow-purple-500/10 hover:border-purple-500/30"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Tools
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {toolsSkills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <TechBadge {...skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Foreground light blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>
    </section>
  );
}
