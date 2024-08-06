import React from "react";
import { motion } from "framer-motion";
// import classes from './works.module.css';
import WorkList from "./worksList";
import TransitionMovement from "../others/transitionMovement.jsx";
// import NewList from './worksListcopy';

const Works = function (props) {
  //   const pageVariants = {
  //   initial: {
  //     opacity: 0,
  //     x: "-100vw",
  //   },
  //   in: {
  //     opacity: 1,
  //     x: 0,
  //   },
  //   out: {
  //     opacity: 0,
  //     x: "100vw",
  //   },
  // };

  // const pageTransition = {
  //   type: "tween",
  //   ease: "anticipate",
  //   duration: 0.5,
  // };

  return (
    <TransitionMovement className="mt-10 relative">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-judson text-primary mb-4">
        My Works
      </h1>

      <WorkList />
      {/* <NewList /> */}
    </TransitionMovement>
  );
};

export default Works;

//  <motion.div
//       className="mt-10 relative"
//       initial="initial"
//       animate="in"
//       exit="out"
//       variants={pageVariants}
//       transition={pageTransition}
//     ></motion.div>
