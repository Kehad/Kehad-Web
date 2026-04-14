import React from 'react';
import Image from 'next/image';

import taxnaija from '../../assets/taxnaija.png';
import Piccon from '../../assets/Piccon.png';
import artisanhub from '../../assets/artisanhub.png';
import xo from '../../assets/xo.png';
import Adbook from '../../assets/Adbook.png';
import kadee from '../../assets/kadee.png';
import Exchnge from '../../assets/static-exchnge.png';
import QuoteGen from '../../assets/quote-generator.png';
import KehadCalc from '../../assets/kehad-calc.png';

const projectsData = [
  {
    id: 'm6',
    name: 'TaxNaija',
    description: "TaxNaija is a specialized tax calculator and compliance platform built for Nigeria's 2026 tax reforms. It helps individuals and businesses instantly estimate their tax liability, apply statutory deductions (like rent and pension), and understand their effective tax rates under the new laws.",
    website: 'https://taxnaija.onrender.com/',
    Tag: "Tax & Finance",
    imageSrc: taxnaija,
  },
  {
    id: 'm1',
    name: 'Piccon',
    description: "Piccon is your go-to platform for comparing designs and logos to check for originality. Easily upload your designs and verify their uniqueness against a comprehensive database. Our advanced algorithms ensure accurate and reliable results, helping you avoid copyright issues.",
    website: 'https://piccon.onrender.com/',
    Tag: "Design Tool",
    imageSrc: Piccon,
  },
  {
    id: "m7",
    name: "ArtisanHub",
    description: "ArtisanHub is a comprehensive mobile platform designed to empower artisans by providing tools for business management, portfolio showcasing, job connection, and skills training.",
    website: "",
    Tag: "Mobile Platform",
    imageSrc: artisanhub      
  },
  {
    id: "m8",
    name: "Tic Tac Toe",
    description: "Tic Tac Toe game is a simple and fun game that can be played by two players via local mode or online mode. It is a game of strategy and skill, and it is a great way to pass the time.",
    website: "https://xo-game-a1z0.onrender.com",
    Tag: "Game",
    imageSrc: xo      
  },
  {
    id: "m2",
    name: "Adboöks",
    description: "Adboöks operates as a subsidiary of Adlife, specializing in the sale of captivating romance novels. Their website is dedicated to showcasing and offering the top 10 romance books. The website seamlessly integrates the branding of their parent company.",
    website: "https://adbook.onrender.com/",
    Tag: "E-Commerce",
    imageSrc: Adbook,
  },
  {
    id: "m3",
    name: "Kadee",
    description: "Your stylish online boutique for both men and women. Discover the latest trends with easy login, detailed product pages, and a user-friendly cart. Shop effortlessly on any device. Join us for a hassle-free fashion experience where style meets convenience.",
    website: "https://kadee.onrender.com/",
    Tag: "Boutique",
    imageSrc: kadee,
  },
  {
    id: "m4",
    name: "Static Exchnge",
    description: "Your premier decentralized crypto platform. Trade, earn, and win on this secure, user-friendly space. Explore various cryptocurrencies and lucrative earning opportunities. Join contests for stellar crypto rewards.",
    website: "https://static-exchnge.onrender.com/",
    Tag: "Crypto",
    imageSrc: Exchnge,
  },
  {
    id: "m5",
    name: "Kehad Quote Generator",
    description: "Kehad Quote Generator is a dynamic and inspiring website designed to inject a spark of wisdom, motivation, and reflection into your daily life. QuoteSpark delivers an endless stream of randomly generated quotes.",
    website: "https://kehad-quotes-generator.onrender.com/",
    Tag: "Utility",
    imageSrc: QuoteGen,
  },
  {
    id: "m9",
    name: "Kehad Calculator", 
    description: "Kehad Calculator is a versatile and user-friendly online calculator website designed to meet all your calculation needs, with basic arithmetic. Whether you're a student, professional, or anyone in need of quick calculations.",
    website: "https://kehad-calculator.onrender.com/",
    Tag: "Utility",
    imageSrc: KehadCalc,
  }
];

export default function ProjectsSection() {
  return (
    <section className="w-full max-w-[1300px] mx-auto px-6 py-20 z-10 relative">
      <div className="text-center mb-16 drop-shadow-lg relative">
        <h2 className="text-[4rem] sm:text-[5rem] md:text-[6rem] font-black text-white tracking-tighter mb-2 leading-none relative z-10" style={{ textShadow: '0 4px 20px rgba(255,255,255,0.05)' }}>Projects</h2>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] sm:w-[600px] sm:h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div key={project.id} className="bg-[#0c101a] border border-gray-800 rounded-[1.25rem] overflow-hidden group hover:border-gray-600 transition duration-300 shadow-xl flex flex-col cursor-none">
            <div className="h-56 sm:h-64 overflow-hidden relative bg-[#111622] shrink-0">
              <Image 
                src={project.imageSrc} 
                alt={project.name} 
                fill
                className="object-cover object-top group-hover:scale-105 transition duration-700 ease-in-out opacity-90 group-hover:opacity-100" 
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition">{project.name}</h3>
              <div className="mb-4">
                <span className="inline-block bg-white text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm tracking-wide">{project.Tag}</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="mt-auto pointer-events-auto">
                {project.website ? (
                  <a 
                    href={project.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex flex-row items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-400 font-extrabold text-xs px-4 py-2.5 rounded-full hover:bg-blue-500/20 hover:border-blue-500/50 transition-colors shadow-sm"
                  >
                    View Project
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 border border-gray-700 bg-gray-800/50 text-gray-400 font-extrabold text-xs px-4 py-2.5 rounded-full shadow-sm">
                    In Development
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
