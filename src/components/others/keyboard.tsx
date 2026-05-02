import React, { useState } from 'react';

const keyboardGrid = [
  [
    { id: "js", label: "JS", icon: "javascript", color: "f7df1e" },
    { id: "ts", label: "TS", icon: "typescript", color: "3178c6" },
    { id: "html", label: "H5", icon: "html5", color: "e34f26" },
    { id: "css", label: "C3", icon: "css3", color: "1572b6" },
    { id: "react", label: "Re", icon: "react", color: "61dafb" },
    { id: "vue", label: "Vu", icon: "vuedotjs", color: "4fc08d" },
  ],
  [
    { id: "next", label: "Nx", icon: "nextdotjs", color: "ffffff" },
    { id: "tailwind", label: "Tw", icon: "tailwindcss", color: "06b6d4" },
    { id: "node", label: "No", icon: "nodedotjs", color: "339933" },
    { id: "express", label: "Ex", icon: "express", color: "ffffff" },
    { id: "graphql", label: "GQ", icon: "graphql", color: "e10098" },
    { id: "wp", label: "WP", icon: "wordpress", color: "21759b" },
  ],
  [
    { id: "git", label: "Git", icon: "git", color: "f05032" },
    { id: "github", label: "GH", icon: "github", color: "ffffff" },
    { id: "docker", label: "Dk", icon: "docker", color: "2496ed" },
    { id: "npm", label: "npm", icon: "npm", color: "cb3837" },
    { id: "aws", label: "AWS", icon: "amazonaws", color: "ff9900" },
    { id: "nginx", label: "Ngx", icon: "nginx", color: "009639" },
  ],
  [
    { id: "empty1", label: "", color: "111827", empty: true },
    { id: "linux", label: "Lx", icon: "linux", color: "fcc624" },
    { id: "space", label: "SPACE", color: "ffffff", colSpan: 2 },
    { id: "enter", label: "ENT", color: "ffffff", colSpan: 2, accent: true },
  ]
];

const Keyboard3d = () => {
  const [activeLabel, setActiveLabel] = useState("WELCOME");

  const playKeySound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Soft mechanical click sound profile
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      console.error("Failed to play key sound", e);
    }
  };

  return (
    <div className="w-full max-w-[100vw] overflow-x-auto overflow-y-visible pb-10 px-4 sm:px-10 flex flex-col items-center no-scrollbar">
      <style>{`
        .keyboard-board {
          transform: rotateX(55deg) rotateZ(-35deg) scale(0.8);
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -16px 24px 0 #050608, -24px 36px 50px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.1), inset 0 -2px 10px rgba(0,0,0,0.5), 0 0 80px rgba(14, 165, 233, 0.15);
        }
        @media (min-width: 640px) {
          .keyboard-board {
            transform: rotateX(55deg) rotateZ(-35deg) scale(0.9);
          }
        }
        @media (min-width: 1024px) {
          .keyboard-board {
            transform: rotateX(55deg) rotateZ(-35deg) scale(1);
          }
          .keyboard-board:hover {
            transform: rotateX(50deg) rotateZ(-30deg) scale(1.03);
          }
        }

        .keycap {
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--inner-shadow), -6px 8px 0 var(--shadow-color), -6px 8px 15px rgba(0,0,0,0.5);
          transform: translate(0px, 0px);
        }
        @media (hover: hover) {
          .keycap:hover {
            transform: translate(-2px, 3px);
            box-shadow: var(--inner-shadow), -4px 5px 0 var(--shadow-color), -4px 5px 10px rgba(0,0,0,0.5);
          }
        }
        .keycap:active {
          transform: translate(-6px, 8px) !important;
          box-shadow: var(--inner-shadow), 0px 0px 0 var(--shadow-color), 0px 0px 0px rgba(0,0,0,0) !important;
        }
      `}</style>

      <div className="keyboard-board origin-center bg-gradient-to-br from-[#1e2230] to-[#0c0d14] p-4 sm:p-6 md:p-8 rounded-3xl sm:rounded-[3rem] border border-gray-700/50 relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/5 before:to-transparent before:rounded-3xl sm:before:rounded-[3rem] min-w-max">
        
        {/* Screen / Display */}
        <div 
          className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-10 sm:h-16 bg-[#030408] border-[3px] border-gray-800 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(0,0,0,0.8)] flex items-center justify-center"
          style={{ transform: "translateZ(30px) rotateX(-10deg)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030408_70%)] opacity-70 z-10" />
          <div className="absolute inset-0 bg-[#0ea5e9]/5 animate-pulse" />
          <span 
            className="text-[#0ea5e9] font-mono text-sm sm:text-2xl font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_12px_rgba(14,165,233,0.9)] z-20"
          >
            {activeLabel || "READY"}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9]/30 to-transparent" />
        </div>

        {/* Inner Grid */}
        <div className="flex flex-col gap-3 sm:gap-5 relative z-10 w-full">
          {keyboardGrid.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-3 sm:gap-5 justify-center w-full">
              {row.map((k, kIdx) => (
                <div 
                  key={kIdx} 
                  className={`keycap relative flex items-center justify-center rounded-xl sm:rounded-[1.25rem] font-bold transition-all duration-200 cursor-pointer 
                  ${k.empty ? 'opacity-0 pointer-events-none' : ''}
                  ${k.accent ? 'bg-gradient-to-b from-[#e11d48] to-[#9f1239] text-white' : 'bg-gradient-to-b from-[#2a2e3d] to-[#1a1d27] text-gray-300'} 
                  ${k.colSpan === 2 ? 'w-[5rem] sm:w-[9.5rem] md:w-[11.5rem]' : 'w-9 sm:w-[4.25rem] md:w-[5.25rem]'}
                  h-9 sm:h-[4.25rem] md:h-[5.25rem]
                  group
                  `}
                  style={{ 
                    '--shadow-color': k.accent ? '#4c0519' : '#06070a',
                    '--inner-shadow': k.accent 
                      ? 'inset 0px 2px 2px rgba(255,255,255,0.4), inset 0px -4px 8px rgba(0,0,0,0.3)'
                      : 'inset 0px 2px 2px rgba(255,255,255,0.08), inset 0px -4px 8px rgba(0,0,0,0.6)'
                  } as React.CSSProperties}
                  onMouseEnter={() => {
                    if (k.label) setActiveLabel(k.id.toUpperCase());
                  }}
                  onMouseLeave={() => {
                    setActiveLabel("WELCOME");
                  }}
                  onClick={() => {
                    playKeySound();
                    const el = document.activeElement as HTMLElement;
                    if(el) el.blur();
                  }}
                >
                  {/* Subtle glow behind the key content */}
                  {!k.empty && (
                    <div 
                      className="absolute inset-0 rounded-xl sm:rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                      style={{ boxShadow: `0 0 20px #${k.color}30, inset 0 0 15px #${k.color}20` }} 
                    />
                  )}

                  {k.icon ? (
                    <img 
                      src={`https://cdn.simpleicons.org/${k.icon}/${k.color}`} 
                      alt={k.label} 
                      loading="lazy" 
                      className="w-4 h-4 sm:w-8 sm:h-8 md:w-9 md:h-9 pointer-events-none transition-all duration-300 group-hover:scale-110 group-active:scale-95" 
                      style={{ filter: `drop-shadow(0 0 10px #${k.color}80)` }}
                    />
                  ) : (
                    <span 
                      className="pointer-events-none text-[10px] sm:text-sm md:text-base tracking-widest transition-all duration-300 group-hover:scale-105 group-active:scale-95"
                      style={{ 
                        color: k.accent ? '#fff' : `#${k.color}`, 
                        textShadow: k.accent ? '0 0 10px rgba(255,255,255,0.6)' : `0 0 10px #${k.color}80` 
                      }}
                    >
                      {k.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard3d;