import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// import classes from './worksList.module.css';
import WorksItem from "./worksItem.jsx";
import Pagination from "./pagination.jsx";

import Adbook from "../../assets/Adbook.png";
import kadee from "../../assets/kadee.png";
import Exchnge from "../../assets/static-exchnge.png";
import QuoteGen from "../../assets/quote-generator.png";
import KehadCalc from "../../assets/kehad-calc.png";
import Button from "../others/button";

// import MobilePagination from "../Paginations/mobilePagination";
// import DesktopPagination from '../Paginations/desktopPaginaton';
// import

const worksData = [
  {
    id: "m1",
    name: "Adboöks",
    description:
      "Adboöks operates as a subsidiary of Adlife, specializing in the sale of captivating romance novels. Their website is dedicated to showcasing and offering the top 10 romance books. The website seamlessly integrates the branding of their parent company, 'Adlife,' ensuring a cohesive and recognizable experience for our visitors.",
    website: "https://adbook.onrender.com/",
    imageSrc: Adbook,
  },
  {
    id: "m2",
    name: "Kadee",
    description:
      "Your stylish online boutique for both men and women. Discover the latest trends with easy login, detailed product pages, and a user-friendly cart. Shop effortlessly on any device. Join us for a hassle-free fashion experience where style meets convenience.",
    website: "https://kadee.onrender.com/",
    imageSrc: kadee,
  },
  {
    id: "m3",
    name: "Static Exchnge",
    description:
      "Your premier decentralized crypto platform. Trade, earn, and win on this secure, user-friendly space. Explore various cryptocurrencies and lucrative earning opportunities. Join contests for stellar crypto rewards. Embark on an interstellar journey of financial possibilities today!",
    website: "https://static-exchnge.onrender.com/",
    imageSrc: Exchnge,
  },
  {
    id: "m4",
    name: "Kehad Quote Generator", // Quote park
    description:
      "Kehad Quote Generator is a dynamic and inspiring website designed to inject a spark of wisdom, motivation, and reflection into your daily life. Whether you're seeking a boost of positivity, a moment of contemplation, or a dash of humor, QuoteSpark delivers an endless stream of randomly generated quotes from a vast collection of timeless sayings by notable authors, philosophers, celebrities, and everyday people..",
    website: "https://kehad-quotes-generator.onrender.com/",
    imageSrc: QuoteGen,
  },
  {
    id: "m5",
    name: "Kehad Calculator", // Quote park
    description:
      "Kehad Calculator is a versatile and user-friendly online calculator website designed to meet all your calculation needs, with basic arithmetic. Whether you're a student, professional, or anyone in need of quick and accurate calculations, Kehad Calculator is your go-to resource.",
    website: "https://kehad-calculator.onrender.com/",
    imageSrc: KehadCalc,
  },
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
const WorkList = function (props) {


  const [currentIndex, setCurrentIndex] = useState(0);

  const nextElement = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % worksData.length);
  };

  const prevElement = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + worksData.length) % worksData.length
    );
  };

  return (
    <div className="md:relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={worksData[currentIndex].id}
          variants={variants}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <WorksItem
            key={worksData[currentIndex].id}
            id={worksData[currentIndex].id}
            name={worksData[currentIndex].name}
            description={worksData[currentIndex].description}
            website={worksData[currentIndex].website}
            imageSrc={worksData[currentIndex].imageSrc}
            next={nextElement}
            prev={prevElement}
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
          link={worksData[currentIndex].website}
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

      {/* <Pagination next={nextElement} back={prevElement} /> */}
    </div>
  );
};

export default WorkList;
