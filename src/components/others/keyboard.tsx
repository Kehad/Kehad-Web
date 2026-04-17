import React, { useState } from 'react';

const keyboardGrid = [
    [
      { id: "js", label: "JS", icon: "javascript", bg: "bg-yellow-500", shadow: "#ca8a04" },
      { id: "ts", label: "TS", icon: "typescript", bg: "bg-blue-500", shadow: "#1d4ed8" },
      { id: "html", label: "H5", icon: "html5", bg: "bg-orange-600", shadow: "#c2410c" },
      { id: "css", label: "C3", icon: "css3", bg: "bg-blue-600", shadow: "#1e3a8a" },
      { id: "react", label: "Re", icon: "react", bg: "bg-cyan-400", shadow: "#0891b2" },
      { id: "vue", label: "Vu", icon: "vuedotjs", bg: "bg-emerald-500", shadow: "#047857" },
    ],
    [
      { id: "next", label: "Nx", icon: "nextdotjs", bg: "bg-zinc-900", shadow: "#000000" },
      { id: "tailwind", label: "Tw", icon: "tailwindcss", bg: "bg-cyan-500", shadow: "#0369a1" },
      { id: "node", label: "No", icon: "nodedotjs", bg: "bg-green-600", shadow: "#15803d" },
      { id: "express", label: "Ex", icon: "express", bg: "bg-gray-700", shadow: "#374151" },
      { id: "graphql", label: "GQ", icon: "graphql", bg: "bg-pink-600", shadow: "#be185d" },
      { id: "wp", label: "WP", icon: "wordpress", bg: "bg-blue-800", shadow: "#1e3a8a" },
    ],
    [
      { id: "git", label: "Git", icon: "git", bg: "bg-orange-600", shadow: "#c2410c" },
      { id: "github", label: "GH", icon: "github", bg: "bg-zinc-800", shadow: "#27272a" },
      { id: "docker", label: "Dk", icon: "docker", bg: "bg-blue-500", shadow: "#1d4ed8" },
      { id: "npm", label: "npm", icon: "npm", bg: "bg-red-600", shadow: "#dc2626" },
      { id: "aws", label: "AWS", icon: "amazonaws", bg: "bg-orange-400", shadow: "#f97316" },
      { id: "nginx", label: "Ngx", icon: "nginx", bg: "bg-emerald-600", shadow: "#059669" },
    ],
    [
      { id: "empty1", label: "", bg: "bg-gray-900", shadow: "#111827" },
      { id: "linux", label: "Lx", icon: "linux", bg: "bg-yellow-600", shadow: "#a16207" },
      { id: "space", label: "SPACE", bg: "bg-zinc-900", shadow: "#000000", colSpan: 2 },
      { id: "enter", label: "ENT", bg: "bg-[#e11d48]", shadow: "#be123c", colSpan: 2 },
    ]
  ];


const Keyboard3d = () => {
  const [activeLabel, setActiveLabel] = useState("WELCOME");

  return (
    <div className="w-full max-w-[100vw] overflow-x-auto overflow-y-visible pb-10 px-4 sm:px-10 flex flex-col items-center no-scrollbar">
      
      <div 
        className="origin-center transition-transform duration-700 ease-out bg-gray-100 dark:bg-[#1A1F2B] p-3 sm:p-5 md:p-6 rounded-3xl sm:rounded-[2.5rem] border border-gray-300 dark:border-gray-700/50 shadow-[0_12px_30px_rgba(0,0,0,0.1)] dark:shadow-[-16px_24px_0_#060910,-24px_36px_50px_rgba(0,0,0,0.8)] relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/5 dark:before:from-white/5 before:to-transparent before:rounded-3xl sm:before:rounded-[2.5rem] min-w-max"
        style={{ transform: "rotateX(55deg) rotateZ(-35deg) scale(0.85) sm:scale(1)", transformStyle: "preserve-3d" }}
        onMouseEnter={(e) => { 
          if (window.innerWidth >= 1024) {
            e.currentTarget.style.transform = "rotateX(50deg) rotateZ(-30deg) scale(1.02)"; 
          }
        }}
        onMouseLeave={(e) => { 
          if (window.innerWidth >= 1024) {
            e.currentTarget.style.transform = "rotateX(55deg) rotateZ(-35deg) scale(1.0)"; 
          }
        }}
      >
        {/* Screen / Display */}
        <div 
          className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-10 sm:h-16 bg-[#060910] border-2 border-gray-700/50 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center"
          style={{ transform: "translateZ(30px) rotateX(-10deg)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#060910_70%)] opacity-50 z-10" />
          <div className="absolute inset-0 bg-[#0ea5e9]/5 animate-pulse" />
          <span 
            className="text-[#0ea5e9] font-mono text-sm sm:text-2xl font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(14,165,233,0.8)] z-20"
          >
            {activeLabel || "READY"}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#0ea5e9]/20" />
        </div>

        {/* Inner Grid */}
        <div className="flex flex-col gap-2.5 sm:gap-4 relative z-10 w-full">
          {keyboardGrid.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-2.5 sm:gap-4 justify-center w-full">
              {row.map((k, kIdx) => (
                <div 
                  key={kIdx} 
                  className={`relative flex items-center justify-center rounded-xl sm:rounded-2xl font-bold text-white transition-all duration-200 cursor-pointer border-t border-l border-white/20 hover:brightness-110 active:shadow-none
                  ${k.bg} text-xs sm:text-lg md:text-2xl
                  ${k.colSpan === 2 ? 'w-[4.625rem] sm:w-[9rem] md:w-[11rem]' : 'w-8 sm:w-16 md:w-20'}
                  h-8 sm:h-16 md:h-20
                  `}
                  style={{ 
                    boxShadow: `-4px 8px 0 ${k.shadow}, -4px 8px 10px rgba(0,0,0,0.2)`,
                    transform: 'translate(4px, -4px)'
                  }}
                  onMouseEnter={(e) => {
                    if (k.label) setActiveLabel(k.id.toUpperCase());
                    e.currentTarget.style.boxShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'translate(-2px, 2px)';
                  }}
                  onMouseLeave={(e) => {
                    setActiveLabel("WELCOME");
                    e.currentTarget.style.boxShadow = `-4px 8px 0 ${k.shadow}, -4px 8px 10px rgba(0,0,0,0.2)`;
                    e.currentTarget.style.transform = 'translate(4px, -4px)';
                  }}
                >
                  {k.icon ? (
                     <img src={`https://cdn.simpleicons.org/${k.icon}/white`} alt={k.label} className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 drop-shadow-md pointer-events-none" />
                  ) : (
                     <span className="drop-shadow-md pointer-events-none">{k.label}</span>
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