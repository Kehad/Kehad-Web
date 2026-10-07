export const PORTFOLIO_KNOWLEDGE = {
  name: "Kehinde Adigun (Kehad)",
  title: "Full Stack Web Developer & 3D Web Specialist",
  email: "keahnney01@gmail.com",
  socials: {
    twitter: "https://twitter.com/devKehad",
    github: "https://github.com/Kehad",
    linkedin: "https://linkedin.com/in/kehinde-adigun"
  },
  bio: "Full Stack Web Developer dedicated to crafting immersive digital experiences and robust back-end systems.",
  stats: {
    projectsCompleted: "20+",
    yearsExperience: "5+ Years"
  },
  techPhilosophy: "Architecture first, syntax second. Writing code that isn't just functional, but maintainable and elegant.",
  globalReach: "Working with clients across time zones with clear communication and asynchronous work.",
  futureVision: "Constantly exploring emerging tech like Web3, AI integration, and performant 3D web graphics.",
  services: [
    {
      name: "Frontend Engineering",
      tech: ["React / Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
      description: "Building scalable, high-performance web applications with React, Next.js, and TypeScript. Bridging the gap between design and robust architecture."
    },
    {
      name: "3D Web Development",
      tech: ["Three.js", "React Three Fiber (R3F)", "WebGL", "Blender"],
      description: "Elevating digital experiences with immersive browser-based 3D environments, interactive workstations, and dynamic landing pages."
    },
    {
      name: "UI / UX Design",
      tech: ["Figma", "Framer Motion", "Dark Mode", "Glassmorphism", "Prototyping"],
      description: "Crafting intuitive and visually striking interfaces with dark themes, glassmorphism, dynamic animations, and functional design systems."
    }
  ],
  skills: {
    frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
    threeD: ["Three.js", "React Three Fiber", "WebGL", "Blender 3D"],
    mobileAndBackend: ["React Native", "Node.js", "Express.js", "REST APIs", "Python"],
    tools: ["Vite", "Git", "GitHub", "EmailJS"]
  },
  experience: [
    {
      company: "QUIDROP",
      role: "Mobile Application Developer",
      duration: "Jan 2025 - Dec 2025",
      skills: ["React Native", "TypeScript", "Next.js", "Node.js", "Tailwind"],
      highlights: [
        "Collaborated with backend developers to integrate APIs for dynamic data management.",
        "Developed the Quidrop interface ensuring a seamless user experience across mobile & web.",
        "Worked with UI/UX designers and optimized website performance and load times.",
        "Ensured cross-browser compatibility and responsive design."
      ]
    },
    {
      company: "LOKATALENT",
      role: "Junior Frontend Developer (Contract)",
      duration: "Aug 2024 - Jan 2025",
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
      highlights: [
        "Built dashboards for users and service providers.",
        "Collaborated with backend developers for API integrations and third-party API services.",
        "Worked with UI/UX designers for responsive, visually appealing interfaces."
      ]
    },
    {
      company: "CR8IVITI",
      role: "Web Developer Intern",
      duration: "July 2023 - Aug 2024",
      skills: ["HTML5", "CSS3", "JavaScript", "React"],
      highlights: [
        "Created custom websites using HTML, CSS, and JavaScript.",
        "Collaborated with web designers to match visual design intent.",
        "Designed web pages to enhance branding and navigation."
      ]
    }
  ],
  projects: [
    {
      name: "TaxNaija",
      tag: "Tax & Finance",
      website: "https://taxnaija.onrender.com/",
      description: "Specialized tax calculator and compliance platform built for Nigeria's 2026 tax reforms. Helps individuals and businesses estimate tax liability and statutory deductions."
    },
    {
      name: "Piccon",
      tag: "Design Tool",
      website: "https://piccon.onrender.com/",
      description: "Design and logo originality verification platform. Checks uniqueness against database algorithms to prevent copyright issues."
    },
    {
      name: "ArtisanHub",
      tag: "Mobile Platform",
      website: "",
      description: "Mobile platform empowering artisans with business management tools, portfolio showcasing, job connections, and skills training."
    },
    {
      name: "Tic Tac Toe",
      tag: "Game",
      website: "https://xo-game-a1z0.onrender.com",
      description: "Strategy game playable via local mode or online multiplayer mode."
    },
    {
      name: "Adboöks",
      tag: "E-Commerce",
      website: "https://adbook.onrender.com/",
      description: "Subsidiary of Adlife specializing in selling top romance novels with parent company brand integration."
    },
    {
      name: "Kadee",
      tag: "Boutique",
      website: "https://kadee.onrender.com/",
      description: "Stylish online fashion boutique for men and women with user-friendly cart and detailed product pages."
    },
    {
      name: "Static Exchnge",
      tag: "Crypto",
      website: "https://static-exchnge.onrender.com/",
      description: "Decentralized crypto platform to trade, earn, and enter reward contests."
    },
    {
      name: "Kehad Quote Generator",
      tag: "Utility",
      website: "https://kehad-quotes-generator.onrender.com/",
      description: "Dynamic motivation website delivering randomized quotes for daily reflection."
    },
    {
      name: "Kehad Calculator",
      tag: "Utility",
      website: "https://kehad-calculator.onrender.com/",
      description: "Versatile online calculator for quick arithmetic and daily calculations."
    }
  ],
  contactInfo: "Email: keahnney01@gmail.com | GitHub: github.com/Kehad | LinkedIn: linkedin.com/in/kehinde-adigun | Twitter: @devKehad"
};

export const SYSTEM_PROMPT = `
You are Kehad's AI Portfolio Assistant embedded in Kehinde Adigun's developer portfolio.

CRITICAL DIRECTIVES:
1. ALWAYS be extremely short, direct, and straight to the point (1-3 sentences or 2-4 brief bullet points maximum).
2. Avoid unnecessary fluff, long intros, or warmups. Deliver the facts immediately.
3. If asked off-topic questions (e.g., general math, sports, weather), reply in 1 line: "I only answer questions about Kehinde's portfolio, skills, and projects."
4. Use bold text and clean formatting for quick scannability.

FULL KNOWLEDGE BASE:
- Name: ${PORTFOLIO_KNOWLEDGE.name}
- Title/Role: ${PORTFOLIO_KNOWLEDGE.title}
- Contact: ${PORTFOLIO_KNOWLEDGE.contactInfo}
- Bio & Stats: ${PORTFOLIO_KNOWLEDGE.bio} (${PORTFOLIO_KNOWLEDGE.stats.yearsExperience}, ${PORTFOLIO_KNOWLEDGE.stats.projectsCompleted} projects completed).
- Philosophy: ${PORTFOLIO_KNOWLEDGE.techPhilosophy}
- Skills:
  * Frontend: ${PORTFOLIO_KNOWLEDGE.skills.frontend.join(", ")}
  * 3D Web: ${PORTFOLIO_KNOWLEDGE.skills.threeD.join(", ")}
  * Mobile/Backend: ${PORTFOLIO_KNOWLEDGE.skills.mobileAndBackend.join(", ")}
  * Tools: ${PORTFOLIO_KNOWLEDGE.skills.tools.join(", ")}
- Work Experience:
${PORTFOLIO_KNOWLEDGE.experience.map(e => `  * ${e.role} at ${e.company} (${e.duration}): Tech: ${e.skills.join(", ")}. Highlights: ${e.highlights.join("; ")}`).join("\n")}
- Projects Portfolio:
${PORTFOLIO_KNOWLEDGE.projects.map(p => `  * ${p.name} (${p.tag}): ${p.description} ${p.website ? `[Live: ${p.website}]` : ""}`).join("\n")}
- Services Offered:
${PORTFOLIO_KNOWLEDGE.services.map(s => `  * ${s.name}: ${s.description} (Tech: ${s.tech.join(", ")})`).join("\n")}
`;

