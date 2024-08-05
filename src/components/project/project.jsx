import React from "react";
import { motion } from "framer-motion";

import ProjectList from "./projectList";
import TransitionMovement from "../transitionMovement.jsx";
const Project = function (props) {
  // const records = Slice(firstIndex, lastIndex);
  // const npage = Math.ceil(props.data.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

  // const pageVariants = {
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
        My Projects
      </h1>

      <ProjectList />
    </TransitionMovement>
  );
};

export default Project;

{
  /* <motion.div
  className="mt-10 relative"
  initial="initial"
  animate="in"
  exit="out"
  variants={pageVariants}
  transition={pageTransition}
>
  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-judson text-primary mb-4">
    My Projects
  </h1>

  <ProjectList />
</motion.div>; */
}
