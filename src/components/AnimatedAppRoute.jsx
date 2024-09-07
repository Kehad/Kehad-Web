import { Route, Routes, useLocation } from "react-router-dom";
import AboutMe from "./aboutme/about-me";
import Skills from "./skills/skills";
import Home from "./home/home";
import Contact from "./contact/contact";
import Project from "./project/project";
import Works from "./works/works";


import { AnimatePresence } from "framer-motion";

// import { AnimatePresence } from "framer-motion/dist/framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/works" element={<Works />} />
          <Route path="/side-project" element={<Project />} />
          <Route path="/contact-me" element={<Contact />} />
        </Routes>
      </AnimatePresence>
  );
}
{/* <Route path="*" element={<Home />} /> */}
{
  /* <Route path="/" element={<Home />} /> */
}

export default AnimatedRoutes;
