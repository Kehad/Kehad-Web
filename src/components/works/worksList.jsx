import  { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// import classes from './worksList.module.css';
import WorksItem from "./worksItem.jsx";

import tenminuteslegal from "../../assets/10minuteslegal.png";
import lokatalent from "../../assets/lokatalent.png";
import Button from "../others/button";

// import MobilePagination from "../Paginations/mobilePagination";
// import DesktopPagination from '../Paginations/desktopPaginaton';
// import

const worksData = [
  {
    id: "m1",
    name: "10minuteslegal",
    description:
      "10minuteslegal is a platform that focuses on providing simplified, accessible legal information, likely aimed at helping users understand legal concepts or complete legal tasks efficiently without the need for extensive research or expensive consultations",
    website: "https://10minuteslegal.com/",
    imageSrc: tenminuteslegal,
  },
  {
    id: "m2",
    name: "Lokatalent",
    description:
      "Lokatalent is a platform that focuses on providing simplified, accessible legal information, likely aimed at helping users understand legal concepts or complete legal tasks efficiently without the need for extensive research or expensive consultations",
    website: "https://lokatalent.com/",
    imageSrc: lokatalent,
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
const WorkList = function () {
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
