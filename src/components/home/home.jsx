/* eslint-disable react/no-unescaped-entities */
import React from "react";

import Button from "../others/button.jsx";
import ButtonPlain from "../others/buttonPlain.jsx";
import SocialLinks from "../others/socialLinks.jsx";
import AutoType from "./autoType.jsx";
import TransitionMovement from "../others/transitionMovement.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
const Home = function () {
  return (
    <TransitionMovement>
      <div className="flex flex-col">
        <h1 className="text-primary font-Judson mb-4 text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:">
          Hi.
        </h1>
        <h3 className="mb-5 text-[2rem] lg:text-3xl">
          I'm <AutoType name={"Kehinde Gabriel Adigun."} />
        </h3>
        <p className=" font-judson  font-normal mt-3 mb-3 text-[1.5rem] sm:text-[1.5rem] md:text-[1.5rem] md:text-3xl md:leading-tight lg:text-2xl lg:leading-normal">
          I am a <span className="text-primary">Web developer</span> with over 3
          years of experience, specializing in creating dynamic and responsive
          web applications. Currently, I am on a journey to become a full stack
          and mobile app developer, expanding my skills to include backend
          technologies and mobile development. My passion lies in crafting
          seamless user experiences and continuously learning to stay ahead in
          the ever-evolving tech landscape.
        </p>
        <SocialLinks />
        <div className="flex items-center gap-2">
          <Button name={"hire me"} link={"/contact-me"} />
          <ButtonPlain name={"about me"} link={"/about-me"} />
        </div>
        <div className="self-end">
          <MusicPlayer />
        </div>
      </div>
    </TransitionMovement>
  );
};

export default Home;
