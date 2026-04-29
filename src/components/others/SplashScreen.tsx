"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Amatic_SC } from "next/font/google";

const amatic = Amatic_SC({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  display: "swap" 
});

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const duration = 3500; // total duration in ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 400); // hold at 100% briefly
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {loading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-hidden bg-black" // Added bg-black to make the white SVG visible, adjust as needed for your theme
        >
          <div className="relative flex flex-col items-center gap-6">
            
            {/* New Ramen Bowl Animation */}
            <motion.svg 
              width="160" 
              height="160" 
              viewBox="0 0 512 512" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              // Slight container shake/wiggle animation
              animate={{ rotate: [0, -1, 1, -1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              {/* === Steam Lines === */}
              {/* We apply float-up animations to the steam groups */}
              
              {/* Left Steam */}
              <motion.g
                animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0 }}
              >
                <path d="M160 128c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" fill="white"/>
                <path d="M160 192c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" fill="white"/>
              </motion.g>

              {/* Middle Steam */}
              <motion.g
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.3 }}
              >
                <path d="M256 96c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" fill="white"/>
                <path d="M256 160c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" fill="white"/>
              </motion.g>

              {/* Right Steam */}
              <motion.g
                animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.6 }}
              >
                <path d="M352 128c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" fill="white"/>
                <path d="M352 192c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z" fill="white"/>
              </motion.g>

              {/* === Main Bowl and Noodles === */}
              {/* This part remains static relative to the steam */}
              <g transform="translate(0, 30)">
                {/* Chopsticks */}
                <path d="M486.3 118.8l-123 123c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l123-123c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" fill="white"/>
                <path d="M410.8 43.3l-123 123c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l123-123c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" fill="white"/>
                
                {/* Noodle Loops */}
                <path d="M128 224c-17.7 0-32 14.3-32 32v12.2C41.3 277.6 0 323.3 0 378.1 0 442.2 61.1 496 132.3 496h247.3C450.9 496 512 442.2 512 378.1c0-54.8-41.3-100.6-96-109.9V256c0-17.7-14.3-32-32-32H128zM384 288v64H128v-64h256z" fill="white"/>
              </g>
            </motion.svg>

            {/* Cooking Text */}
            <div className={`${amatic.className} text-white mt-2 uppercase font-bold text-3xl md:text-4xl tracking-[0.15em] text-center`}>
              Cooking Your Ramen... {progress}%
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}