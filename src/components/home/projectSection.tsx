"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { SuspenseImage } from "../others/SuspenseImage";

import taxnaija from "../../assets/taxnaija.png";
import Piccon from "../../assets/Piccon.png";
import artisanhub from "../../assets/artisanhub.png";
import xo from "../../assets/xo.png";
import Adbook from "../../assets/Adbook.png";
import kadee from "../../assets/kadee.png";
import Exchnge from "../../assets/static-exchnge.png";
import QuoteGen from "../../assets/quote-generator.png";
import KehadCalc from "../../assets/kehad-calc.png";

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  Tag: string;
  imageSrc: string | { src: string } | any;
}

const projectsData: Project[] = [
  {
    id: "m6",
    name: "TaxNaija",
    slug: "taxnaija",
    description:
      "TaxNaija is a specialized tax calculator and compliance platform built for Nigeria's 2026 tax reforms. It helps individuals and businesses instantly estimate their tax liability, apply statutory deductions (like rent and pension), and understand their effective tax rates under the new laws.",
    website: "https://taxnaija.onrender.com/",
    Tag: "Tax & Finance",
    imageSrc: taxnaija,
  },
  {
    id: "m1",
    name: "Piccon",
    slug: "piccon",
    description:
      "Piccon is your go-to platform for comparing designs and logos to check for originality. Easily upload your designs and verify their uniqueness against a comprehensive database. Our advanced algorithms ensure accurate and reliable results, helping you avoid copyright issues.",
    website: "https://piccon.onrender.com/",
    Tag: "Design Tool",
    imageSrc: Piccon,
  },
  {
    id: "m7",
    name: "ArtisanHub",
    slug: "artisanhub",
    description:
      "ArtisanHub is a comprehensive mobile platform designed to empower artisans by providing tools for business management, portfolio showcasing, job connection, and skills training.",
    website: "",
    Tag: "Mobile Platform",
    imageSrc: artisanhub,
  },
  {
    id: "m8",
    name: "Tic Tac Toe",
    slug: "tictactoe",
    description:
      "Tic Tac Toe game is a simple and fun game that can be played by two players via local mode or online mode. It is a game of strategy and skill, and it is a great way to pass the time.",
    website: "https://xo-game-a1z0.onrender.com",
    Tag: "Game",
    imageSrc: xo,
  },
  {
    id: "m2",
    name: "Adboöks",
    slug: "adbooks",
    description:
      "Adboöks operates as a subsidiary of Adlife, specializing in the sale of captivating romance novels. Their website is dedicated to showcasing and offering the top 10 romance books. The website seamlessly integrates the branding of their parent company.",
    website: "https://adbook.onrender.com/",
    Tag: "E-Commerce",
    imageSrc: Adbook,
  },
  {
    id: "m3",
    name: "Kadee",
    slug: "kadee",
    description:
      "Your stylish online boutique for both men and women. Discover the latest trends with easy login, detailed product pages, and a user-friendly cart. Shop effortlessly on any device. Join us for a hassle-free fashion experience where style meets convenience.",
    website: "https://kadee.onrender.com/",
    Tag: "Boutique",
    imageSrc: kadee,
  },
  {
    id: "m4",
    name: "Static Exchnge",
    slug: "staticexchnge",
    description:
      "Your premier decentralized crypto platform. Trade, earn, and win on this secure, user-friendly space. Explore various cryptocurrencies and lucrative earning opportunities. Join contests for stellar crypto rewards.",
    website: "https://static-exchnge.onrender.com/",
    Tag: "Crypto",
    imageSrc: Exchnge,
  },
  {
    id: "m5",
    name: "Kehad Quote Generator",
    slug: "quotegenerator",
    description:
      "Kehad Quote Generator is a dynamic and inspiring website designed to inject a spark of wisdom, motivation, and reflection into your daily life. QuoteSpark delivers an endless stream of randomly generated quotes.",
    website: "https://kehad-quotes-generator.onrender.com/",
    Tag: "Utility",
    imageSrc: QuoteGen,
  },
  {
    id: "m9",
    name: "Kehad Calculator",
    slug: "calculator",
    description:
      "Kehad Calculator is a versatile and user-friendly online calculator website designed to meet all your calculation needs, with basic arithmetic. Whether you're a student, professional, or anyone in need of quick calculations.",
    website: "https://kehad-calculator.onrender.com/",
    Tag: "Utility",
    imageSrc: KehadCalc,
  },
];

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile/Tablet Pagination State
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  const displayedProjects = isMobile
    ? projectsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : projectsData;

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    projectsData.forEach((_, index) => {
      const sentinel = sentinelRefs.current[index];
      if (!sentinel) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          rootMargin: "-45% 0px -45% 0px",
          threshold: 0,
        },
      );

      observer.observe(sentinel);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const activeProject = projectsData[activeIndex];

  return (
    <>
      {/* Desktop & Large Screen View (Scrollytelling) */}
      <div className="hidden lg:block">
        <div className="w-full font-serif select-none" id="experience-section">
          {/* Sticky presentation view */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center py-12 px-4 bg-[#0B0F19] z-20">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.2fr_250px_1fr] gap-8 items-center h-full max-h-[800px]">
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
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-sans tracking-wide uppercase text-gray-300 font-semibold border border-white/5">
                      {activeProject.Tag}
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-none">
                      {activeProject.name}
                    </h2>

                    <p className="text-sm text-gray-400 font-sans leading-relaxed">
                      {activeProject.description}
                    </p>

                    {activeProject.website && (
                      <motion.a
                        href={activeProject.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-black rounded-full font-sans text-xs font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-lg"
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
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-[80px] border-y border-white/10 pointer-events-none" />

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
                          opacity: activeIndex === index ? 1 : 0.4,
                          scale: activeIndex === index ? 1.2 : 0.8,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`font-serif text-2xl lg:text-3xl whitespace-nowrap cursor-pointer transition-colors duration-300 ${
                          activeIndex === index
                            ? "text-white font-semibold"
                            : "text-gray-500 hover:text-gray-300"
                        }`}
                        onClick={() => {
                          sentinelRefs.current[index]?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }}
                      >
                        {project.name}
                      </motion.span>
                    </div>
                  ))}
                </motion.div>

                {/* Fading Gradients */}
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#0B0F19] to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none z-10" />
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
                    className="relative aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl shadow-2xl bg-white/5 border border-white/10"
                  >
                    <motion.img
                      src={
                        typeof activeProject.imageSrc === "string"
                          ? activeProject.imageSrc
                          : (activeProject.imageSrc as any).src ||
                            activeProject.imageSrc
                      }
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

          {/* Scrollable sentinels that drive the project changes */}
          <div
            ref={containerRef}
            className="relative w-full bg-[#0B0F19]"
            style={{ minHeight: "600vh" }}
          >
            {projectsData.map((_, index) => (
              <div
                key={index}
                ref={(el) => {
                  sentinelRefs.current[index] = el;
                }}
                className="relative w-full h-[66vh] flex items-center justify-center border-b border-white/5"
              >
                <div className="text-center">
                  <h3 className="text-2xl text-gray-500">
                    {projectsData[index].name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Scroll to see this project
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet View (Grid with Pagination) */}
      <div className="block lg:hidden">
        <section
          className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 py-16 sm:py-20 z-10 relative"
          id="projects-mobile"
        >
          <div className="text-center mb-8 sm:mb-16 drop-shadow-lg relative">
            <h2
              className="text-[3.2rem] sm:text-[5rem] md:text-[6rem] font-black text-gray-900 dark:text-white tracking-tighter mb-2 leading-none relative z-10 hover:scale-110 hover:text-shadow-[0_1rem_2rem_rgba(0,0,0,0.4)] hover:rotate-4 "
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
            >
              Projects
            </h2>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[140px] sm:w-[600px] sm:h-[300px] bg-black/5 dark:bg-white/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "circInOut" }}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8"
            >
              {displayedProjects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer h-full"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700 grid group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* === FRONT FACE === */}
                    <div
                      className="col-start-1 row-start-1 w-full h-full bg-white dark:bg-[#0c101a] border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-[1.25rem] overflow-hidden shadow-xl flex flex-col"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div className="h-32 sm:h-56 md:h-64 overflow-hidden relative bg-gray-100 dark:bg-[#111622] shrink-0 border-b border-gray-100 dark:border-transparent">
                        <React.Suspense
                          fallback={
                            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse w-full h-full" />
                          }
                        >
                          <SuspenseImage
                            src={project.imageSrc}
                            alt={project.name}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          />
                        </React.Suspense>
                        <div className="absolute inset-0 bg-black/5 dark:bg-transparent transition-colors duration-500"></div>
                      </div>
                      <div className="p-3 sm:p-5 md:p-6 lg:p-8 flex items-center justify-between flex-grow">
                        <div className="min-w-0 pr-2">
                          <h3 className="text-sm sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight truncate">
                            {project.name}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-sm mt-0.5 sm:mt-1.5 font-semibold tracking-wide truncate">
                            {project.Tag}
                          </p>
                        </div>
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gray-50 dark:bg-gray-800/80 flex items-center justify-center shrink-0 shadow-sm border border-gray-200 dark:border-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                          <svg
                            className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* === BACK FACE === */}
                    <div
                      className="col-start-1 row-start-1 w-full h-full bg-white dark:bg-[#0c101a] border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-[1.25rem] overflow-hidden shadow-xl flex flex-col p-3 sm:p-5 md:p-6 lg:p-8"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <h3 className="text-sm sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate">
                          {project.name}
                        </h3>
                        <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-extrabold text-[8px] sm:text-xs px-2 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full shadow-sm tracking-wide w-fit">
                          {project.Tag}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-sm mb-4 sm:mb-6 flex-grow leading-snug sm:leading-relaxed overflow-hidden text-ellipsis line-clamp-4 sm:line-clamp-none">
                        {project.description}
                      </p>

                      <div className="mt-auto pointer-events-auto">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 w-full border border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold text-[10px] sm:text-sm px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:border-blue-500/50 transition-colors shadow-sm"
                        >
                          <span className="hidden sm:inline">
                            View Project Detail
                          </span>
                          <span className="sm:hidden">View</span>
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination UI for Mobile */}
          {totalPages > 1 && (
            <div className="mb-6 mt-8 flex flex-col items-center gap-4 relative z-20">
              {/* Progress Indicators */}
              <div className="flex gap-1.5 mb-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === idx + 1 ? "w-6 bg-white dark:bg-blue-400" : "w-4 bg-gray-300 dark:bg-gray-700"}`}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center px-4 py-2 rounded-xl border font-bold text-xs tracking-wider transition-all
                    ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 border-gray-200 dark:bg-[#1a202c] dark:text-gray-600 dark:border-gray-800 cursor-not-allowed"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 dark:bg-[#252f40] dark:text-gray-200 dark:border-gray-700 active:scale-95 shadow-sm"
                    }`}
                >
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  PREV
                </button>

                <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-widest uppercase">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center px-4 py-2 rounded-xl border font-bold text-xs tracking-wider transition-all
                    ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 border-gray-200 dark:bg-[#1a202c] dark:text-gray-600 dark:border-gray-800 cursor-not-allowed"
                        : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 dark:border-blue-500 active:scale-95 shadow-md shadow-blue-500/20"
                    }`}
                >
                  NEXT
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
