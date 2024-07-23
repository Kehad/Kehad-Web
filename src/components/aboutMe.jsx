import Button from "../layout/button";
import SocialLinks from "../layout/socialLinks";
import classes from "./aboutMe.module.css";

const AboutMe = function () {
  return (
    <div className={classes.about}>
      <h1 className={classes["about__greeting"]}>About me.</h1>
      <p className={classes["about__text"]}>
        I've always been fascinated by the intersection of design and
        technology, and I've made it my mission to bring beautiful,
        user-friendly websites to life. With 5 years of experience in the
        industry, I've had the privilege of working on a diverse range of
        projects, each one presenting a unique challenge that I've eagerly
        tackled.
      </p>

      <SocialLinks />

      <Button name={"Hire me"} link={"www.kehad.com"} />
    </div>
  );
};

export default AboutMe;
