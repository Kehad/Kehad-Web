import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./button";

const elements = [
  { id: 1, content: "Element 1" },
  { id: 2, content: "Element 2" },
  { id: 3, content: "Element 3" },
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
const Slider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextElement = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
  };

  const prevElement = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + elements.length) % elements.length
    );
  };

  return (
    <div className="slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={elements[currentIndex].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {props.children}
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
          link={elements[currentIndex].website}
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
    </div>
  );
};

// export default Slider;
