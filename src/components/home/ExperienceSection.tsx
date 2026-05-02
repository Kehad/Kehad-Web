// "use client";
// import * as motion from "motion/react-client";
// import type { Variants } from "motion/react";

// export default function ScrollTriggered() {
//   return (
//     <section className="w-full min-h-screen py-16 sm:py-24 md:py-32 relative overflow-x-hidden">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-12 relative pb-[20vh]">
        
//         {/* Section Header */}
//         <div className="text-center mb-12 md:mb-24 z-200">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 tracking-tight px-2"
//           >
//             Professional Experience
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto font-medium"
//           >
//             A timeline of my journey, roles, and the impact I've made along the way.
//           </motion.p>
//         </div>

//         {experiences.map((exp, i) => (
//           <Card num={i} exp={exp} key={i} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function Card({ exp, num }: { exp: any; num: number }) {
//   const {
//     role,
//     duration,
//     company,
//     description,
//     skills,
//     colorTheme,
//   } = exp;

//   return (
//     <div
//       className="sticky"
//       style={{ 
//         top: `calc(200px + ${num * 30}px)`,
//         zIndex: num + 10,
//       }}
//     >
//       <motion.div
//         initial="offscreen"
//         whileInView="onscreen"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={cardVariants}
//         className="relative group w-full"
//       >
//         {/* Subtle Glow Behind Card */}
//         <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorTheme.gradientFrom} ${colorTheme.gradientTo} rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-700`}></div>

//         <div className="relative w-full bg-[#0d0d0d]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-500">
          
//           {/* Background Accent Mesh/Gradient */}
//           <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${colorTheme.gradientFrom} ${colorTheme.gradientTo} blur-[120px] opacity-20 rounded-full pointer-events-none group-hover:opacity-30 transition-opacity duration-700`}></div>

//           <div className="relative z-10 w-full">
//             {/* Header Section */}
//             <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 md:mb-12 gap-4">
//               <div>
//                 <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
//                   {role}
//                 </h3>
//                 <p className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorTheme.gradientFrom} ${colorTheme.gradientTo} inline-block`}>
//                   {company}
//                 </p>
//               </div>
//               <div className="flex-shrink-0">
//                 <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-semibold shadow-inner backdrop-blur-md">
//                   <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   {duration}
//                 </span>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mb-10 space-y-4">
//               {description.map((point: string, index: number) => (
//                 <div key={index} className="flex items-start group/point">
//                   <div className={`flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-gradient-to-r ${colorTheme.gradientFrom} ${colorTheme.gradientTo} opacity-70 group-hover/point:opacity-100 group-hover/point:scale-150 transition-all duration-300`} />
//                   <p className="ml-4 text-gray-400 group-hover/point:text-gray-300 transition-colors duration-300 leading-relaxed text-[1.05rem] font-medium">
//                     {point}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Tech Stack Footer */}
//             {skills && skills.length > 0 && (
//               <div className="pt-8 border-t border-white/5">
//                 <div className="flex flex-wrap gap-2.5">
//                   {skills.map((skill: any, idx: number) => (
//                     <div 
//                       key={idx} 
//                       className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10 transition-all cursor-default group/skill shadow-sm"
//                     >
//                       <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: `#${skill.color}` }} />
//                       <span className="text-sm font-semibold text-gray-400 group-hover/skill:text-gray-100 transition-colors drop-shadow-sm">{skill.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// const cardVariants: Variants = {
//   offscreen: {
//     y: 180,
//     opacity: 0,
//     scale: 0.96,
//   },
//   onscreen: {
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: {
//       type: "spring",
//       bounce: 0.25,
//       duration: 0.8,
//     },
//   },
// };

// const experiences = [
//   {
//     role: "Mobile Application Developer",
//     company: "QUIDROP",
//     duration: "Jan 2025 - Dec 2025",
//     colorTheme: {
//       gradientFrom: "from-blue-500",
//       gradientTo: "to-indigo-500",
//     },
//     description: [
//       "Collaborated with backend developers to integrate APIs for dynamic data management.",
//       "Developed the Quidrop interface, ensuring a seamless user experience.",
//       "Implemented responsive design to ensure optimal performance across all devices.",
//       "Worked closely with UI/UX designers to translate designs into functional, user-friendly interfaces.",
//       "Optimized website performance, enhancing load times and interactivity.",
//       "Ensured cross-browser compatibility for a consistent user experience.",
//     ],
//     skills: [
//       { name: "React Native", icon: "react", color: "61DAFB" },
//       { name: "TypeScript", icon: "typescript", color: "3178C6" },
//       { name: "Next.js", icon: "nextdotjs", color: "ffffff" },
//       { name: "Node.js", icon: "nodedotjs", color: "339933" },
//       { name: "Tailwind", icon: "tailwindcss", color: "06B6D4" },
//     ],
//   },
//   {
//     role: "Junior Frontend Developer (Contract)",
//     company: "LOKATALENT",
//     duration: "Aug 2024 - Jan 2025",
//     colorTheme: {
//       gradientFrom: "from-orange-500",
//       gradientTo: "to-amber-500",
//     },
//     description: [
//       "Built the dashboard for both the user and the service provider.",
//       "Collaborated with the backend developer to integrate the API.",
//       "Worked with UX/UI designers to implement visually appealing and user-friendly interfaces.",
//       "Ensured the website was mobile responsive.",
//       "Integrated third-party APIs seamlessly into existing systems, expanding feature sets and capabilities.",
//     ],
//     skills: [
//       { name: "React", icon: "react", color: "61DAFB" },
//       { name: "Next.js", icon: "nextdotjs", color: "ffffff" },
//       { name: "TypeScript", icon: "typescript", color: "3178C6" },
//       { name: "Tailwind", icon: "tailwindcss", color: "06B6D4" },
//     ],
//   },
//   {
//     role: "Web Developer Intern",
//     company: "CR8IVITI",
//     duration: "July 2023 - Aug 2024",
//     colorTheme: {
//       gradientFrom: "from-emerald-400",
//       gradientTo: "to-teal-500",
//     },
//     description: [
//       "Created custom websites by harnessing HTML, CSS and JavaScript skills.",
//       "Collaborated with web designers to match visual design intent.",
//       "Designed web pages to enhance branding and navigation.",
//     ],
//     skills: [
//       { name: "HTML5", icon: "html5", color: "E34F26" },
//       { name: "CSS3", icon: "css3", color: "1572B6" },
//       { name: "JavaScript", icon: "javascript", color: "F7DF1E" },
//       { name: "React", icon: "react", color: "61DAFB" },
//     ],
//   },
// ];


"use client";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { useState, useRef, useEffect } from "react";

export default function ScrollTriggered() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current) return;

      const section = sectionRef.current;
      const container = containerRef.current;
      const sectionRect = section.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate which card should be active based on scroll position
      const viewportCenter = window.innerHeight / 2;
      const cards = container.querySelectorAll('[data-card-index]');
     
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
        if (distanceFromCenter < cardRect.height / 2) {
          setActiveCard(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full relative"
      style={{ 
      // minHeight: `${100 + (experiences.length * 100)}vh`,
      }}
    >
      {/* Sticky Header */}
      <div className="sticky z-[0] top-[-108px] left-0 right-0 z-50 pointer-events-none">
        <div className="text-center pt-16 sm:pt-24 md:pt-32 pb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 tracking-tight px-2"
          >
            Professional Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto font-medium px-4"
          >
            A timeline of my journey, roles, and the impact I've made along the way.
          </motion.p>
        </div>
      </div>

      {/* Cards Container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          paddingTop: '10vh',
          paddingBottom: '40vh'
        }}
      >
        {/* Timeline Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-700 via-gray-800 to-transparent hidden sm:block" 
          style={{ 
            left: 'calc(50% - 0.5px)' 
          }} 
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-[40vh md:space-y-[50vh">
          {experiences.map((exp, i) => (
            <Card 
              num={i} 
              exp={exp} 
              key={i}
              isExpanded={expandedCard === i}
              onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
              isActive={activeCard === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ 
  exp, 
  num, 
  isExpanded, 
  onToggle,
  isActive
}: { 
  exp: any; 
  num: number;
  isExpanded: boolean;
  onToggle: () => void;
  isActive: boolean;
}) {
  const {
    role,
    duration,
    company,
    description,
    skills,
    colorTheme,
  } = exp;

  return (
    <div
      data-card-index={num}
      className="sticky w-full"
      style={{
        top: `calc(15vh + ${num * 40}px)`,
        zIndex: num + 10,
      }}
    >
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        className="relative group w-full"
        animate={{
          scale: isActive ? 1 : 0.98,
          opacity: isActive ? 1 : 0.8,
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        {/* Timeline Dot */}
        <motion.div 
          className={`absolute left-1/2 -translate-x-1/2 -top-8 w-4 h-4 rounded-full bg-gradient-to-r ${colorTheme.gradientFrom} ${colorTheme.gradientTo} shadow-lg hidden sm:block border-4 border-[#0a0a0a] z-10`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            delay: isActive ? 0 : 0.3, 
            type: isActive ? "tween" : "spring", 
            stiffness: 200,
            duration: isActive ? 0.5 : undefined
          }}
          animate={{
            scale: isActive ? [1, 1.3, 1] : 1,
          }}
        >
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorTheme.gradientFrom} ${colorTheme.gradientTo} blur-md opacity-50 ${isActive ? 'animate-pulse' : ''}`} />
        </motion.div>

        {/* Subtle Glow Behind Card */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorTheme.gradientFrom} ${colorTheme.gradientTo} rounded-[2.5rem] blur ${isActive ? 'opacity-40' : 'opacity-20'} group-hover:opacity-50 transition duration-700`}></div>

        <div className="relative w-full bg-[#0d0d0d]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-500">
          
          {/* Background Accent Mesh/Gradient */}
          <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${colorTheme.gradientFrom} ${colorTheme.gradientTo} blur-[120px] ${isActive ? 'opacity-30' : 'opacity-20'} rounded-full pointer-events-none group-hover:opacity-40 transition-opacity duration-700`}></div>

          <div className="relative z-10 w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 md:mb-12 gap-4">
              <div className="flex-1">
                <motion.h3 
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2"
                  layoutId={`title-${num}`}
                >
                  {role}
                </motion.h3>
                <p className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorTheme.gradientFrom} ${colorTheme.gradientTo} inline-block`}>
                  {company}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-semibold shadow-inner backdrop-blur-md">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {duration}
                </span>
                
                {/* Expand/Collapse Button */}
                <button
                  onClick={onToggle}
                  className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group/btn pointer-events-auto"
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                  <motion.svg 
                    className="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <motion.div 
              className="mb-10 space-y-4 overflow-hidden relative"
              initial={false}
              animate={{ 
                height: isExpanded ? "auto" : "120px",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {description.map((point: string, index: number) => (
                <motion.div 
                  key={index} 
                  className="flex items-start group/point"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={`flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-gradient-to-r ${colorTheme.gradientFrom} ${colorTheme.gradientTo} opacity-70 group-hover/point:opacity-100 group-hover/point:scale-150 transition-all duration-300`} />
                  <p className="ml-4 text-gray-400 group-hover/point:text-gray-300 transition-colors duration-300 leading-relaxed text-[1.05rem] font-medium">
                    {point}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Read More Indicator */}
            {!isExpanded && description.length > 3 && (
              <motion.div 
                className="absolute bottom-32 left-0 right-0 h-20 bg-gradient-to-t from-[#0d0d0d]/90 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            {/* Tech Stack Footer */}
            {skills && skills.length > 0 && (
              <motion.div 
                className="pt-8 border-t border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill: any, idx: number) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10 transition-all cursor-default group/skill shadow-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: `#${skill.color}` }} />
                      <span className="text-sm font-semibold text-gray-400 group-hover/skill:text-gray-100 transition-colors drop-shadow-sm">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

const experiences = [
  {
    role: "Mobile Application Developer",
    company: "QUIDROP",
    duration: "Jan 2025 - Dec 2025",
    colorTheme: {
      gradientFrom: "from-blue-500",
      gradientTo: "to-indigo-500",
    },
    description: [
      "Collaborated with backend developers to integrate APIs for dynamic data management.",
      "Developed the Quidrop interface, ensuring a seamless user experience.",
      "Implemented responsive design to ensure optimal performance across all devices.",
      "Worked closely with UI/UX designers to translate designs into functional, user-friendly interfaces.",
      "Optimized website performance, enhancing load times and interactivity.",
      "Ensured cross-browser compatibility for a consistent user experience.",
    ],
    skills: [
      { name: "React Native", icon: "react", color: "61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "3178C6" },
      { name: "Next.js", icon: "nextdotjs", color: "ffffff" },
      { name: "Node.js", icon: "nodedotjs", color: "339933" },
      { name: "Tailwind", icon: "tailwindcss", color: "06B6D4" },
    ],
  },
  {
    role: "Junior Frontend Developer (Contract)",
    company: "LOKATALENT",
    duration: "Aug 2024 - Jan 2025",
    colorTheme: {
      gradientFrom: "from-orange-500",
      gradientTo: "to-amber-500",
    },
    description: [
      "Built the dashboard for both the user and the service provider.",
      "Collaborated with the backend developer to integrate the API.",
      "Worked with UX/UI designers to implement visually appealing and user-friendly interfaces.",
      "Ensured the website was mobile responsive.",
      "Integrated third-party APIs seamlessly into existing systems, expanding feature sets and capabilities.",
    ],
    skills: [
      { name: "React", icon: "react", color: "61DAFB" },
      { name: "Next.js", icon: "nextdotjs", color: "ffffff" },
      { name: "TypeScript", icon: "typescript", color: "3178C6" },
      { name: "Tailwind", icon: "tailwindcss", color: "06B6D4" },
    ],
  },
  {
    role: "Web Developer Intern",
    company: "CR8IVITI",
    duration: "July 2023 - Aug 2024",
    colorTheme: {
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-500",
    },
    description: [
      "Created custom websites by harnessing HTML, CSS and JavaScript skills.",
      "Collaborated with web designers to match visual design intent.",
      "Designed web pages to enhance branding and navigation.",
    ],
    skills: [
      { name: "HTML5", icon: "html5", color: "E34F26" },
      { name: "CSS3", icon: "css3", color: "1572B6" },
      { name: "JavaScript", icon: "javascript", color: "F7DF1E" },
      { name: "React", icon: "react", color: "61DAFB" },
    ],
  },
];