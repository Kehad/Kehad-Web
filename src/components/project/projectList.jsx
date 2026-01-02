/* eslint-disable react/jsx-key */
import { useState } from 'react';

import Piccon from '../../assets/Piccon.png';
import Button from '../others/button.jsx';
import ProjectItem from './projectItem.jsx';
import kadee from "../../assets/kadee.png";
import Exchnge from "../../assets/static-exchnge.png";
import QuoteGen from "../../assets/quote-generator.png";
import KehadCalc from "../../assets/kehad-calc.png";
import { AnimatePresence, motion } from 'framer-motion';
import Adbook from "../../assets/Adbook.png";
import taxnaija from "../../assets/taxnaija.png";


const ProjectData = [
  {
    id: 'm6',
    name: 'TaxNaija',
    description:
      "TaxNaija is a specialized tax calculator and compliance platform built for Nigeria's 2026 tax reforms. It helps individuals and businesses instantly estimate their tax liability, apply statutory deductions (like rent and pension), and understand their effective tax rates under the new laws.",
    website: 'https://taxnaija.onrender.com/',
    imageSrc: taxnaija,
  },
  {
    id: 'm1',
    name: 'Piccon',
    description:
      "Piccon is your go-to platform for comparing designs and logos to check for originality. Easily upload your designs and verify their uniqueness against a comprehensive database. Our advanced algorithms ensure accurate and reliable results, helping you avoid copyright issues. With a user-friendly interface, you can navigate and compare effortlessly. Protect your creativity and ensure your designs stand out with PicCon..",
    website: 'https://piccon.onrender.com/',
    imageSrc: Piccon,
  },
   {
    id: "m2",
    name: "Adboöks",
    description:
      "Adboöks operates as a subsidiary of Adlife, specializing in the sale of captivating romance novels. Their website is dedicated to showcasing and offering the top 10 romance books. The website seamlessly integrates the branding of their parent company, 'Adlife,' ensuring a cohesive and recognizable experience for our visitors.",
    website: "https://adbook.onrender.com/",
    imageSrc: Adbook,
  },
  {
    id: "m3",
    name: "Kadee",
    description:
      "Your stylish online boutique for both men and women. Discover the latest trends with easy login, detailed product pages, and a user-friendly cart. Shop effortlessly on any device. Join us for a hassle-free fashion experience where style meets convenience.",
    website: "https://kadee.onrender.com/",
    imageSrc: kadee,
  },
   {
      id: "m4",
      name: "Static Exchnge",
      description:
        "Your premier decentralized crypto platform. Trade, earn, and win on this secure, user-friendly space. Explore various cryptocurrencies and lucrative earning opportunities. Join contests for stellar crypto rewards. Embark on an interstellar journey of financial possibilities today!",
      website: "https://static-exchnge.onrender.com/",
      imageSrc: Exchnge,
    },
    {
      id: "m5",
      name: "Kehad Quote Generator", // Quote park
      description:
        "Kehad Quote Generator is a dynamic and inspiring website designed to inject a spark of wisdom, motivation, and reflection into your daily life. Whether you're seeking a boost of positivity, a moment of contemplation, or a dash of humor, QuoteSpark delivers an endless stream of randomly generated quotes from a vast collection of timeless sayings by notable authors, philosophers, celebrities, and everyday people..",
      website: "https://kehad-quotes-generator.onrender.com/",
      imageSrc: QuoteGen,
    },
    {
      id: "m6",
      name: "Kehad Calculator", // Quote park
      description:
        "Kehad Calculator is a versatile and user-friendly online calculator website designed to meet all your calculation needs, with basic arithmetic. Whether you're a student, professional, or anyone in need of quick and accurate calculations, Kehad Calculator is your go-to resource.",
      website: "https://kehad-calculator.onrender.com/",
      imageSrc: KehadCalc,
    },
  // {
  //   id: 'm2',
  //   name: 'Wondabite',
  //   description:
  //     "Welcome to WondaBite, your go-to online store for a delightful variety of snacks! Whether you're craving something sweet, savory, or healthy, WondaBite has it all. Our user-friendly website allows you to easily browse through a wide selection of snacks, add your favorites to a personalized list, and conveniently add items to your cart for a seamless shopping experience. Enjoy exclusive deals, read customer reviews, and get your favorite snacks delivered right to your doorstep with WondaBite!",
  //   website: 'https://wondabite.onrender.com/',
  //   imageSrc: wondabite,
  // },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};
const ProjectList = function () {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextElement = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ProjectData.length);
  };

  const prevElement = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + ProjectData.length) % ProjectData.length
    );
  };
 
  console.log(currentIndex);

  return (
    <div className="md:relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={ProjectData[currentIndex].id}
          variants={variants}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
        <ProjectItem
          key={ProjectData[currentIndex].id}
          id={ProjectData[currentIndex].id}
          name={ProjectData[currentIndex].name}
          description={ProjectData[currentIndex].description}
          website={ProjectData[currentIndex].website}
          imageSrc={ProjectData[currentIndex].imageSrc}
          next={nextElement}
          back={prevElement}
          />
          </motion.div>
      </AnimatePresence>

      <div
        className="nextEl hidden sm:hidden md:block md:block"
        onClick={() => nextElement()}
      >
        &#9654;
      </div>
      <div
        className="prevEl hidden sm:hidden md:block md:block"
        onClick={() => prevElement()}
      >
        &#9664;
      </div>

      <div className="flex items-center justify-between">
        <Button
          link={ProjectData[currentIndex].website}
          target={"_blank"}
          name={"Visit Website"}
        />
        <div className="flex sm:flex md:hidden lg:hidden">
          <div className="prevEl-mobile" onClick={() => prevElement()}>
            &#9664;
          </div>
          <div className="nextEl-mobile" onClick={() => nextElement()}>
            &#9654;
          </div>
        </div>
      </div>
      {/* <Pagination back={handleBackClick} next={handleBackClick} /> */}
    </div>
  );

};

export default ProjectList;
