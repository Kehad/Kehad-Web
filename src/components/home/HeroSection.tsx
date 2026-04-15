"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Download, Briefcase } from 'lucide-react';
import cv from '@/assets/Kehinde-Adigun-Resume.jpg';
// import cv2 from '@/assets/Kehinde-Adigun-Resume.pdf';

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

export default function HeroSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  


   const pdfResume = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.download = "Kehinde Gabriel Adigun CV";
    link.href = cv.src;
    link.click();

  };
  const imgResume = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("Download Img resume");
    const link = document.createElement("a");
    link.download = "Kehinde Gabriel Adigun CV";
    // link.href = cv2.src;
    link.click();

  };

  return (
    <div className="relative min-h-[90vh] flex flex-col w-full z-10 transition-colors duration-500 bg-white dark:bg-transparent">
      {/* Top Navbar */}
      <header className="px-4 sm:px-6 py-4 sm:py-6 flex flex-wrap justify-between items-center w-full max-w-[1500px] mx-auto relative z-50">
        <div className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-gray-300 transition cursor-pointer">Kehad</div>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
          
          
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer shadow-sm"
            aria-label="Toggle theme"
          >
             {mounted && theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          
          <div className="flex items-center gap-2 px-3 sm:px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-200 text-sm font-semibold cursor-default shadow-sm">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
             1024
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          
          <button className="flex items-center gap-2 px-3 sm:px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 hover:bg-gray-200 dark:hover:bg-gray-800 transition text-sm font-semibold text-gray-700 dark:text-gray-200 cursor-pointer shadow-sm">
             Menu
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col xl:flex-row items-center justify-between px-4 sm:px-8 py-10 max-w-[1500px] mx-auto w-full z-10 relative">
        
        {/* Left Side: Hero Text */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left xl:w-5/12 mb-16 xl:mb-0 w-full mt-4 sm:mt-0">
          <p className="text-gray-600 dark:text-gray-300 font-semibold mb-2 text-base md:text-xl tracking-wide uppercase">Hi, I am</p>
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight mb-4 sm:mb-6">
            Kehad
          </h1>
          <p className="text-blue-600 dark:text-gray-400 font-bold text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 tracking-wide">A Full Stack Web Developer</p>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center xl:justify-start gap-4 sm:gap-3 w-full sm:w-auto">
            <button onClick={pdfResume} className="flex items-center gap-2 bg-blue-600 dark:bg-white text-white dark:text-black px-6 py-3.5 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-gray-200 transition text-base shadow-md w-full sm:w-auto justify-center cursor-pointer pointer-events-auto">
              <Download className="w-5 h-5" />
              Resume
            </button>
            <a href="#contact" className="flex items-center justify-center gap-2 bg-white dark:bg-[#151a23] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-3.5 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-[#1f2633] transition shadow-md w-full sm:w-auto cursor-pointer pointer-events-auto">
              <Briefcase className="w-5 h-5" />
              Hire Me
            </a>
            
            <div className="flex justify-center w-full sm:w-auto gap-3 mt-2 sm:mt-0 pointer-events-auto">
              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-[#151a23] border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1f2633] transition shadow-md text-gray-900 dark:text-white cursor-pointer group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Github */}
              <a href="https://github.com/Kehad" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-[#151a23] border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1f2633] transition shadow-md text-gray-900 dark:text-white cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com/in/kehinde-adigun" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white dark:bg-[#151a23] border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1f2633] transition shadow-md text-gray-900 dark:text-white cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Isometric Tech Stack Keyboard */}
        <div className="xl:w-7/12 flex flex-col items-center justify-center p-0 sm:p-4 lg:p-12 mt-6 xl:mt-0 select-none w-full xl:max-w-none max-w-[100vw] overflow-x-hidden" style={{ perspective: '3000px' }}>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2" style={{ transform: "translateZ(50px)" }}>Tech Stack</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-widest text-xs sm:text-sm mb-6 sm:mb-12">(hint: hover a key)</p>

          {/* Main Keyboard Base (Wrapper for scrolling on mobile) */}
          <div className="w-full max-w-[100vw] overflow-x-auto overflow-y-visible pb-10 px-4 sm:px-10 flex justify-center no-scrollbar">
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
                  e.currentTarget.style.transform = "rotateX(55deg) rotateZ(-35deg) title scale(1.0)"; 
                }
              }}
            >
              {/* Inner Grid */}
              <div className="flex flex-col gap-2.5 sm:gap-4 relative z-10 w-full">
                {keyboardGrid.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-2.5 sm:gap-4 justify-center w-full">
                    {row.map((k, kIdx) => (
                      <div 
                        key={kIdx} 
                        className={`relative flex items-center justify-center rounded-xl sm:rounded-2xl font-bold text-white transition-all duration-150 cursor-pointer border-t border-l border-white/20 hover:brightness-110 active:translate-x-[-2px] active:translate-y-[2px] active:shadow-none
                        ${k.bg} text-xs sm:text-lg md:text-2xl
                        ${k.colSpan === 2 ? 'w-[4.625rem] sm:w-[9rem] md:w-[11rem]' : 'w-8 sm:w-16 md:w-20'}
                        h-8 sm:h-16 md:h-20
                        `}
                        style={{ 
                          boxShadow: `-4px 6px 0 ${k.shadow}, -4px 6px 8px rgba(0,0,0,0.2)`,
                          transform: 'translate(2px, -2px)'
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 0 transparent';
                            e.currentTarget.style.transform = 'translate(-2px, 4px)';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = `-4px 6px 0 ${k.shadow}, -4px 6px 8px rgba(0,0,0,0.2)`;
                            e.currentTarget.style.transform = 'translate(2px, -2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = `-4px 6px 0 ${k.shadow}, -4px 6px 8px rgba(0,0,0,0.2)`;
                            e.currentTarget.style.transform = 'translate(2px, -2px)';
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
        </div>
      </main>

      {/* Decorative center pill - Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-7 h-12 border-2 border-gray-400 dark:border-gray-600 rounded-full hidden sm:flex justify-center p-1.5 opacity-80 backdrop-blur-sm pointer-events-none z-10">
        <div className="w-1.5 h-3 bg-gray-500 dark:bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
