// ==========================================================================
// Kehinde Adigun (Kehad) - Featured Projects Showcase Data
// Configured for dynamic rendering via JavaScript loop
// ==========================================================================

const taxnaija = '/projects/taxnaija.png';
const Piccon = '/projects/Piccon.png';
const artisanhub = '/projects/artisanhub.png';
const xo = '/projects/xo.png';
const Adbook = '/projects/Adbook.png';
const kadee = '/projects/kadee.png';
const Exchnge = '/projects/static-exchnge.png';
const QuoteGen = '/projects/quote-generator.png';
const KehadCalc = '/projects/kehad-calc.png';

export const projectsData = [
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

// Map projectsData with step properties for complete template compatibility
export const seoGeoSteps = projectsData.map((project, index) => ({
  ...project,
  stepNum: String(index + 1).padStart(2, '0'),
  title: project.name,
  text: project.description,
  image: project.imageSrc,
  alt: `${project.name} - ${project.Tag}`,
  tags: [project.Tag],
}));
