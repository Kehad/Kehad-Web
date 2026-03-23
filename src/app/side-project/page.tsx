import React from "react";
import { motion } from "framer-motion";


import TransitionMovement from "@/components/others/transitionMovement";
import ProjectList from "./modal/projectList";

const Project = function () {
  

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
