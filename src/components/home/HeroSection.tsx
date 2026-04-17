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
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 hover:bg-gray-200 dark:hover:bg-gray-800 transition text-sm font-semibold text-gray-700 dark:text-gray-200 cursor-pointer shadow-sm pointer-events-auto"
          >
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

        {/* Right Side: Isometric Tech Stack Keyboard */}
        <div className="xl:w-7/12 flex flex-col items-center justify-center p-0 sm:p-4 lg:p-12 mt-6 xl:mt-0 select-none w-full xl:max-w-none max-w-[100vw] overflow-x-hidden" style={{ perspective: '3000px' }}>
          
          {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2" style={{ transform: "translateZ(50px)" }}>Tech Stack</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-widest text-xs sm:text-sm mb-6 sm:mb-12">(hint: hover a key)</p> */}

          {/* Main Keyboard Base (Wrapper for scrolling on mobile) */}
            {/* <Keyboard3d /> */}
            <IsometricRoom />
        </div>
      </main>

      {/* Decorative center pill - Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-7 h-12 border-2 border-gray-400 dark:border-gray-600 rounded-full hidden sm:flex justify-center p-1.5 opacity-80 backdrop-blur-sm pointer-events-none z-10">
        <div className="w-1.5 h-3 bg-gray-500 dark:bg-white rounded-full animate-bounce"></div>
      </div>
      
      {/* External Full-Screen Menu Section */}
      <MenuSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

    </div>
  );
}
