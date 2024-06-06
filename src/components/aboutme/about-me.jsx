/* eslint-disable react/no-unescaped-entities */

import Button from '../others/button';
import SocialLinks from '../others/socialLinks';

const AboutMe = function () {
  return (
    <div className="">
      <h1 className="text-primary font-judson text-5xl sm:text-5xl lg:text-6xl mb-10">
        About me.
      </h1>
      <p className="mt-8 mb-12 font-judson text-2xl sm:text-2xl  lg:text-4xl">
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
      <Button name={'Hire me'} link={'/contact-me'} />
    </div>
  );
};

export default AboutMe;
