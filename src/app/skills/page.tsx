/* eslint-disable react/prop-types */
"use client";
import { useState, useRef } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import cv2 from "@/assets/Kehinde-Adigun-Resume.jpg";
import cv from "@/assets/Kehinde-Adigun-Resume.jpg";

import SkillsList, { frontendSkills, backendSkills, otherSkills } from "./modal/skillsList";
import TransitionMovement from "@/components/others/transitionMovement";
// const ee = 

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Image as ImageIcon, Layout, Database, Layers } from "lucide-react";

const Skills = function () {
  const [inMenu, setInMenu] = useState(false);

  



  // for the list element using the download resume button
  const pdfResume = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.download = "Kehinde Gabriel Adigun CV";
    link.href = cv.src;
    link.click();

    setInMenu(false);
  };
  const imgResume = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("Download Img resume");
    const link = document.createElement("a");
    link.download = "Kehinde Gabriel Adigun CV";
    link.href = cv2.src;
    link.click();

    setInMenu(false);
  };

  const showDownloadOptions = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    setInMenu((state) => !state);
  };
  const hideDownloadOptions = () => {
    setInMenu(false);
  };

  return (
    <TransitionMovement onClick={hideDownloadOptions}>
      <div className="flex flex-col gap-3 mb-12">
        <h1 className="font-judson text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-500 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight drop-shadow-sm">
          My Skills
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg font-medium max-w-2xl">
          The comprehensive list of tools, languages, and frameworks I leverage to design and develop robust user experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-8 lg:gap-10 w-[95%] lg:w-full">
        {/* Frontend Section Card */}
        <div className="flex flex-col w-full p-6 sm:p-8 rounded-[2rem] bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
          <div className="absolute -top-[10%] -right-[10%] w-32 h-32 bg-primary/20 rounded-full blur-[3rem] group-hover:bg-primary/30 transition-all duration-700 pointer-events-none"></div>
          
          <h2 className="font-judson mb-6 text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl font-bold border-b border-gray-200 dark:border-gray-800/80 pb-4 relative z-10 flex items-center gap-3">
            <Layout className="w-8 h-8 text-primary shadow-sm" />
            Frontend
          </h2>
          <div className="skillsList__item flex flex-col gap-4 relative z-10">
            {frontendSkills.map((item) => (
              <SkillsList key={item.id} name={item.name} link={item.link} />
            ))}
          </div>
        </div>

        {/* Backend Section Card */}
        <div className="flex flex-col w-full p-6 sm:p-8 rounded-[2rem] bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
          <div className="absolute -top-[10%] -right-[10%] w-32 h-32 bg-primary/20 rounded-full blur-[3rem] group-hover:bg-primary/30 transition-all duration-700 pointer-events-none"></div>
          
          <h2 className="font-judson mb-6 text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl font-bold border-b border-gray-200 dark:border-gray-800/80 pb-4 relative z-10 flex items-center gap-3">
            <Database className="w-8 h-8 text-primary shadow-sm" />
            Backend
          </h2>
          <div className="skillsList__item flex flex-col gap-4 relative z-10">
            {backendSkills.map((item) => (
              <SkillsList key={item.id} name={item.name} link={item.link} />
            ))}
          </div>
        </div>

        {/* Others Section Card */}
        <div className="flex flex-col w-full p-6 sm:p-8 rounded-[2rem] bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
          <div className="absolute -top-[10%] -right-[10%] w-32 h-32 bg-primary/20 rounded-full blur-[3rem] group-hover:bg-primary/30 transition-all duration-700 pointer-events-none"></div>
          
          <h2 className="font-judson mb-6 text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl font-bold border-b border-gray-200 dark:border-gray-800/80 pb-4 relative z-10 flex items-center gap-3">
            <Layers className="w-8 h-8 text-primary shadow-sm" />
            Others
          </h2>
          <div className="skillsList__item flex flex-col gap-4 relative z-10">
            {otherSkills.map((item) => (
              <SkillsList key={item.id} name={item.name} link={item.link} />
            ))}
          </div>
        </div>
      </div>

      <div className="skills__button relative mt-8 flex flex-col sm:flex-col md:flex-col md:gap-2">
        <button
          className="flex justify-between items-center w-max gap-4 py-4 px-6 border rounded-full transition-all duration-500 font-bold bg-primary text-black text-base sm:text-base lg:text-3xl border-primary cursor-pointer group hover:text-primary hover:border-primary hover:bg-transparent"
          onClick={showDownloadOptions}
        >
          Download Resume
          <span className="custom-selet-wapper white flex flex-col">
            {inMenu ? (
              <svg // arrow up
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
                fill="black"
                className="group-hover:fill-primary"
                xmlns="http://www.w3.org/2000/svg"
              // className="fill-black"
              >
                <path
                  d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                // fill="black"
                // className="fill-black"
                />
              </svg>
            ) : (
              <svg // arrow down
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
                fill="#000"
                className="group-hover:fill-primary"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                  // fill="green"
                  className="text-yellow"
                />
              </svg>
            )}
          </span>
        </button>

        <AnimatePresence>
          {inMenu && (
            <motion.div
              key="download-dropdown"
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 z-50 mt-4 origin-top-left"
            >
              <ul className="w-[280px] p-3 flex flex-col gap-2 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden font-judson text-xl">
                <li
                  className="flex items-center gap-4 p-4 cursor-pointer rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary transition-all duration-300"
                  onClick={pdfResume}
                >
                  <FileText className="w-6 h-6" />
                  <span className="font-semibold">Download PDF</span>
                </li>
                <li
                  className="flex items-center gap-4 p-4 cursor-pointer rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary transition-all duration-300"
                  onClick={imgResume}
                >
                  <ImageIcon className="w-6 h-6" />
                  <span className="font-semibold">Download Image</span>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TransitionMovement>
  );
};

export default Skills;
