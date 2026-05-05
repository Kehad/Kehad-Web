"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import taxnaija from '../../assets/taxnaija.png';
import Piccon from '../../assets/Piccon.png';
import artisanhub from '../../assets/artisanhub.png';
import xo from '../../assets/xo.png';
import Adbook from '../../assets/Adbook.png';
import kadee from '../../assets/kadee.png';
import Exchnge from '../../assets/static-exchnge.png';
import QuoteGen from '../../assets/quote-generator.png';
import KehadCalc from '../../assets/kehad-calc.png';

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  Tag: string;
  imageSrc: any;
}

const projectsData: Project[] = [
  {
    id: 'm6',
    name: 'TaxNaija',
    slug: 'taxnaija',
    description: "TaxNaija is a specialized tax calculator and compliance platform built for Nigeria's 2026 tax reforms. It helps individuals and businesses instantly estimate their tax liability, apply statutory deductions (like rent and pension), and understand their effective tax rates under the new laws.",
    website: 'https://taxnaija.onrender.com/',
    Tag: "Tax & Finance",
    imageSrc: taxnaija,
  },
  {
    id: 'm1',
    name: 'Piccon',
    slug: 'piccon',
    description: "Piccon is your go-to platform for comparing designs and logos to check for originality. Easily upload your designs and verify their uniqueness against a comprehensive database. Our advanced algorithms ensure accurate and reliable results, helping you avoid copyright issues.",
    website: 'https://piccon.onrender.com/',
    Tag: "Design Tool",
    imageSrc: Piccon,
  },
  {
    id: "m7",
    name: "ArtisanHub",
    slug: 'artisanhub',
    description: "ArtisanHub is a comprehensive mobile platform designed to empower artisans by providing tools for business management, portfolio showcasing, job connection, and skills training.",
    website: "",
    Tag: "Mobile Platform",
    imageSrc: artisanhub      
  },
  {
    id: "m8",
    name: "Tic Tac Toe",
    slug: 'tictactoe',
    description: "Tic Tac Toe game is a simple and fun game that can be played by two players via local mode or online mode. It is a game of strategy and skill, and it is a great way to pass the time.",
    website: "https://xo-game-a1z0.onrender.com",
    Tag: "Game",
    imageSrc: xo      
  },
  {
    id: "m2",
    name: "Adboöks",
    slug: 'adbooks',
    description: "Adboöks operates as a subsidiary of Adlife, specializing in the sale of captivating romance novels. Their website is dedicated to showcasing and offering the top 10 romance books. The website seamlessly integrates the branding of their parent company.",
    website: "https://adbook.onrender.com/",
    Tag: "E-Commerce",
    imageSrc: Adbook,
  },
  {
    id: "m3",
    name: "Kadee",
    slug: 'kadee',
    description: "Your stylish online boutique for both men and women. Discover the latest trends with easy login, detailed product pages, and a user-friendly cart. Shop effortlessly on any device. Join us for a hassle-free fashion experience where style meets convenience.",
    website: "https://kadee.onrender.com/",
    Tag: "Boutique",
    imageSrc: kadee,
  },
  {
    id: "m4",
    name: "Static Exchnge",
    slug: 'staticexchnge',
    description: "Your premier decentralized crypto platform. Trade, earn, and win on this secure, user-friendly space. Explore various cryptocurrencies and lucrative earning opportunities. Join contests for stellar crypto rewards.",
    website: "https://static-exchnge.onrender.com/",
    Tag: "Crypto",
    imageSrc: Exchnge,
  },
  {
    id: "m5",
    name: "Kehad Quote Generator",
    slug: 'quotegenerator',
    description: "Kehad Quote Generator is a dynamic and inspiring website designed to inject a spark of wisdom, motivation, and reflection into your daily life. QuoteSpark delivers an endless stream of randomly generated quotes.",
    website: "https://kehad-quotes-generator.onrender.com/",
    Tag: "Utility",
    imageSrc: QuoteGen,
  },
  {
    id: "m9",
    name: "Kehad Calculator",
    slug: 'calculator',
    description: "Kehad Calculator is a versatile and user-friendly online calculator website designed to meet all your calculation needs, with basic arithmetic. Whether you're a student, professional, or anyone in need of quick calculations.",
    website: "https://kehad-calculator.onrender.com/",
    Tag: "Utility",
    imageSrc: KehadCalc,
  }
];

export default function ExperienceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const triggerCooldown = () => {
      isTransitioning.current = true;
      setTimeout(() => {
        isTransitioning.current = false;
      }, 700); // 700ms cooldown to ensure smooth single-step transition
    };

    const handleWheel = (e: WheelEvent) => {
      // Prevent standard browser scroll so we fully capture the slide transition
      e.preventDefault();

      if (isTransitioning.current) return;

      if (e.deltaY > 20) {
        // Scroll Down -> next project
        setActiveIndex((prev) => {
          if (prev < projectsData.length - 1) {
            triggerCooldown();
            return prev + 1;
          }
          return prev;
        });
      } else if (e.deltaY < -20) {
        // Scroll Up -> previous project
        setActiveIndex((prev) => {
          if (prev > 0) {
            triggerCooldown();
            return prev - 1;
          }
          return prev;
        });
      }
    };

    // Mobile Swipe/Touch Gesture Support
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning.current) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          // Swipe up -> next project
          setActiveIndex((prev) => {
            if (prev < projectsData.length - 1) {
              triggerCooldown();
              return prev + 1;
            }
            return prev;
          });
        } else {
          // Swipe down -> previous project
          setActiveIndex((prev) => {
            if (prev > 0) {
              triggerCooldown();
              return prev - 1;
            }
            return prev;
          });
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  const activeProject = projectsData[activeIndex];

  return (
    <div 
      ref={containerRef}
      className=" w-full fixed h-screen font-serif text-black selection:bg-black/10 overflow-hidden flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.2fr_250px_1fr] gap-8 items-center h-full max-h-[800px] z-20">
        
        {/* Left Side: Project Details */}
        <div className="flex flex-col items-start text-left space-y-6 h-full justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProject.id}-left`}
              initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start space-y-4 max-w-[380px]"
            >
              <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-sans tracking-wide uppercase text-gray-500 font-semibold">
                {activeProject.Tag}
              </span>

              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black tracking-tight leading-none">
                {activeProject.name}
              </h2>

              <p className="text-sm text-gray-600 font-sans leading-relaxed">
                {activeProject.description}
              </p>

              {activeProject.website && (
                <motion.a
                  href={activeProject.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-black text-white rounded-full font-sans text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-lg"
                >
                  View Live Project
                </motion.a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: List */}
        <div className="relative h-full flex flex-col items-center justify-center overflow-hidden">
          {/* Focal Point Indicator */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[80px] border-y border-black/5 pointer-events-none" />

          {/* Sliding list */}
          <motion.div
            animate={{ y: -activeIndex * 80 + 80 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center"
          >
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className="h-[80px] flex items-center justify-center"
              >
                <motion.span
                  animate={{
                    opacity: activeIndex === index ? 1 : 0.85,
                    scale: activeIndex === index ? 1.2 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`font-serif text-2xl lg:text-3xl whitespace-nowrap cursor-pointer transition-colors duration-300 ${
                    activeIndex === index ? "text-black font-semibold" : "text-gray-500 hover:text-gray-600"
                  }`}
                  onClick={() => {
                    if (!isTransitioning.current) {
                      setActiveIndex(index);
                    }
                  }}
                >
                  {project.name}
                </motion.span>
              </div>
            ))}
          </motion.div>

          {/* Fading Gradients */}
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#fcfaf7] to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#fcfaf7] to-transparent pointer-events-none z-10" />
        </div>

        {/* Right Side: Project Image */}
        <div className="flex flex-col items-center justify-center h-full px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProject.id}-right`}
              initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl shadow-2xl bg-gray-100 border border-black/5"
            >
              <motion.img
                src={typeof activeProject.imageSrc === 'string' ? activeProject.imageSrc : (activeProject.imageSrc as any).src || activeProject.imageSrc}
                alt={`${activeProject.name} showcase`}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
