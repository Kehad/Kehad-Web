"use client";

import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import MenuSection from "@/components/home/MenuSection";

const Keyboard3d = React.lazy(() => import("@/components/others/keyboard"));

const gear = [
  {
    category: "Hardware",
    items: [
      { name: "MacBook Pro 16\"", desc: "M2 Max, 64GB RAM — Heavy lifting for 3D and compilation." },
      { name: "Keychron K2 / Custom Alice", desc: "Lubed tactile switches for the endless typing sessions." },
      { name: "Logitech MX Master 3", desc: "Ergonomic control, perfect for 3D modeling workflows." },
      { name: "LG 34\" Ultrawide", desc: "For having the terminal, code, and browser side-by-side." }
    ]
  },
  {
    category: "Software & Editor",
    items: [
      { name: "VS Code", desc: "Custom theme, excessive amount of extensions, VIM keybindings." },
      { name: "Warp Terminal", desc: "The AI terminal built for the 21st century." },
      { name: "Figma", desc: "Where all the UI magic begins before logic touches it." },
      { name: "Blender", desc: "For blocking out models and baking textures for WebGL." }
    ]
  },
  {
    category: "Tech Stack & Libraries",
    items: [
      { name: "Next.js (App Router)", desc: "My go-to framework for any scalable frontend architecture." },
      { name: "React Three Fiber", desc: "The ultimate wrapper bridging Three.js to React state." },
      { name: "Tailwind CSS", desc: "I haven't written standard CSS in years." },
      { name: "Framer Motion", desc: "The backbone of every smooth animation you see here." }
    ]
  }
];

export default function Uses() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white overflow-x-hidden font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-[#0B0F19]/80 backdrop-blur-md pointer-events-auto border-b border-white/5">
        <Link to="/" className="text-xl font-black tracking-tighter hover:text-orange-400 transition-colors">
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

      <main className="pt-32 pb-24 max-w-[1000px] mx-auto px-6 flex flex-col gap-16">
        
        {/* Header Strings */}
        <header className="flex flex-col gap-6 text-center sm:text-left">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-md"
          >
            My Gear (<span className="text-orange-500">Uses</span>)
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed"
          >
            A comprehensive list of all the hardware, software, and everyday tools I use to design, code, and survive as a developer.
          </motion.p>
        </header>

        {/* 3D Header - Interactive Keyboard Hook */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full h-[350px] md:h-[450px] relative rounded-3xl bg-gray-900 border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/40 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 text-white/50 backdrop-blur-sm">
            Drag to Interact
          </div>
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/30 text-sm tracking-widest uppercase">Initializing Canvas...</div>}>
            <Keyboard3d />
          </Suspense>
        </motion.div>

        {/* The List */}
        <div className="flex flex-col gap-16 mt-8">
          {gear.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-8"
            >
              <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
                <span className="w-8 h-[2px] bg-orange-500" />
                {section.category}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {section.items.map((item, i) => (
                  <div key={i} className="group flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-colors">
                    <h3 className="text-lg font-bold text-gray-100 group-hover:text-orange-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </main>

      <MenuSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
