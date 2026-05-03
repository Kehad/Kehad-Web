import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800/80 mt-12 bg-white/80 dark:bg-[#0A0E17]/80 backdrop-blur-md relative z-20">
      <div className="w-full max-w-[1500px] mx-auto px-6 py-8 md:py-0 md:h-24 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        
        {/* Left Side: Links and Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-700 dark:text-white font-black text-sm tracking-wide hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-[0_1rem_2rem_rgba(0,0,0,0.4)] hover:scale-110 hover:text-shadow-[0_1rem_2rem_rgba(0,0,0,0.4)] hover:rotate-12 transition cursor-pointer">Blog</a>
            {/* <a href="#" className="text-gray-700 dark:text-white font-black text-sm tracking-wide hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-[0_1rem_2rem_rgba(0,0,0,0.4)] hover:scale-110 hover:text-shadow-[0_1rem_2rem_rgba(0,0,0,0.4)] hover:rotate-12 transition cursor-pointer">Newsletter</a> */}
          </div>
          
          <div className="hidden sm:block h-5 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
          
          <p className="text-gray-500 dark:text-gray-400 font-bold text-xs sm:text-sm tracking-wide text-center sm:text-left">
            © 2026 Kehad. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex items-center gap-5 sm:gap-6">
          <a href="https://github.com/Kehad" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer transform hover:scale-110">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
          </a>
          <a href="https://linkedin.com/in/kehinde-adigun" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer transform hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          </a>
          <a href="https://twitter.com/devKehad" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer transform hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
