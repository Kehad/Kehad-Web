"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MenuSection from "@/components/home/MenuSection";

const articles = [
  {
    title: "Building a High-Performance 3D Portfolio in Next.js",
    date: "April 2024",
    readTime: "8 min read",
    tag: "TECHNICAL",
    description: "A deep dive into how I leveraged React Three Fiber, WebGL optimization, and modern Next.js 13 App Router architecture to craft this exact portfolio.",
    slug: "building-3d-portfolio-nextjs"
  },
  {
    title: "Mastering Framer Motion for Cinematic Interfaces",
    date: "March 2024",
    readTime: "5 min read",
    tag: "DESIGN",
    description: "Stop building static websites. Here is my practical guide on injecting life into your UI components using layout animations, scroll tracking, and spring physics.",
    slug: "mastering-framer-motion-interfaces"
  },
  {
    title: "The Subtle Art of Glassmorphism & Dark Mode",
    date: "February 2024",
    readTime: "6 min read",
    tag: "DESIGN",
    description: "How to properly combine backdrop-blur, semi-transparent borders, and deep color palettes to achieve an ultra-modern 'glass' aesthetic without sacrificing accessibility.",
    slug: "art-of-glassmorphism-darkmode"
  }
];

export default function BlogIndex() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white overflow-x-hidden font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-[#0B0F19]/80 backdrop-blur-md pointer-events-auto border-b border-white/5">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition-colors">
          Kehad.
        </Link>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center gap-2 px-3 sm:px-4 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm font-semibold text-white cursor-pointer shadow-sm pointer-events-auto"
        >
           Menu
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </nav>

      <main className="pt-40 pb-24 max-w-[900px] mx-auto px-6 flex flex-col gap-12">
        
        {/* Header */}
        <header className="flex flex-col gap-6 text-center sm:text-left mb-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white"
          >
            Terminal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Thoughts.</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed"
          >
            I occasionally write down my technical learnings, design philosophy, and thoughts on the evolution of frontend engineering.
          </motion.p>
        </header>

        {/* Feature Article */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full relative rounded-3xl bg-gray-900 border border-white/10 overflow-hidden shadow-2xl group hover:border-blue-500/50 transition-colors cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
          <div className="p-8 md:p-12 flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
              <span className="text-blue-400">Featured</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              <span className="text-gray-500">{articles[0].readTime}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-blue-300 transition-colors leading-tight">
              {articles[0].title}
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-medium">
              {articles[0].description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-400 tracking-wider">
              READ FULL POST &rarr;
            </div>
          </div>
        </motion.div>

        {/* Article List */}
        <div className="flex flex-col gap-4 mt-8">
          {articles.slice(1).map((article, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-colors cursor-pointer"
            >
              <div className="flex flex-row sm:flex-col justify-between sm:justify-start gap-2 sm:w-32 shrink-0">
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
                  {article.tag}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {article.date}
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </main>

      {/* Decorative background glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <MenuSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
