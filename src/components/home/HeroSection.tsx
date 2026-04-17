"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Download, Briefcase } from 'lucide-react';
import cv from '@/assets/Kehinde-Adigun-Resume.jpg';
import Keyboard3d from '../others/keyboard';
import MenuSection from './MenuSection';
import AutoType from '../others/autoType';
import IsometricRoom from './main/setup';
// import cv2 from '@/assets/Kehinde-Adigun-Resume.pdf';


export default function HeroSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="relative min-h-screen flex flex-col w-full z-10 transition-colors duration-500 ">
      {/* Top Navbar */}
      <header className="px-6 py-6 flex justify-between items-center w-full max-w-[1600px] mx-auto relative z-50">
        <div className="text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition cursor-pointer">Kehad</div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
          >
             {mounted && theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-4 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm font-bold text-white shadow-sm pointer-events-auto"
          >
             Menu
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col xl:flex-row items-center justify-between px-8 py-16 max-w-[1600px] mx-auto w-full z-10 relative gap-12">
        
        {/* Left Side: Content */}
        {/* <div className="flex flex-col items-start xl:w-[42%] w-full">
          
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-1.5 pr-4 py-1.5 mb-10 group cursor-pointer hover:bg-white/10 transition-all">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 border border-white/20">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kehad" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="text-white/60 text-sm font-medium">by <span className="text-white font-bold group-hover:text-blue-400 transition-colors">Kehinde Adigun</span></span>
          </div>

          <h1 className="text-[4.5rem] lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight mb-8">
            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Full Stack</span> developer
          </h1>

          <div className="space-y-6 mb-12">
            <p className="text-white text-xl font-medium">Everything you need <span className="text-white/40">in one place:</span></p>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl font-medium">
              <span className="text-white font-bold">100+ projects</span> completed to go from <span className="text-white font-bold">absolute beginner</span> to <span className="text-white font-bold">advanced web systems</span> developer.
            </p>
          </div>

          
          <div className="space-y-4 mb-14">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-500/20 text-indigo-400 rounded-xl">
                 <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" /></svg>
              </div>
              <div>
                <span className="text-white font-bold">1,024+ Commits</span>
                <span className="text-white/40 ml-2">already pushed</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-1">
              <div className="flex text-indigo-500 gap-0.5">
                {[1,2,3,4,5].map(i => <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>)}
              </div>
              <span className="text-white/40 text-sm font-medium">on <span className="text-indigo-400 hover:underline cursor-pointer">GitHub</span></span>
            </div>
          </div>

         
          <div className="relative group cursor-pointer w-full max-w-sm">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600" 
                alt="Workspace" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M8 5V19L19 12L8 5Z"/></svg>
                 </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 p-1 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
               <div className="px-8 py-5 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex flex-col items-center">
                  <span className="text-3xl font-black text-white">$95</span>
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Hire Kehad</span>
               </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left xl:w-5/12 mb-16 xl:mb-0 w-full mt-4 sm:mt-0">
          <p className="text-gray-600 dark:text-gray-300 font-semibold mb-2 text-base md:text-xl tracking-wide uppercase">Hi, I am</p>
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight mb-4 sm:mb-6 min-h-[4rem] sm:min-h-[6rem] md:min-h-[8rem] lg:min-h-[9rem]">
            <AutoType strings={['Kehinde Adigun', 'Kehad']} loop={true} />
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

        {/* Right Side: Isometric Room */}
        <div className="xl:w-[58%] w-full h-[600px] lg:h-[800px] relative">
          <IsometricRoom />
        </div>
      </main>

      {/* Decorative full-screen menu */}
      <MenuSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
