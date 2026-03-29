/* eslint-disable react/no-unescaped-entities */
import TransitionMovement from "@/components/others/transitionMovement";
import Button from "@/components/others/button";
import ButtonPlain from "@/components/others/buttonPlain";
import SocialLinks from "@/components/others/socialLinks";
import AutoType from "./modal/autoType";
import MusicPlayer from "./modal/MusicPlayer";


const Home = function () {
  return (
    <TransitionMovement>
      <div className="flex flex-col">
        <h1 className="text-primary font-Judson mb-4 text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:">
          Hi.
        </h1>
        <h3 className="mb-5 text-[2rem] lg:text-4xl font-semibold">
          I'm <AutoType strings={["Kehinde Gabriel Adigun.", "a Software Engineer.", "a Frontend Developer.", "a Next.js Specialist."]} />
        </h3>
       
        <p className=" font-judson  font-normal mt-3 mb-3 text-[1.5rem] sm:text-[1.5rem] md:text-[1.5rem] md:text-3xl md:leading-tight lg:text-2xl lg:leading-normal">
          I'm a <span className="text-primary">full-stack software developer</span> with over <span className="text-primary">five</span> years of experience building complete <span className="text-primary">web and mobile applications</span>. 
          My focus is on mobile development and scalable full-stack systems, where I design clean architectures, build dependable APIs, and craft intuitive, user-centered experiences. 
          I also bring <span className="text-primary">AI</span> into real-world products, transforming ideas into practical and intelligent solutions.
          I'm continuously improving my skills, with a growing passion for <span className="text-primary">machine learning</span> and data-driven development. 
          I enjoy exploring how intelligent systems can enhance applications and solve real problems. 
          I pay close attention to detail, performance, and maintainability, and I’m driven by the goal of creating software that people find useful, reliable, and enjoyable to use.
        </p>
        <SocialLinks />
        <div className="flex items-center gap-2">
          <Button name={"hire me"} link={"/contact-me"} />
          <ButtonPlain name={"about me"} link={"/about-me"} />
        </div>
        <div className="self-end mt-12">
          {/* <MusicPlayer /> */}
          {/* <SpotifyPlaylist /> */}
        </div>
      </div>
    </TransitionMovement>
  );
};

export default Home;
