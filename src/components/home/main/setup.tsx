import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  RoundedBox, 
  Cylinder, 
  ContactShadows, 
  Text, 
  Float, 
  Environment, 
  Sphere, 
  Torus
} from '@react-three/drei';
import * as THREE from 'three';

const Colors = {
  floor: "#fbcfe8",        // Soft Pink
  floorSide: "#f472b6",    // Hot Pink
  wallLeft: "#ffffff",     // White
  wallRight: "#f472b6",    // Pink Wall
  arcadeBody: "#f43f5e",   // Rose/Pink Arcade
  arcadeAccent: "#ffffff", // White stripe
  arcadeScreen: "#1e1b4b", // Deep Purple
  desk: "#ffffff",         // White
  chair: "#fb923c",        // Orange
  rug: "#2dd4bf",         // Teal
  cactus: "#2dd4bf",      // Teal
  skateboard: "#8b5cf6",  // Purple
  skateboardWheel: "#fb923c",
  headset: "#fb923c",
  dog: "#1e293b",         // Slate
  dogBed: "#2dd4bf",
};

// --- Sub-Components ---

const RoomArchitecture = () => (
  <group>
    {/* Floor Platform */}
    <RoundedBox args={[10, 0.8, 10]} radius={0.15} smoothness={4} position={[0, -0.4, 0]}>
      <meshStandardMaterial color={Colors.floor} metalness={0.1} roughness={0.5} />
    </RoundedBox>
    
    <RoundedBox args={[10.3, 0.4, 10.3]} radius={0.1} smoothness={4} position={[0, -0.65, 0]}>
      <meshStandardMaterial color={Colors.floorSide} metalness={0.1} roughness={0.4} />
    </RoundedBox>

    <group position={[-4.8, 3.8, 0]}>
      <RoundedBox args={[0.4, 0.8, 10]} radius={0.05} position={[0, 3.6, 0]}>
        <meshStandardMaterial color={Colors.wallLeft} />
      </RoundedBox>
      <RoundedBox args={[0.4, 8, 0.8]} radius={0.05} position={[0, 0, 4.6]}>
        <meshStandardMaterial color={Colors.wallLeft} />
      </RoundedBox>
      <RoundedBox args={[0.4, 8, 0.8]} radius={0.05} position={[0, 0, -4.6]}>
        <meshStandardMaterial color={Colors.wallLeft} />
      </RoundedBox>
      <RoundedBox args={[0.4, 8, 0.5]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color={Colors.wallLeft} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.1, 9]} radius={0.02} position={[0.6, -1.3, 0]}>
        <meshStandardMaterial color={Colors.wallLeft} />
      </RoundedBox>
    </group>

    <group position={[0, 3.8, -4.8]}>
      <RoundedBox args={[10, 8, 0.4]} radius={0.05}>
        <meshStandardMaterial color={Colors.wallRight} metalness={0.1} roughness={0.6} />
      </RoundedBox>
      <Text
        position={[1.5, 2.5, 0.3]}
        fontSize={1.2}
        color="white"
        anchorX="right"
        anchorY="middle"
      >
        Hi, I'm
      </Text>
      <Text
        position={[1.5, 1.2, 0.3]}
        fontSize={2}
        color="white"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        Kehad
      </Text>
    </group>

    <RoundedBox args={[8.5, 0.06, 7.5]} radius={0.05} position={[0.2, 0.03, 0.2]}>
      <meshStandardMaterial color={Colors.rug} roughness={0.8} />
    </RoundedBox>
  </group>
);

const ArcadeMachine = () => (
  <group position={[-3.6, 0, 1]} rotation={[0, Math.PI / 2, 0]}>
    <RoundedBox args={[3.2, 4.4, 2]} radius={0.1} position={[0, 2.2, 0]}>
      <meshStandardMaterial color={Colors.arcadeBody} />
    </RoundedBox>
    <group position={[0, 3.2, 0.8]}>
      <RoundedBox args={[2.2, 1.6, 0.5]} radius={0.05}>
         <meshStandardMaterial color="#000000" />
      </RoundedBox>
      <RoundedBox args={[2.1, 1.5, 0.1]} position={[0, 0, 0.25]}>
         <meshStandardMaterial color={Colors.arcadeScreen} emissive={Colors.arcadeScreen} emissiveIntensity={0.5} />
      </RoundedBox>
    </group>
    <RoundedBox args={[0.4, 4.41, 2.1]} radius={0.05} position={[0, 2.2, 0]}>
       <meshStandardMaterial color={Colors.arcadeAccent} />
    </RoundedBox>
    <group position={[0, 2.3, 1.1]} rotation={[Math.PI / 8, 0, 0]}>
       <RoundedBox args={[2.4, 0.4, 0.6]} radius={0.05}>
          <meshStandardMaterial color={Colors.arcadeBody} />
       </RoundedBox>
       <Cylinder args={[0.04, 0.04, 0.4]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#ffffff" />
       </Cylinder>
       <Sphere args={[0.12]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#fb923c" />
       </Sphere>
       {[-0.6, -0.3, 0.3, 0.6].map((x, i) => (
          <Cylinder key={i} args={[0.1, 0.1, 0.05]} position={[x, 0.2, 0.1]}>
             <meshStandardMaterial color={i % 2 === 0 ? "#fb923c" : "#ffffff"} />
          </Cylinder>
       ))}
    </group>
  </group>
);

const DeskSetup = () => (
  <group position={[1.5, 0, -2.2]}>
    <RoundedBox args={[4.8, 0.15, 2.2]} radius={0.05} position={[0, 1.8, 0]}>
      <meshStandardMaterial color={Colors.desk} />
    </RoundedBox>
    {[-2.1, 2.1].map(x => [-0.8, 0.8].map(z => (
      <Cylinder key={`${x}-${z}`} args={[0.06, 0.06, 1.8]} position={[x, 0.9, z]}>
        <meshStandardMaterial color={Colors.desk} />
      </Cylinder>
    )))}
    <group position={[0, 1.9, -0.3]}>
      <RoundedBox args={[1.8, 1.1, 0.15]} radius={0.05} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#334155" />
      </RoundedBox>
      <Cylinder args={[0.05, 0.05, 0.8]} position={[0, 0.4, -0.1]}>
        <meshStandardMaterial color="#ffffff" />
      </Cylinder>
      <RoundedBox args={[0.8, 0.05, 0.6]} radius={0.02} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#ffffff" />
      </RoundedBox>
      <group position={[1.1, 1.1, 0.1]} rotation={[0, -0.2, 0.1]}>
         <Torus args={[0.4, 0.06, 16, 32, Math.PI]} rotation={[Math.PI, 0, 0]}>
            <meshStandardMaterial color={Colors.headset} />
         </Torus>
         <Sphere args={[0.15]} position={[0.4, -0.1, 0]}>
            <meshStandardMaterial color={Colors.headset} />
         </Sphere>
         <Sphere args={[0.15]} position={[-0.4, -0.1, 0]}>
            <meshStandardMaterial color={Colors.headset} />
         </Sphere>
      </group>
    </group>
    <RoundedBox args={[1.2, 0.05, 0.4]} radius={0.01} position={[0, 1.88, 0.4]}>
       <meshStandardMaterial color="#e2e8f0" />
    </RoundedBox>
    <Sphere args={[0.08]} position={[1, 1.88, 0.4]}>
       <meshStandardMaterial color="#e2e8f0" />
    </Sphere>
  </group>
);

const Chair = () => (
  <group position={[2.4, 0, 0.8]} rotation={[0, -Math.PI / 8, 0]}>
    <RoundedBox args={[1.4, 0.15, 1.4]} radius={0.1} position={[0, 1.3, 0]}>
      <meshStandardMaterial color={Colors.chair} />
    </RoundedBox>
    <group position={[0, 2.1, -0.6]}>
       {[0, 0.3, 0.6].map((y, i) => (
         <RoundedBox key={i} args={[1.4, 0.25, 0.2]} radius={0.05} position={[0, y, 0]}>
            <meshStandardMaterial color={Colors.chair} />
         </RoundedBox>
       ))}
    </group>
    <Cylinder args={[0.08, 0.08, 1.3]} position={[0, 0.65, 0]}>
      <meshStandardMaterial color="#ffffff" />
    </Cylinder>
    {[0, 1, 2, 3, 4].map(i => (
       <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <Cylinder args={[0.05, 0.05, 0.8]} position={[0, 0.1, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
             <meshStandardMaterial color="#ffffff" />
          </Cylinder>
          <Sphere args={[0.1]} position={[0, 0.05, 0.8]}>
             <meshStandardMaterial color="#ffffff" />
          </Sphere>
       </group>
    ))}
  </group>
);

const DecorativeProps = () => (
  <group>
    <group position={[1.4, 0, -4.1]}>
      <RoundedBox args={[0.7, 3.2, 0.7]} radius={0.3} position={[0, 1.6, 0]}>
        <meshStandardMaterial color={Colors.cactus} roughness={0.8} />
      </RoundedBox>
      <group position={[0.4, 2.2, 0]} rotation={[0, 0, Math.PI / 4]}>
         <RoundedBox args={[0.4, 1.4, 0.4]} radius={0.15}>
            <meshStandardMaterial color={Colors.cactus} />
         </RoundedBox>
         <RoundedBox args={[0.4, 1.2, 0.4]} radius={0.15} position={[0.3, 0.5, 0]} rotation={[0, 0, -Math.PI/2]}>
            <meshStandardMaterial color={Colors.cactus} />
         </RoundedBox>
      </group>
    </group>
    <group position={[0.5, 0.1, 2.8]} rotation={[0, 0.4, 0]}>
      <RoundedBox args={[2.2, 0.06, 0.7]} radius={0.03}>
        <meshStandardMaterial color={Colors.skateboard} />
      </RoundedBox>
      {[[-0.7, -0.3], [-0.7, 0.3], [0.7, -0.3], [0.7, 0.3]].map((pos, i) => (
        <Cylinder key={i} args={[0.14, 0.14, 0.18]} position={[pos[0], -0.1, pos[1]]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={Colors.skateboardWheel} />
        </Cylinder>
      ))}
    </group>
    <group position={[-1.2, 0, -2.2]} rotation={[0, -Math.PI / 3, 0]}>
      {[0, 1, 2].map(i => (
         <Cylinder key={i} args={[0.03, 0.03, 3]} position={[0, 1.5, 0]} rotation={[0.2, (i * Math.PI * 2) / 3, 0.2]}>
            <meshStandardMaterial color="#fb923c" />
         </Cylinder>
      ))}
      <RoundedBox args={[0.8, 0.8, 1.1]} radius={0.1} position={[0, 3, 0]}>
        <meshStandardMaterial color="white" />
      </RoundedBox>
      <Cylinder args={[0.3, 0.3, 0.1]} position={[0, 3, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1e293b" />
      </Cylinder>
      <Sphere args={[0.1]} position={[0, 3.5, 0]}>
         <meshStandardMaterial color="#fb923c" />
      </Sphere>
    </group>
  </group>
);

const FloatingElements = () => (
  <group>
    {/* Shelf Items */}
    <group position={[-4.1, 2.5, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <group position={[0, 0.6, -2.5]} rotation={[0.4, 0, 0.4]}>
           <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.02}>
              <meshStandardMaterial color="#2dd4bf" wireframe wireframeLinewidth={2} />
           </RoundedBox>
        </group>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.2}>
        <group position={[0, 0.8, -0.8]} rotation={[0.8, 0, 0]}>
           <Cylinder args={[0, 0.6, 1, 4]} rotation={[0, Math.PI / 4, 0]}>
              <meshStandardMaterial color="#4ade80" wireframe wireframeLinewidth={2} />
           </Cylinder>
        </group>
      </Float>
      <group position={[0, 0, 1.5]}>
         {[0, 0.35, 0.7].map(x => [0, 0.35, 0.7].map(y => [0, 0.35].map(z => (
            <Sphere key={`${x}-${y}-${z}`} args={[0.14]} position={[x - 0.35, y + 0.15, z - 0.15]}>
              <meshStandardMaterial 
                 color={["#f472b6", "#4ade80", "#fb923c", "#8b5cf6"][(Math.floor(x*10 + y*5 + z*2)) % 4]} 
                 roughness={0.3}
              />
            </Sphere>
         ))))}
      </group>
    </group>
  </group>
);

const DogInBed = () => (
  <group position={[4.1, 0, 2.5]} rotation={[0, -Math.PI / 4, 0]}>
    <Torus args={[0.8, 0.18, 16, 32]} position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color={Colors.dogBed} />
    </Torus>
    <Sphere args={[0.75, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 0, 0]} scale={[1, 0.3, 1]}>
       <meshStandardMaterial color="#134e4a" />
    </Sphere>
    <group position={[0, 0.55, 0]} rotation={[0, -Math.PI / 4, 0]}>
      <RoundedBox args={[0.55, 0.65, 0.85]} radius={0.25} position={[0, 0, 0]}>
         <meshStandardMaterial color={Colors.dog} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.5, 0.45]} radius={0.2} position={[0, 0.35, 0.35]}>
         <meshStandardMaterial color={Colors.dog} />
      </RoundedBox>
      <RoundedBox args={[0.13, 0.32, 0.05]} radius={0.05} position={[0.18, 0.7, 0.35]} rotation={[0, 0, -0.1]}>
         <meshStandardMaterial color={Colors.dog} />
      </RoundedBox>
      <RoundedBox args={[0.13, 0.32, 0.05]} radius={0.05} position={[-0.18, 0.7, 0.35]} rotation={[0, 0, 0.1]}>
         <meshStandardMaterial color={Colors.dog} />
      </RoundedBox>
      <RoundedBox args={[0.58, 0.1, 0.65]} radius={0.05} position={[0, 0.18, 0.3]}>
         <meshStandardMaterial color="#fb923c" />
      </RoundedBox>
    </group>
  </group>
);

export default function IsometricRoom() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full aspect-square lg:aspect-video xl:aspect-square 2xl:aspect-video flex flex-col items-center justify-center p-0 lg:p-4 animate-pulse">
        <div className="w-full h-full bg-[#0c0a1f] rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative border border-white/5" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-0">
      <div className="w-full flex-1 rounded-[3rem] overflow-hidden relative group">
        <Canvas 
          shadows 
          camera={{ position: [25, 20, 25], fov: 15 }} 
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          {/* <color attach="background" args={['']} /> */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 20, 10]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
          <pointLight position={[-15, 10, -10]} intensity={1} color="#8b5cf6" />
          <spotLight position={[0, 25, 0]} intensity={1.5} angle={0.6} penumbra={1} castShadow />
          
          <Suspense fallback={null}>
            <group rotation={[0, -Math.PI / 4, 0]} position={[0, -3.2, 0]}>
              <RoomArchitecture />
              <ArcadeMachine />
              <Chair />
              <DeskSetup />
              <DecorativeProps />
              <FloatingElements />
              <DogInBed />
              <ContactShadows 
                position={[0, 0, 0]} 
                opacity={0.6} 
                scale={15} 
                blur={2.5} 
                far={10} 
              />
            </group>
            <Environment preset="city" />
          </Suspense>

          <OrbitControls 
            enableZoom={true} 
            makeDefault 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2.2}
            minAzimuthAngle={-Math.PI / 2}
            maxAzimuthAngle={Math.PI / 2}
            enableDamping={true}
          />
        </Canvas>

        {/* Studio Info Label */}
        <div className="absolute bottom-8 left-8 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
          <div className="px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-white/60 text-[11px] font-bold tracking-[0.3em] uppercase transition-all">
              Kehad Studio
            </span>
          </div>
        </div>

        {/* LAT/LNG Coordinates */}
        <div className="absolute top-8 right-8 z-10 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
           <div className="text-white text-[10px] font-mono text-right">
              LAT: 6.5244° N<br/>
              LNG: 3.3792° E
           </div>
        </div>
      </div>

      {/* Navigation Controls (Reference: Arrows + Dots) */}
      <div className="mt-8 flex items-center gap-6">
         <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
         </button>
         
         <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 1 ? 'w-6 bg-indigo-500' : 'w-1.5 bg-white/20'}`} />
            ))}
         </div>

         <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
         </button>
      </div>
    </div>
  );
}