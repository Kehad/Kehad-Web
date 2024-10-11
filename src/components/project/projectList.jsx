/* eslint-disable react/jsx-key */
import React, { useState } from 'react';

import Piccon from '../../assets/Piccon.png';
import wondabite from '../../assets/wondabite.png';

import Button from '../others/button.jsx';
import ProjectItem from './projectItem.jsx';
import Pagination from './pagination.jsx';
import { AnimatePresence, motion } from 'framer-motion';



const ProjectData = [
  {
    id: 'm1',
    name: 'Piccon',
    description:
      "Piccon is your go-to platform for comparing designs and logos to check for originality. Easily upload your designs and verify their uniqueness against a comprehensive database. Our advanced algorithms ensure accurate and reliable results, helping you avoid copyright issues. With a user-friendly interface, you can navigate and compare effortlessly. Protect your creativity and ensure your designs stand out with PicCon..",
    website: 'https://piccon.onrender.com/',
    imageSrc: Piccon,
  },
  {
    id: 'm2',
    name: 'Wondabite',
    description:
      "Welcome to WondaBite, your go-to online store for a delightful variety of snacks! Whether you're craving something sweet, savory, or healthy, WondaBite has it all. Our user-friendly website allows you to easily browse through a wide selection of snacks, add your favorites to a personalized list, and conveniently add items to your cart for a seamless shopping experience. Enjoy exclusive deals, read customer reviews, and get your favorite snacks delivered right to your doorstep with WondaBite!",
    website: 'https://wondabite.onrender.com/',
    imageSrc: wondabite,
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
const ProjectList = function (props) {
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
