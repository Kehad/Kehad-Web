"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt audio play
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
    }

    const duration = 3800; // total duration in ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete?.();
          }, 600);
          return 100;
        }
        return prev + 4;
      });
    }, duration / 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black text-white font-sans overflow-hidden select-none">
      <audio ref={audioRef} src="/dance-beat.mp3" />

      {/* Top Spacer for Vertical Balance */}
      <div className="h-16 md:h-24" />

      {/* CENTER CONTENT: Windows 7 Animated Logo & Starting Windows Text */}
      <div className="flex flex-col items-center justify-center gap-8 md:gap-12 z-10">
        
        {/* Windows 7 Animated Flag Logo */}
        <div className="relative w-36 h-36 md:w-48 md:h-48 flex items-center justify-center">
          
          {/* Radial Ambient Glow Behind Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 0.6, 0.4, 0.7, 0.5],
              scale: [0.8, 1.15, 1, 1.2, 1.05],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-red-500/20 via-green-500/20 to-blue-500/20 blur-3xl pointer-events-none"
          />

          {/* SVG Windows 7 4-Color Glowing Flag Orbs */}
          <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 grid grid-cols-2 gap-2.5 p-1">
            
            {/* Top-Left: Red Petal */}
            <motion.div
              initial={{ x: -20, y: -20, opacity: 0, scale: 0.5 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="relative group"
            >
              <div className="w-full h-full bg-gradient-to-br from-[#ff5252] via-[#e53935] to-[#c62828] rounded-tl-[1.8rem] rounded-tr-[0.4rem] rounded-bl-[0.4rem] rounded-br-[1.2rem] shadow-[0_0_25px_rgba(244,67,54,0.8)] border border-red-400/40 transform -rotate-3 hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-white/30 rounded-tl-[1.8rem] blur-[3px] opacity-70" />
            </motion.div>

            {/* Top-Right: Green Petal */}
            <motion.div
              initial={{ x: 20, y: -20, opacity: 0, scale: 0.5 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              className="relative group"
            >
              <div className="w-full h-full bg-gradient-to-bl from-[#76ff03] via-[#4caf50] to-[#2e7d32] rounded-tr-[1.8rem] rounded-tl-[0.4rem] rounded-br-[0.4rem] rounded-bl-[1.2rem] shadow-[0_0_25px_rgba(76,175,80,0.8)] border border-green-400/40 transform rotate-3 hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-white/30 rounded-tr-[1.8rem] blur-[3px] opacity-70" />
            </motion.div>

            {/* Bottom-Left: Blue Petal */}
            <motion.div
              initial={{ x: -20, y: 20, opacity: 0, scale: 0.5 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              className="relative group"
            >
              <div className="w-full h-full bg-gradient-to-tr from-[#00b0ff] via-[#2196f3] to-[#1565c0] rounded-bl-[1.8rem] rounded-br-[0.4rem] rounded-tl-[0.4rem] rounded-tr-[1.2rem] shadow-[0_0_25px_rgba(33,150,243,0.8)] border border-blue-400/40 transform rotate-3 hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-white/30 rounded-bl-[1.8rem] blur-[3px] opacity-70" />
            </motion.div>

            {/* Bottom-Right: Yellow Petal */}
            <motion.div
              initial={{ x: 20, y: 20, opacity: 0, scale: 0.5 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
              className="relative group"
            >
              <div className="w-full h-full bg-gradient-to-tl from-[#ffd600] via-[#ffb300] to-[#ff6f00] rounded-br-[1.8rem] rounded-bl-[0.4rem] rounded-tr-[0.4rem] rounded-tl-[1.2rem] shadow-[0_0_25px_rgba(255,179,0,0.8)] border border-amber-300/40 transform -rotate-3 hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-white/30 rounded-br-[1.8rem] blur-[3px] opacity-70" />
            </motion.div>

          </div>

          {/* Central Shimmer Light Streak */}
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div className="w-full h-1 bg-white/60 blur-md rounded-full shadow-[0_0_20px_white]" />
          </motion.div>

        </div>

        {/* "Starting Windows" Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-xl md:text-2xl font-normal text-gray-200 tracking-wide font-sans drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]">
            Starting Windows
          </div>
          
          {/* Subtle loading bar pulse */}
          <div className="w-32 h-[2px] bg-gray-900 rounded-full overflow-hidden mt-2">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </div>
        </motion.div>

      </div>

      {/* BOTTOM FOOTER COPYRIGHT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1 }}
        className="mb-8 text-xs text-gray-400 font-sans tracking-wide"
      >
        © Microsoft Corporation
      </motion.div>
    </div>
  );
}