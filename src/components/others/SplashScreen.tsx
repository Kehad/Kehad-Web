"use client";
import { useEffect, useState, useRef, Suspense, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Float, Stars, Sparkles, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

// --- Decorative Components ---

function DecorativeBlobs() {
  const meshRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t + i) * 0.002;
      child.rotation.z += 0.01;
    });
  });

  return (
    <group ref={meshRef}>
      {/* Random colorful blobs around the text */}
      {[...Array(15)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 2
          ]}
        >
          <sphereGeometry args={[Math.random() * 0.15, 16, 16]} />
          <meshStandardMaterial 
            color={["#ff0080", "#ff8c00", "#ffea00", "#00ffcc", "#9d00ff"][i % 5]} 
            emissive={["#ff0080", "#ff8c00", "#ffea00", "#00ffcc", "#9d00ff"][i % 5]}
            emissiveIntensity={0.5}
            roughness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Kehad3D({ isPlaying }: { isPlaying: boolean }) {
  const text = "Kehad";
  const groupRef = useRef<THREE.Group>(null!);
  const [analyzer, setAnalyzer] = useState<THREE.AudioAnalyser | null>(null);
  const fontUrl = "/fonts/helvetiker_bold.typeface.json";

  useEffect(() => {
    if (isPlaying) {
      const listener = new THREE.AudioListener();
      const sound = new THREE.Audio(listener);
      const audioLoader = new THREE.AudioLoader();
      
      audioLoader.load("/dance-beat.mp3", (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.4);
        try {
            sound.play();
        } catch (e) {
            console.log("Audio play blocked", e);
        }
      });

      const analyser = new THREE.AudioAnalyser(sound, 32);
      setAnalyzer(analyser);

      return () => {
        sound.stop();
        sound.disconnect();
      };
    }
  }, [isPlaying]);

  useFrame((state) => {
    let peak = 0;
    if (analyzer) {
      peak = analyzer.getAverageFrequency() / 120; 
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((child: any, i) => {
        const s = 1 + peak * (0.3 + i * 0.05);
        child.scale.set(s, s, s);
        child.rotation.y = Math.sin(state.clock.elapsedTime + i) * 0.1;
      });
    }
  });

  // Layered effect materials
  const layers = useMemo(() => [
    { height: 0.4, color: "#ff0080", emissive: "#4a00e0", shift: [0, 0, -0.4], bevel: 0.1 }, // Back shadow
    { height: 0.3, color: "#9d00ff", emissive: "#000000", shift: [0, 0, -0.2], bevel: 0.08 }, // Purple layer
    { height: 0.2, color: "#00ffcc", emissive: "#000000", shift: [0, 0, -0.1], bevel: 0.06 }, // Cyan layer
    { height: 0.1, color: "#ffea00", emissive: "#ff8c00", shift: [0, 0, 0], bevel: 0.05 }    // Top Yellow/Pink
  ], []);

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Center>
          {layers.map((layer, idx) => (
            <Text3D
              key={idx}
              font={fontUrl}
              size={1.5}
              height={layer.height}
              curveSegments={24}
              bevelEnabled
              bevelThickness={layer.bevel}
              bevelSize={layer.bevel}
              bevelOffset={0}
              bevelSegments={10}
              position={layer.shift as any}
            >
              {text}
              <meshPhysicalMaterial 
                color={layer.color}
                emissive={layer.emissive as any}
                emissiveIntensity={0.2}
                roughness={0.1}
                metalness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </Text3D>
          ))}
        </Center>
      </Float>
      <DecorativeBlobs />
      <Sparkles count={50} scale={10} size={2} speed={0.5} color="#ffffff" />
    </group>
  );
}

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 4000; 
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            onComplete?.();
          }, 1000);
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
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          className="fixed inset-0 z-[110] bg-[#050505] flex flex-col items-center justify-center text-center p-6"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-10"
          >
            <div className="flex flex-col items-center gap-4">
               <motion.h2 
                 initial={{ letterSpacing: "0.1em" }}
                 animate={{ letterSpacing: "0.4em" }}
                 className="text-emerald-500 font-mono text-sm uppercase"
               >
                 Ready for the journey?
               </motion.h2>
               <p className="text-white/40 text-xs md:text-sm max-w-xs leading-relaxed font-light">
                 Experience high-fidelity 3D visuals and immersive spatial audio.
               </p>
            </div>

            <button 
              onClick={() => setHasStarted(true)}
              className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-emerald-500/20"
            >
              <span className="relative z-10">Enter Portfolio</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Gradient Blurs */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-pink-500/10 rounded-full blur-[100px] animate-pulse" />
             <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
          </div>

          {/* Canvas for 3D Text */}
          <div className="absolute inset-0 z-0">
            <Canvas dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
              <pointLight position={[-10, 5, 5]} intensity={1} color="#ff0080" />
              <pointLight position={[0, -5, 5]} intensity={1} color="#00ffcc" />
              <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} castShadow />
              
              <Suspense fallback={null}>
                <Kehad3D isPlaying={true} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>

          {/* UI Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full py-20 px-6 text-center w-full">
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/60 text-sm md:text-base font-medium tracking-[0.3em] uppercase"
            >
              Building the Future—One Pixel at a Time
            </motion.p>

            <div className="flex flex-col items-center gap-8 w-full max-w-sm mb-10">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-6xl font-black tracking-tighter italic">
                    {Math.floor(progress)}
                  </span>
                  <span className="text-emerald-500 text-xl font-bold">%</span>
                </div>
                <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-400" 
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-20 bg-white/30 blur-md"
                    animate={{ left: ["-20%", "120%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/30">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                Synchronizing Assets
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}