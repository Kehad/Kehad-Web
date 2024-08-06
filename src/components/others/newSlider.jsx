import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const elements = [
  { id: 1, content: "Element 1" },
  { id: 2, content: "Element 2" },
  { id: 3, content: "Element 3" },
];

const Slider = () => {
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
      <button onClick={prevElement}>Previous</button>
      <AnimatePresence mode="wait">
        <motion.div
          key={elements[currentIndex].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {elements[currentIndex].content}
        </motion.div>
      </AnimatePresence>
      <button onClick={nextElement}>Next</button>
    </div>
  );
};

export default Slider;
