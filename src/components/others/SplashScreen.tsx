"use client";
import { useEffect, useState } from "react";
import { Creepster } from "next/font/google"; // Using a highly stylized display font
import { AnimatePresence, motion } from "framer-motion";

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<"splash" | "loading" | "done">("splash");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Splash screen duration
    if (phase === "splash") {
      const timer = setTimeout(() => {
        setPhase("loading");
      }, 2500);
      return () => clearTimeout(timer);
    }
    
    // Phase 2: Loading screen duration
    if (phase === "loading") {
      const duration = 2500; // 2.5 seconds simulated load
      const intervalMs = 20;
      const step = 100 / (duration / intervalMs);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setPhase("done");
              onComplete?.();
            }, 500); // small delay at 100%
            return 100;
          }
          return prev + step;
        });
      }, intervalMs);
      
      return () => clearInterval(interval);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence mode="wait">
      {phase === "splash" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`${creepster.className} text-primary text-6xl sm:text-8xl md:text-9xl tracking-[0.2em] drop-shadow-[0_0_15px_rgba(7,197,20,0.4)] uppercase`}
          >
            KEHAD
          </motion.h1>
        </motion.div>
      )}

      {phase === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col items-center justify-center pointer-events-none text-white font-sans"
        >
          <div className="w-[85vw] md:w-[60vw] max-w-3xl flex flex-col gap-2">
            <div className="text-sm md:text-base font-medium opacity-90">Welcome...</div>
            
            <div className="relative h-8 md:h-10 bg-[#e5e5e5] w-full flex items-center overflow-hidden">
              {/* Green fill */}
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-75 ease-linear"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
              
              {/* Percentage text */}
              <div 
                className="absolute top-0 h-full flex items-center text-black text-sm md:text-base font-bold whitespace-nowrap"
                style={{ 
                  left: `calc(min(${progress}%, 100% - 48px))`,
                  paddingLeft: '8px'
                }}
              >
                {Math.max(0, Math.min(100, Math.floor(progress)))}%
              </div>
            </div>
            
            <div className="text-sm md:text-base font-medium opacity-90">Starting...</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
