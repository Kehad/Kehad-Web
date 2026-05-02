"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";


export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const accentColor = "#3b82f6"; // Blue 500
  const glowColor = "rgba(59, 130, 246, 0.6)";
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt to play audio on mount
    if (audioRef.current && progress >= 0) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = false;
      audioRef.current.play().catch(err => console.log("Autoplay blocked by browser:", err));
    }

    const duration = 400; // total duration in ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 500); // hold at 100% briefly
          return 100;
        }
        // Random increment for realistic loading feel
        const increment = Math.floor(Math.random() * 8) + 1;
        return Math.min(prev + increment, 100);
      });
    }, duration / 25);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {loading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden font-sans text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-500 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.06)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)]"
          style={{ backgroundSize: '48px 48px' }}
        >
          {/* Main Dashboard Container - Fullscreen */}
          <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between p-6 lg:p-16 overflow-hidden">
            
            {/* Subtle background noise/texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

            {/* LEFT PANEL: Live Portfolio Feed */}
            <div className="hidden lg:flex flex-col w-[300px] h-full justify-center gap-4 z-10">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 font-medium">Live Portfolio Feed</div>
              <div className="flex-1 bg-white/50 dark:bg-[#151a23]/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-[#2a3441] p-5 flex flex-col gap-4 overflow-hidden relative shadow-inner">
                {/* Wireframe Mockups sliding up */}
                <motion.div 
                  animate={{ y: [0, -300] }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="flex flex-col gap-5"
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-full h-48 bg-gray-100 dark:bg-[#1f2633] rounded-xl border border-gray-200 dark:border-[#374151] p-4 flex flex-col gap-3 shadow-md">
                      {/* Wireframe header */}
                      <div className="flex items-center justify-between">
                        <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-[#374151]"></div>
                        <div className="w-16 h-3 rounded-full bg-gray-300 dark:bg-[#374151]"></div>
                      </div>
                      {/* Wireframe image placeholder */}
                      <div className="w-full h-20 bg-gray-200 dark:bg-[#2c3546] rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 border border-gray-300 dark:border-[#475569] m-1 rounded-md"></div>
                        <svg className="absolute inset-0 w-full h-full text-gray-400 dark:text-[#475569] opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                      {/* Wireframe text lines */}
                      <div className="w-full h-2.5 bg-gray-300 dark:bg-[#374151] rounded-full mt-1"></div>
                      <div className="w-3/4 h-2.5 bg-gray-300 dark:bg-[#374151] rounded-full"></div>
                      <div className="w-1/2 h-2.5 bg-gray-300 dark:bg-[#374151] rounded-full"></div>
                    </div>
                  ))}
                </motion.div>
                {/* Fade gradient overlays */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white dark:from-[#151a23] to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#151a23] to-transparent z-10"></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 dark:text-[#888] tracking-widest mt-2 uppercase font-semibold">
                <span>Framework: Next.js</span>
                <span>Assets: 125+</span>
              </div>
            </div>

            {/* CENTER PANEL: Main Animation & Progress */}
            <div className="flex-1 flex flex-col items-center justify-center gap-12 px-8 z-10 w-full mt-10 lg:mt-0">
              
              {/* Top Text */}
              <div className="text-center flex flex-col items-center gap-3">
                <div className="text-xs md:text-sm tracking-[0.3em] text-gray-500 dark:text-[#888] uppercase">Project Lifecycle:</div>
                <div className="text-lg md:text-2xl tracking-[0.2em] font-light uppercase flex flex-wrap justify-center gap-2 md:gap-4 items-center" style={{ color: accentColor }}>
                  <span className="opacity-40">Idea</span> <span className="text-gray-400 dark:text-[#555] text-sm">→</span>
                  <span className="opacity-60">Create</span> <span className="text-gray-400 dark:text-[#555] text-sm">→</span>
                  <span className="opacity-80">Test</span> <span className="text-gray-400 dark:text-[#555] text-sm">→</span>
                  <span className="font-semibold" style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}>Deploy</span>
                </div>
              </div>

              {/* Central 3D Glowing Shape */}
              <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] flex items-center justify-center">
                {/* Core Glow */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute inset-0 blur-[80px] rounded-full"
                  style={{ backgroundColor: accentColor }}
                ></motion.div>
                
                {/* Animated SVG Rings */}
                <motion.svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute z-10">
                  {/* Orbit 1 */}
                  <motion.g 
                    animate={{ rotateZ: 360, rotateX: 60 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    style={{ transformOrigin: "150px 150px" }}
                  >
                    <ellipse cx="150" cy="150" rx="130" ry="50" fill="none" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.7" />
                    <circle cx="280" cy="150" r="4" fill={accentColor} style={{ filter: `drop-shadow(0 0 5px ${accentColor})` }} />
                  </motion.g>
                  {/* Orbit 2 */}
                  <motion.g 
                    animate={{ rotateZ: -360, rotateY: 70 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    style={{ transformOrigin: "150px 150px" }}
                  >
                    <ellipse cx="150" cy="150" rx="140" ry="40" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="6 6" />
                    <circle cx="10" cy="150" r="3" fill={accentColor} />
                  </motion.g>
                  {/* Orbit 3 */}
                  <motion.g 
                    animate={{ rotateZ: 360, rotateX: 40, rotateY: 45 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    style={{ transformOrigin: "150px 150px" }}
                  >
                    <ellipse cx="150" cy="150" rx="120" ry="120" fill="none" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" />
                    <circle cx="150" cy="30" r="5" fill={accentColor} />
                    <circle cx="150" cy="270" r="2" fill={accentColor} />
                  </motion.g>
                </motion.svg>

                {/* Center Geometric Core */}
                <motion.svg width="120" height="120" viewBox="0 0 100 100" className="relative z-20"
                  style={{ filter: `drop-shadow(0 0 12px ${glowColor})` }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                >
                  <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke={accentColor} strokeWidth="2" strokeLinejoin="round" />
                  <polygon points="50,5 50,95" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.6" />
                  <polygon points="5,25 95,75" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.6" />
                  <polygon points="5,75 95,25" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.6" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="6" fill={'#0B0F19'} stroke={accentColor} strokeWidth="2" />
                </motion.svg>
              </div>

              {/* Progress Text */}
              <div className="text-center flex flex-col items-center gap-2 w-full">
                <div className="flex items-baseline justify-center gap-3 text-xl md:text-3xl tracking-[0.1em] uppercase w-full">
                  <span className="text-gray-500 dark:text-[#aaa] font-light">Project Profile...</span>
                  <motion.span 
                    className="font-bold"
                    style={{ color: accentColor }}
                    animate={progress === 100 ? { scale: [1, 1.1, 1], filter: [`drop-shadow(0px 0px 0px ${accentColor})`, `drop-shadow(0px 0px 15px ${accentColor})`, `drop-shadow(0px 0px 0px ${accentColor})`] } : {}}
                    transition={{ duration: 1 }}
                  >
                    {progress}%
                  </motion.span>
                </div>
                <div className="text-2xl md:text-6xl font-bold tracking-[0.15em] uppercase mt-1"
                     style={{ color: accentColor, filter: `drop-shadow(0 0 10px ${glowColor})` }}>
                  {progress == 100 ? "Kehad is here" : "Kehad is Loading..."}
                </div>
                
                <div className="mt-8 flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-500 dark:text-[#777] font-semibold">
                  <div>Project: Advanced Platform</div>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-gray-400 dark:bg-[#555]"></div>
                  <div>Platform: Web / Mobile</div>
                </div>
              </div>
            </div>

            {/* Bottom Center Logo & Audio */}
            <div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity z-10 cursor-pointer"
              onClick={() => {
                if (audioRef.current) {
                  if (audioRef.current.paused) {
                    audioRef.current.play();
                  } else {
                    audioRef.current.pause();
                  }
                }
              }}
              title="Click to toggle audio"
            >
              <audio ref={audioRef} src="/dance-beat.mp3" loop />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: accentColor }}>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <div className="text-[9px] tracking-[0.4em] uppercase text-gray-500 dark:text-[#888] font-bold">Portfolio Crafted</div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}