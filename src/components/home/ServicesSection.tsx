"use client";

import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    prefix: "01",
    title: "Frontend Engineering",
    description: "Building scalable, high-performance web applications with React, Next.js, and TypeScript. I bridge the gap between design and robust architecture, ensuring lightning-fast load times and seamless user experiences across all devices.",
    tools: ["React / Next.js", "TypeScript", "Tailwind CSS"],
    color: "from-blue-500 to-cyan-400"
  },
  {
    prefix: "02",
    title: "3D Web Development",
    description: "Elevating digital experiences with immersive, browser-based 3D environments. Leveraging WebGL, Three.js, and React Three Fiber to create interactive workstations, dynamic environments, and engaging modern landing pages.",
    tools: ["Three.js", "React Three Fiber", "Blender"],
    color: "from-emerald-400 to-cyan-500"
  },
  {
    prefix: "03",
    title: "UI / UX Design",
    description: "Crafting intuitive and visually striking interfaces. With a focus on modern aesthetics—dark themes, glassmorphism, and dynamic animations—I synthesize user needs into pixel-perfect mockups and functional design systems.",
    tools: ["Figma", "Framer Motion", "Prototyping"],
    color: "from-orange-500 to-amber-400"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full max-w-[1400px] mx-auto px-6 py-32 z-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
        <div className="relative z-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] font-black text-gray-900 dark:text-white tracking-tighter leading-none"
          >
            What I Offer.
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 font-medium text-lg max-w-md mt-6 md:mt-0"
        >
          I deliver end-to-end digital excellence by combining pixel-perfect design with specialized 3D development and robust frontend architecture.
        </motion.p>
      </div>

      <div className="flex flex-col gap-8 w-full relative z-20">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative w-full rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-sm transition-colors hover:border-gray-300 dark:hover:border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none ${service.color}" 
                 style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
              {/* Inherit gradient from classes below manually since template literals in tailwind can be tricky */}
            </div>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center p-8 md:p-12 gap-8 lg:gap-16">
              
              <div className="flex items-start gap-6 lg:w-[40%]">
                <span className={`text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {service.prefix}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 leading-tight">
                  {service.title}
                </h3>
              </div>

              <div className="lg:w-[45%]">
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:w-[15%] lg:flex-col items-start lg:items-end">
                {service.tools.map((tool, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300">
                    {tool}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>
    </section>
  );
}
