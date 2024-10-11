/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { motion } from "framer-motion";

function TransitionMovement(props) {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: "-100vh",
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: "100vh",
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return ( 
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      // transition={pageTransition}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {props.children}
    </motion.div>
  );
}

export default TransitionMovement;

// import { motion } from "framer-motion";
// import React from "react";

// const transition = (OgComponent) => {
//   return (props) => (
//     <>
//       <OgComponent {...props} />
//       <motion.div
//         className="slide-in"
//         initial={{ scaleY: 0 }}
//         animate={{ scaleY: 1 }}
//         exit={{ scaleY: 0 }}
//         transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//       />
//       <motion.div
//         className="slide-out"
//         initial={{ scaleY: 1 }}
//         animate={{ scaleY: 0 }}
//         exit={{ scaleY: 1 }}
//         transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//       />
//     </>
//   );
// };

// export default transition;



