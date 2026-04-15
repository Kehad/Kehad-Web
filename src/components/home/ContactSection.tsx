import React from 'react';

export default function ContactSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-32 z-10 relative mb-20">
      <div className="text-center mb-16">
        <h2 className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] font-black text-white tracking-tighter leading-none uppercase shadow-sm drop-shadow-xl" style={{ textShadow: '0 4px 20px rgba(255,255,255,0.05)' }}>
          Let's Work<br/>Together
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-center">
        {/* Contact Form Card */}
        <div className="flex-1 w-full max-w-2xl bg-[#090b10] bg-opacity-80 backdrop-blur-md border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
           
           <h3 className="text-3xl font-black text-white mb-2">Contact Form</h3>
           <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed mb-8">
             Please contact me directly at <span className="font-bold text-white">keahnney01@gmail.com</span> or drop your info here.
           </p>

           <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-6">
                 <div className="flex-1 flex flex-col gap-2">
                   <label className="text-white font-bold text-sm">Full name</label>
                   <input type="text" placeholder="Your Name" className="bg-[#1b1e28] border border-gray-800 focus:border-blue-500 hover:border-gray-700 transition w-full px-4 py-3.5 rounded-xl text-white font-medium outline-none placeholder-gray-500 cursor-none shadow-inner" />
                 </div>
                 <div className="flex-1 flex flex-col gap-2">
                   <label className="text-white font-bold text-sm">Email Address</label>
                   <input type="email" placeholder="you@example.com" className="bg-[#1b1e28] border border-gray-800 focus:border-blue-500 hover:border-gray-700 transition w-full px-4 py-3.5 rounded-xl text-white font-medium outline-none placeholder-gray-500 cursor-none shadow-inner" />
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-white font-bold text-sm">Your Message</label>
                 <textarea placeholder="Tell me about about your project," rows={5} className="bg-[#1b1e28] border border-gray-800 focus:border-blue-500 hover:border-gray-700 transition w-full px-4 py-3.5 rounded-xl text-white font-medium outline-none placeholder-gray-500 cursor-none resize-none shadow-inner"></textarea>
              </div>

              <p className="text-gray-400 font-medium text-xs mt-1">I'll never share your data with anyone else. Pinky promise!</p>

              <button type="submit" className="mt-2 w-full bg-[#151a23] hover:bg-[#1a202c] text-white font-bold py-4 rounded-xl border border-gray-700 transition flex items-center justify-center gap-2 cursor-none shadow-lg">
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
              </button>
           </form>
        </div>

        {/* Decorative 3D Base Element mimicking the right image */}
        <div className="flex-1 w-full max-w-lg hidden lg:flex items-center justify-center" style={{ perspective: '2000px' }}>
           <div 
             className="relative w-[320px] h-[400px] bg-[#1a1a1a] rounded-[2rem] border border-gray-800 transition-transform duration-1000 ease-out hover:rotate-x-12 hover:scale-105"
             style={{ transform: "rotateX(55deg) rotateZ(35deg)", transformStyle: "preserve-3d", boxShadow: "-20px 30px 60px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,0.05)" }}
           >
              {/* 3D Depth / Thickness (bottom face) */}
              <div className="absolute inset-0 bg-[#0d0d0d] rounded-[2rem] border border-[#222] pointer-events-none" style={{ transform: "translateZ(-30px)" }}></div>
              
              {/* Simulated Key Stems (colored blocks sticking out bottom) */}
              <div className="absolute bottom-6 left-6 w-14 h-16 bg-[#16a34a] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]" style={{ transform: "translateZ(-60px)" }}></div>
              <div className="absolute bottom-16 left-28 w-14 h-16 bg-[#2563eb] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]" style={{ transform: "translateZ(-70px)" }}></div>
              <div className="absolute bottom-4 right-20 w-14 h-16 bg-[#dc2626] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]" style={{ transform: "translateZ(-65px)" }}></div>
              <div className="absolute top-1/2 left-10 w-14 h-16 bg-[#ea580c] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]" style={{ transform: "translateZ(-50px)" }}></div>
              <div className="absolute top-[40%] right-10 w-14 h-16 bg-white rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]" style={{ transform: "translateZ(-45px)" }}></div>
              <div className="absolute bottom-[20%] right-0 w-14 h-16 bg-[#000] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]" style={{ transform: "translateZ(-55px)" }}></div>
              
              {/* Top face overlay for glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] pointer-events-none"></div>
           </div>
        </div>
      </div>
    </section>
  );
}
