"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Code, Cpu, Globe, Rocket, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import RotatingCube3d from '@/components/about/RotatingCube3d';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-500 font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Navigation */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-12"
        >
          <Link 
            to="/"
            className="group inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all font-semibold"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
            >
              Beyond the <br/><span className="text-blue-600">Pixels.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl"
            >
              I am Kehinde Adigun, a Full Stack Developer dedicated to crafting immersive digital experiences and robust back-end systems. My journey is fueled by a passion for clean code and futuristic designs.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
               <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">50+</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Projects</div>
                  </div>
               </div>
               <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center text-teal-600">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">4+</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Years Exp</div>
                  </div>
               </div>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <RotatingCube3d  />
            
            {/* Design accents */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse delay-1000"></div>
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="space-y-4 p-8 rounded-3xl bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800/50 backdrop-blur-xl">
            <Cpu className="w-8 h-8 text-blue-500" />
            <h3 className="text-2xl font-bold">Tech Philosophy</h3>
            <p className="text-gray-600 dark:text-gray-400">
              I believe in writing code that isn't just functional, but maintainable and elegant. Architecture first, syntax second.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-3xl bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800/50 backdrop-blur-xl">
            <Globe className="w-8 h-8 text-teal-500" />
            <h3 className="text-2xl font-bold">Global Reach</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Working with clients across different time zones has taught me the value of clear communication and asynchronous work.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-3xl bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800/50 backdrop-blur-xl">
            <Rocket className="w-8 h-8 text-purple-500" />
            <h3 className="text-2xl font-bold">Future Vision</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Constantly exploring emerging tech like Web3, AI integration, and performant 3D web graphics to stay ahead.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Subtle Noise Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      ></div>
    </div>
  );
}
