"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Environment } from "@react-three/drei";
import * as THREE from "three";

function FixedMetallicText() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="https://unpkg.com/three@0.77.0/examples/fonts/optimer_regular.typeface.json"
          size={0.6}
          height={0.1}          // Extremely thick extrusion like reference
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.06}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={3}
        >
          KEHAD
          {/* Material [0]: Front and back faces -> Neon Emerald Glow */}
          <meshBasicMaterial attach="material-0" color="#5ca389ff" />
          {/* Material [1]: Bevel and Side Extrusion -> Liquid Chrome */}
          <meshStandardMaterial attach="material-1" color="#ffffff" metalness={1} roughness={0.15} />
        </Text3D>
      </Center>
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
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050508] to-[#040405]">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
              <Environment preset="city" /> {/* Needed for hyper-realistic chrome reflections */}
              <Suspense fallback={null}>
                <FixedMetallicText />
              </Suspense>
            </Canvas>
          </div>

          {/* UI Overlay Content */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full py-16 px-6 text-center w-full max-w-4xl">
            
            {/* Top: Welcome Message */}
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/60 text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase"
            >
              Passion meets creativity — explore where your journey begins
            </motion.p>

            {/* Bottom: HUD Progress Frame */}
            <div className="flex flex-col items-center gap-4 w-full max-w-lg mb-4">
              
              {/* Sci-Fi Container */}
              <div className="w-full relative border border-white/10 bg-black/40 rounded-lg p-6 shadow-2xl backdrop-blur-md overflow-hidden
                before:absolute before:inset-0 before:border-2 before:border-[#2EE19B]/20 before:rounded-lg before:pointer-events-none
                after:absolute after:top-0 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-[#2EE19B]/50 after:to-transparent"
              >
                {/* HUD Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
                
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[#2EE19B] font-mono text-[11px] md:text-sm tracking-[0.3em] font-medium uppercase drop-shadow-[0_0_8px_rgba(46,225,155,0.6)]">
                    Initializing Portfolio
                  </span>
                  <div className="text-white text-5xl md:text-6xl font-bold tracking-tighter tabular-nums drop-shadow-md">
                    {Math.floor(progress)}%
                  </div>

                  {/* Thick Glowing Progress Bar */}
                  <div className="w-full h-3 md:h-4 bg-gray-900 rounded-full mt-3 overflow-hidden relative shadow-inner border border-white/5">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-[#2EE19B] rounded-full shadow-[0_0_15px_#2EE19B]" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-white/40 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mt-2">
                Audio Sync Active
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}