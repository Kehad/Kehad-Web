"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// --- Audio Analyzer Logic ---
function DancingText3D({ isPlaying }: { isPlaying: boolean }) {
  const letters = "KEHAD".split("");
  const groupRef = useRef<THREE.Group>(null!);
  const [analyzer, setAnalyzer] = useState<THREE.AudioAnalyser | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const listener = new THREE.AudioListener();
      const sound = new THREE.Audio(listener);
      const audioLoader = new THREE.AudioLoader();
      
      // Attempt to load and play audio in the background
      audioLoader.load("/dance-beat.mp3", (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
        sound.play();
      });
      console.log('playing')

      const analyser = new THREE.AudioAnalyser(sound, 32);
      setAnalyzer(analyser);

      return () => {
        sound.stop();
        sound.disconnect();
      };
    }
  }, [isPlaying]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    let peak = 0;
    if (analyzer) {
      peak = analyzer.getAverageFrequency() / 60; 
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((child: any, i: number) => {
        child.position.y = Math.sin(t * 8 + i * 0.6) * (0.15 + peak);
        child.position.x = (i - 2) * 1.1 + Math.cos(t * 10 + i) * (peak * 0.4);
        const s = 1 + peak * 0.6;
        child.scale.set(s, s, s);
        child.rotation.z = Math.sin(t * 6 + i) * peak;
      });
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {letters.map((char, i) => (
        <Text
          key={i}
          position={[(i - 2) * 1.1, 0, 0]}
          fontSize={1.4}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          {char}
        </Text>
      ))}
    </group>
  );
}

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 5000; // Total loading time
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            onComplete?.();
          }, 800);
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [hasStarted, onComplete]);

  return (
    <AnimatePresence>
      {!hasStarted && (
        <motion.div
          key="start-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-[#050505] flex flex-col items-center justify-center text-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col items-center gap-4">
               <h2 className="text-emerald-500 font-mono text-sm tracking-[0.4em] uppercase">Ready for the journey?</h2>
               <p className="text-white/40 text-xs md:text-sm max-w-xs leading-relaxed">
                 For the full immersive experience, please enable audio feedback.
               </p>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              className="group relative px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              Enter Portfolio
            </button>
          </motion.div>
        </motion.div>
      )}

      {hasStarted && loading && (
        <motion.div
          key="unified-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background 3D Animation */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={2} />
              <Suspense fallback={null}>
                <DancingText3D isPlaying={true} />
              </Suspense>
            </Canvas>
          </div>

          {/* UI Overlay Content */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full py-20 px-6 text-center max-w-2xl">
            
            {/* Top: Welcome Message */}
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/80 text-lg md:text-xl font-light tracking-[0.2em] uppercase leading-relaxed"
            >
              Passion meets creativity—explore where your journey begins.
            </motion.p>

            {/* Bottom: Progress Indication */}
            <div className="flex flex-col items-center gap-6 w-full mb-10">
              <div className="flex flex-col items-center gap-2">
                <span className="text-emerald-500 font-mono text-sm tracking-[0.5em] uppercase">
                  Initializing Portfolio
                </span>
                <div className="text-white text-5xl font-black tracking-tighter">
                  {Math.floor(progress)}%
                </div>
              </div>

              {/* Minimalist Progress Bar */}
              <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <div className="text-white/30 text-[10px] uppercase tracking-[0.3em] animate-pulse">
                Audio Sync Active
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}