"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { Creepster } from "next/font/google"; // Using a highly stylized display font
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

function AnimatedText3D() {
  const letters = "KEHAD".split("");
  const groupRef = useRef<any>(null);
  console.log('Letters')
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      
      // Gentle floating letter-by-letter bouncing motion
      groupRef.current.children.forEach((child: any, i: number) => {
        child.position.y = Math.sin(t * 3 + i * 0.5) * 0.15;
      });

      // Very slight 3D tilt for the entire word
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
      groupRef.current.rotation.x = Math.cos(t * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {letters.map((char, i) => (
        <Text 
          key={i}
          position={[(i - 2) * 1.0, 0, 0]} 
          fontSize={1.2} 
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
// Inside your SplashScreen return...
// Adjusted Canvas camera for better framing of smaller text

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
          className="fixed inset-0 z-[100] bg-transparent flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Phase 1: Custom 3D Animation Text */}
          <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={2} />
              <Suspense fallback={null}>
                <AnimatedText3D />
              </Suspense>
            </Canvas>
          </div>
        </motion.div>
      )}

      {phase === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-transparent flex flex-col items-center justify-center pointer-events-none text-white font-sans gap-12"
        >
          {/* Custom RGB/CMY Spinner - Made Bigger with Custom Scale Pulse Animation */}
          <motion.div 
            className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center isolate"
            animate={{ scale: [1, 1.15, 1] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
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
                    className="absolute left-1/2 top-1/2 w-8 h-8 rounded-full mix-blend-screen"
                    style={{
                      backgroundColor: "#ff0000",
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-80px)`,
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
                    className="absolute left-1/2 top-1/2 w-8 h-8 rounded-full mix-blend-screen"
                    style={{
                      backgroundColor: "#00ff00",
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-54px)`,
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
                    className="absolute left-1/2 top-1/2 w-8 h-8 rounded-full mix-blend-screen"
                    style={{
                      backgroundColor: "#0000ff",
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-28px)`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
          
          <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0">
            <div className="text-xl md:text-3xl font-medium opacity-90 tracking-widest uppercase">Loading</div>
            <div className="text-base opacity-60 font-mono">{Math.max(0, Math.min(100, Math.floor(progress)))}% Complete</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
