/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import Button from "../others/button";
import SocialLinks from "../others/socialLinks";
import TransitionMovement from "../transitionMovement.jsx";

const AboutMe = function () {
  return (
    <TransitionMovement>
      <h1 className="text-primary font-judson text-3xl sm:text-xl lg:text-5xl mb-10">
        About me.
      </h1>
      <p className="mt-8 mb-12 font-judson text-xl sm:text-xl  lg:text-xl">
        I'm popularly known as <span className="text-primary">Kehad</span>, and
        I love creating intuitive and visually appealing digital experiences. I
        thrive on new challenges and am always eager to learn and grow. My
        dedication to improvement drives me to deliver great results and stay
        ahead in the tech industry.each one presenting a unique challenge that
        I've eagerly tackled. When I'm not with my computer, you'll probably
        find me playing mobile games and gisting with friends 😉
        <br /> <br /> &copy; 2024, Kehad
      </p>
      <SocialLinks />
      <Button name={"Hire me"} link={"/contact-me"} />
    </TransitionMovement>
  );
};

export default AboutMe;

//  <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       // initial={{ width: 0 }}
//       // animate={{ width: "100%" }}
//       // exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}
//     ></motion.div>
