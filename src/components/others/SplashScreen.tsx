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
          className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col items-center justify-center pointer-events-none text-white font-sans gap-8 scale-150 sm:scale-100"
        >
          {/* Custom RGB/CMY Spinner */}
          <div className="relative w-32 h-32 flex items-center justify-center isolate">
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              {/* Red Ring */}
              <motion.div
                className="absolute inset-0 origin-center"
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`red-${i}`}
                    className="absolute left-1/2 top-1/2 w-5 h-5 rounded-full mix-blend-screen"
                    style={{
                      backgroundColor: "#ff0000",
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-44px)`,
                    }}
                  />
                ))}
              </motion.div>
              {/* Green Ring */}
              <motion.div
                className="absolute inset-0 origin-center"
                animate={{ rotate: [0, -10, 0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`green-${i}`}
                    className="absolute left-1/2 top-1/2 w-5 h-5 rounded-full mix-blend-screen"
                    style={{
                      backgroundColor: "#00ff00",
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-30px)`,
                    }}
                  />
                ))}
              </motion.div>
              {/* Blue Ring */}
              <motion.div
                className="absolute inset-0 origin-center"
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`blue-${i}`}
                    className="absolute left-1/2 top-1/2 w-5 h-5 rounded-full mix-blend-screen"
                    style={{
                      backgroundColor: "#0000ff",
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-16px)`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0">
            <div className="text-xl md:text-2xl font-medium opacity-90 tracking-widest uppercase">Loading</div>
            <div className="text-sm opacity-60 font-mono">{Math.max(0, Math.min(100, Math.floor(progress)))}% Complete</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
