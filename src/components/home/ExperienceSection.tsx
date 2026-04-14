import React from 'react';
import { TechBadge } from '../others/techBadge';

const myStack = [
  { name: "Next.js", icon: "nextdotjs", color: "white" },
  { name: "TypeScript", icon: "typescript", color: "3178C6" },
  { name: "React", icon: "react", color: "61DAFB" },
  { name: "Node.js", icon: "nodedotjs", color: "339933" },
  { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
  { name: "MongoDB", icon: "mongodb", color: "47A248" },
  { name: "Docker", icon: "docker", color: "2496ED" },
  { name: "Google Cloud", icon: "googlecloud", color: "4285F4" },
];

const myStack2 = [
  { name: "Next.js", icon: "nextdotjs", color: "white" },
  { name: "TypeScript", icon: "typescript", color: "3178C6" },
  { name: "React", icon: "react", color: "61DAFB" },
  { name: "Node.js", icon: "nodedotjs", color: "339933" },
  { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
  { name: "MongoDB", icon: "mongodb", color: "47A248" },
  { name: "Docker", icon: "docker", color: "2496ED" },
  { name: "Google Cloud", icon: "googlecloud", color: "4285F4" },
];

export default function ExperienceSection() {
  return (
    <section className="w-full max-w-[1000px] mx-auto px-6 py-32 z-10 relative">
      <div className="text-center mb-20 drop-shadow-lg">
        <h2 className="text-[4rem] sm:text-[5rem] md:text-[6rem] font-black text-white tracking-tighter mb-2 leading-none" style={{ textShadow: '0 4px 20px rgba(255,255,255,0.05)' }}>Experience</h2>
        <p className="text-gray-400 font-bold text-lg md:text-xl tracking-wide">My professional journey.</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Card 1 */}
        <div className="bg-[#0c101a] border border-gray-800 rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-gray-700 transition duration-300 shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

           <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 relative z-10">
             <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Full Stack Developer</h3>
             <span className="bg-[#151a24] border border-gray-800 text-gray-300 font-semibold text-sm px-4 py-1.5 rounded-full mt-3 md:mt-0 w-fit whitespace-nowrap shadow-sm">Dec 2024 - Present</span>
           </div>
           <p className="text-gray-400 font-bold text-lg mb-8 tracking-wide relative z-10">OmniNexus Sdn Bhd</p>
           
           <ul className="space-y-4 mb-10 text-base md:text-lg relative z-10">
             <li className="flex items-start text-gray-300 font-medium leading-relaxed">
                <span className="mr-3 text-white mt-0.5 font-bold">•</span>
                Built a custom image editor from scratch, cutting $4.8k/year in SaaS costs.
             </li>
             <li className="flex items-start text-gray-300 font-medium leading-relaxed">
                <span className="mr-3 text-white mt-0.5 font-bold">•</span>
                Architected async job queues processing 1k+ AI tasks daily with bulletproof reliability.
             </li>
             <li className="flex items-start text-gray-300 font-medium leading-relaxed">
                <span className="mr-3 text-white mt-0.5 font-bold">•</span>
                Optimized media delivery pipeline, slashing asset load times by 40%.
             </li>
             <li className="flex items-start text-gray-300 font-medium leading-relaxed">
                <span className="mr-3 text-white mt-0.5 font-bold">•</span>
                Shipped high-impact features end-to-end from requirements to production.
             </li>
           </ul>

           <div className="flex flex-wrap gap-3 relative z-10">
            {
               myStack.map((item) => (
                  <TechBadge key={item.name} name={item.name} icon={item.icon} color={item.color} />
               ))
            }
              
           </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0c101a] border border-gray-800 rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-gray-700 transition duration-300 shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

           <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 relative z-10">
             <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Freelance Full Stack Developer</h3>
             <span className="bg-[#151a24] border border-gray-800 text-gray-300 font-semibold text-sm px-4 py-1.5 rounded-full mt-3 md:mt-0 w-fit whitespace-nowrap shadow-sm">Apr 2022 - Dec 2024</span>
           </div>
           <p className="text-gray-400 font-bold text-lg mb-8 tracking-wide relative z-10">Self-employed</p>
           
           <ul className="space-y-4 mb-10 text-base md:text-lg relative z-10">
             <li className="flex items-start text-gray-300 font-medium leading-relaxed">
                <span className="mr-3 text-white mt-0.5 font-bold">•</span>
                Transformed chaotic Excel sheets into polished internal tools for various clients.
             </li>
             <li className="flex items-start text-gray-300 font-medium leading-relaxed">
                <span className="mr-3 text-white mt-0.5 font-bold">•</span>
                Shipped dashboards and custom CMS platforms tailored to each client's workflow.
             </li>
             <li className="flex items-start text-gray-300 font-medium leading-relaxed">
                <span className="mr-3 text-white mt-0.5 font-bold">•</span>
                Automated repetitive processes, improving efficiency and reducing human error.
             </li>
             <li className="flex items-start text-gray-300 font-medium leading-relaxed">
                <span className="mr-3 text-white mt-0.5 font-bold">•</span>
                Focused on clean, maintainable code and interfaces that users actually enjoy.
             </li>
           </ul>

           <div className="flex flex-wrap gap-3 relative z-10">
             {
               myStack2.map((item) => (
                  <TechBadge key={item.name} name={item.name} icon={item.icon} color={item.color} />
               ))
            }
              
           </div>
        </div>
      </div>
    </section>
  );
}
