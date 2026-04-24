"use client";

import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <section 
      className="w-full relative py-20 flex flex-col items-center justify-center" 
      id="experience"
    >
      {/* Background ambient glows */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 filter blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-orange-600/10 filter blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[850px] px-6">
        <header className="mb-16 text-center">
          <h1 className="text-[clamp(3rem,10vw,7rem)] font-black text-white m-0 tracking-tighter leading-none pointer-events-none">
            Experience
          </h1>
          <p className="text-gray-500 uppercase tracking-[0.3em] font-bold mt-2 text-sm md:text-base">
            My professional journey
          </p>
        </header>

        <div className="w-full flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                bounce: 0.35,
                delay: index * 0.15
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="w-full"
            >
              <ExperienceCard {...exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}