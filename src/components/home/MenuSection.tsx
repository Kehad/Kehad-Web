"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cv from '@/assets/Kehinde-Adigun-Resume.jpg'; 

interface MenuSectionProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function MenuSection({ isMenuOpen, setIsMenuOpen }: MenuSectionProps) {

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] bg-white/95 dark:bg-[#0c101a]/95 backdrop-blur-3xl flex flex-col justify-center items-center"
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-3 rounded-2xl bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-all hover:scale-105 cursor-pointer z-50 pointer-events-auto shadow-sm"
            aria-label="Close menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
             <div className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Kehad</div>
          </div>

          <nav className="flex flex-col items-center gap-10 md:gap-14 text-center pointer-events-auto">
            {['Experience', 'Projects', 'Contact'].map((item, index) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 hover:from-blue-600 hover:to-blue-400 dark:hover:from-blue-400 dark:hover:to-blue-600 transition-all duration-500 transform hover:scale-105 hover:tracking-wide w-full"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href={cv.src}
              download="Kehinde Gabriel Adigun CV.jpg"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 3 * 0.1, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 hover:from-blue-600 hover:to-blue-400 dark:hover:from-blue-400 dark:hover:to-blue-600 transition-all duration-500 transform hover:scale-105 hover:tracking-wide w-full"
            >
              Resume
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
