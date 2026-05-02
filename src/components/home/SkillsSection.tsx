"use client";

import React from "react";
import { motion } from "motion/react";
import { TechBadge, TechItem } from "../others/techBadge";
import dynamic from "next/dynamic";
import Keyboard3d from "../others/keyboard";

const Skills3D = dynamic(() => import("./Skills3D"), { ssr: false });

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
        stiffness: 100,
      },
    },
  };

  return (
    <section
      className="w-full max-w-[1400px] mx-auto px-6 py-32 pb-0 z-10 relative overflow-hidde"
      id="skills"
    >
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
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
        >
          Tech Skills
        </motion.h2>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 font-medium text-lg md:text-2xl max-w-2xl mx-auto"
        >
          Crafting digital excellence with a modern technological arsenal and
          deep expertise across the stack.
        </motion.p>
      </div>

      <div className="grid grid-cols-1gap-10 relative z-20">
        {/* Frontend Category */}
        {/* <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2"
          style={{ transform: "translateZ(50px)" }}
        >
          Tech Stack
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium tracking-widest text-xs sm:text-sm mb-6 sm:mb-12">
          (hint: hover a key)
        </p> */}

        {/* Main Keyboard Base (Wrapper for scrolling on mobile) */}
        <Keyboard3d />
      </div>

      {/* Foreground light blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>
    </section>
  );
}
