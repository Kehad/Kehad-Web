import React, { useState } from 'react'
import MenuSection from './MenuSection';

function Header() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  return (

    <>
    <header className="px-4 sm:px-6 py-4 sm:py-6 flex flex-wrap justify-between items-center w-full max-w-[1500px] mx-auto relative z-50 gap-y-4">
        <div className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-gray-300 transition cursor-pointer">Kehad</div>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
          
          <a href='https://github.com/Kehad' target='_blank' className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-200 text-sm font-semibold  shadow-sm">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
             1024
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </a>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 hover:bg-gray-200 dark:hover:bg-gray-800 transition text-sm font-semibold text-gray-700 dark:text-gray-200 cursor-pointer shadow-sm pointer-events-auto"
          >
             Menu
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </header>
        <MenuSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  )
}

export default Header