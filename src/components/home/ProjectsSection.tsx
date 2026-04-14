import React from 'react';

export default function ProjectsSection() {
  return (
    <section className="w-full max-w-[1300px] mx-auto px-6 py-20 z-10 relative">
      <div className="text-center mb-16 drop-shadow-lg relative">
        <h2 className="text-[4rem] sm:text-[5rem] md:text-[6rem] font-black text-white tracking-tighter mb-2 leading-none relative z-10" style={{ textShadow: '0 4px 20px rgba(255,255,255,0.05)' }}>Projects</h2>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] sm:w-[600px] sm:h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project 1 */}
        <div className="bg-[#0c101a] border border-gray-800 rounded-[1.25rem] overflow-hidden group hover:border-gray-600 transition duration-300 shadow-xl flex flex-col cursor-none">
          <div className="h-56 sm:h-64 overflow-hidden relative bg-[#111622]">
            <img src="/projects/coding_platform.png" alt="Coding Ducks" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out mix-blend-lighten opacity-90 group-hover:opacity-100" />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition">Coding Ducks</h3>
            <span className="inline-block bg-white text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm tracking-wide">Coding platform</span>
          </div>
        </div>
        
        {/* Project 2 */}
        <div className="bg-[#0c101a] border border-gray-800 rounded-[1.25rem] overflow-hidden group hover:border-gray-600 transition duration-300 shadow-xl flex flex-col cursor-none">
          <div className="h-56 sm:h-64 overflow-hidden relative bg-[#111622]">
            <img src="/projects/coupon_site.png" alt="Coupon Luxury" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out mix-blend-lighten opacity-90 group-hover:opacity-100" />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition">Coupon Luxury</h3>
            <span className="inline-block bg-white text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm tracking-wide">Coupon site</span>
          </div>
        </div>

        {/* Project 3 */}
        <div className="bg-[#0c101a] border border-gray-800 rounded-[1.25rem] overflow-hidden group hover:border-gray-600 transition duration-300 shadow-xl flex flex-col cursor-none">
          <div className="h-56 sm:h-64 overflow-hidden relative bg-[#111622]">
            <img src="/projects/booking_desk.png" alt="The Booking Desk" className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-in-out mix-blend-lighten opacity-90 group-hover:opacity-100" />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition">The Booking Desk</h3>
            <span className="inline-block bg-white text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm tracking-wide">Travel</span>
          </div>
        </div>

        {/* Project 4 */}
        <div className="bg-[#0c101a] border border-gray-800 rounded-[1.25rem] overflow-hidden group hover:border-gray-600 transition duration-300 shadow-xl flex flex-col cursor-none">
          <div className="h-56 sm:h-64 overflow-hidden relative bg-[#111622]">
            <img src="/projects/portfolio_ui.png" alt="My Portfolio" className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700 ease-in-out mix-blend-lighten opacity-90 group-hover:opacity-100" />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition">My Portfolio</h3>
            <span className="inline-block bg-white text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm tracking-wide">Portfolio</span>
          </div>
        </div>

        {/* Project 5 */}
        <div className="bg-[#0c101a] border border-gray-800 rounded-[1.25rem] overflow-hidden group hover:border-gray-600 transition duration-300 shadow-xl flex flex-col cursor-none">
          <div className="h-56 sm:h-64 overflow-hidden relative bg-[#111622]">
            <img src="/projects/ghostchat_ui.png" alt="GhostChat" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out mix-blend-lighten opacity-90 group-hover:opacity-100" />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition">GhostChat</h3>
            <span className="inline-block bg-white text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm tracking-wide">Anonymous chat</span>
          </div>
        </div>

        {/* Project 6 */}
        <div className="bg-[#0c101a] border border-gray-800 rounded-[1.25rem] overflow-hidden group hover:border-gray-600 transition duration-300 shadow-xl flex flex-col cursor-none">
          <div className="h-56 sm:h-64 overflow-hidden relative bg-[#111622]">
            <img src="/projects/result_analyzer.png" alt="JNTUA Results Analyzer" className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-in-out mix-blend-lighten opacity-90 group-hover:opacity-100" />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition">JNTUA Results Analyzer</h3>
            <span className="inline-block bg-white text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm tracking-wide">Result analyzer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
