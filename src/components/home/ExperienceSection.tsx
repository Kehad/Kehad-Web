"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ExperienceCard, ExperienceItem } from '../others/techBadge';

const experiences: ExperienceItem[] = [
  {
    role: "Mobile Application Developer",
    company: "QUIDROP",
    duration: "Jan 2025 - Dec 2025",
    accentColor: "blue-600",
    description: [
      "Collaborated with backend developers to integrate APIs for dynamic data management.",
      "Developed the Quidrop interface, ensuring a seamless user experience.",
      "Implemented responsive design to ensure optimal performance across all devices.",
      "Worked closely with UI/UX designers to translate designs into functional, user-friendly interfaces.",
      "Optimized website performance, enhancing load times and interactivity.",
      "Ensured cross-browser compatibility for a consistent user experience."
    ],
    skills: [
      { name: "React Native", icon: "react", color: "61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "3178C6" },
      { name: "Next.js", icon: "nextdotjs", color: "ffffff" },
      { name: "Node.js", icon: "nodedotjs", color: "339933" },
      { name: "Tailwind", icon: "tailwindcss", color: "06B6D4" },
    ]
  },
  {
    role: "Junior Frontend Developer (Contract)",
    company: "LOKATALENT",
    duration: "Aug 2024 - Jan 2025",
    accentColor: "orange-600",
    description: [
      "Built the dashboard for both the user and the service provider.",
      "Collaborated with the backend developer to integrate the API.",
      "Worked with UX/UI designers to implement visually appealing and user-friendly interfaces.",
      "Ensured the website was mobile responsive.",
      "Integrated third-party APIs seamlessly into existing systems, expanding feature sets and capabilities."
    ],
    skills: [
      { name: "React", icon: "react", color: "61DAFB" },
      { name: "Next.js", icon: "nextdotjs", color: "ffffff" },
      { name: "TypeScript", icon: "typescript", color: "3178C6" },
      { name: "Tailwind", icon: "tailwindcss", color: "06B6D4" },
    ]
  },
  {
    role: "Web Developer Intern",
    company: "CR8IVITI",
    duration: "July 2023 - Aug 2024",
    accentColor: "emerald-600",
    description: [
      "Created custom websites by harnessing HTML, CSS and JavaScript skills.",
      "Collaborated with web designers to match visual design intent.",
      "Designed web pages to enhance branding and navigation."
    ],
    skills: [
      { name: "HTML5", icon: "html5", color: "E34F26" },
      { name: "CSS3", icon: "css3", color: "1572B6" },
      { name: "JavaScript", icon: "javascript", color: "F7DF1E" },
      { name: "React", icon: "react", color: "61DAFB" },
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalHeight = container.offsetHeight - window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      let progress = -rect.top / totalHeight;
      progress = Math.min(Math.max(progress, 0), 1);

      const totalCards = experiences.length;
      const segment = 1 / totalCards;

      experiences.forEach((_, index) => {
        const card = cardRefs.current[index];
        const dot = dotRefs.current[index];
        if (!card || !dot) return;

        const isFirst = index === 0;
        const isLast = index === totalCards - 1;
        
        const start = index * segment;
        const end = (index + 1) * segment;
        
        // Displacement configuration
        let opacity = 0;
        let x = 100; // Start at right
        let rotY = 15; // Start with slight tilt
        let scale = 0.9;

        // Entrance Timing (first 40% of the segment)
        const entranceEnd = start + (segment * 0.4);
        // Exit Timing (last 40% of the segment)
        const exitStart = end - (segment * 0.4);

        if (progress >= start && progress <= end) {
          if (isFirst && progress <= entranceEnd) {
            opacity = 1;
            x = 0;
            scale = 1;
          } else if (progress <= entranceEnd) {
            const p = (progress - start) / (entranceEnd - start);
            opacity = p;
            x = 120 * (1 - p);
            scale = 0.95 + (0.05 * p);
          } else if (progress >= exitStart && !isLast) {
            const p = (progress - exitStart) / (end - exitStart);
            opacity = 1 - p;
            x = -120 * p;
            scale = 1 - (0.05 * p);
          } else {
            opacity = 1;
            x = 0;
            scale = 1;
          }
          card.classList.add('active');
          dot.classList.add('active');
        } else if (isFirst && progress < start) {
          opacity = 1;
          x = 0;
          scale = 1;
          card.classList.add('active');
          dot.classList.add('active');
        } else if (isLast && progress >= end) {
          opacity = 1;
          x = 0;
          scale = 1;
          card.classList.add('active');
          dot.classList.add('active');
        } else {
          card.classList.remove('active');
          dot.classList.remove('active');
        }

        // Apply high-performance transforms
        card.style.opacity = opacity.toString();
        card.style.transform = `translateX(${x}%) scale(${scale})`;
        card.style.visibility = opacity > 0 ? 'visible' : 'hidden';
      });
    };
    console.log(cardRefs, 'cardrefs')

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full" 
      id="experience"
      style={{ height: '450vh' }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background ambient glows */}
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 filter blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-orange-600/10 filter blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[850px] text-center px-6">
          <header className="mb-12">
            <h1 className="text-[clamp(3rem,10vw,7rem)] font-black text-white m-0 tracking-tighter leading-none pointer-events-none">
              Experience
            </h1>
            <p className="text-gray-500 uppercase tracking-[0.3em] font-bold mt-2 text-sm md:text-base">
              My professional journey
            </p>
          </header>

          <div className="relative h-[550px] mt-12 w-full flex items-center justify-center">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={el => { cardRefs.current[index] = el; }}
                className="absolute top-0 left-0 w-full pointer-events-none transition-[transform,opacity] duration-150 ease-linear"
                style={{ 
                  opacity: 0, 
                  transform: 'translateX(120%) scale(0.95)',
                  zIndex: index + 1 // New cards stack on top of old ones
                }}
              >
                <div className="pointer-events-auto">
                    <ExperienceCard {...exp} />
                </div>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex gap-2.5 justify-center mt-12 z-20 relative">
            {experiences.map((_, i) => (
              <div
                key={i}
                ref={el => { dotRefs.current[i] = el }}
                className="h-2 w-2 bg-orange-500 rounded-full opacity-20 transition-all duration-300 [&.active]:w-8 [&.active]:opacity-100"
              />
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-transparent animate-bounce opacity-70" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
              Scroll to progress
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}