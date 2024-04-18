/* eslint-disable react/no-unescaped-entities */

import Button from '../others/button';
import SocialLinks from '../others/socialLinks';

const AboutMe = function () {
  return (
    <div className="">
      <h1 className="text-primary font-judson text-6xl mb-10">About me.</h1>
      <p className="mt-8 mb-12 text-4xl">
        I've always been fascinated by the intersection of design and
        technology, and I've made it my mission to bring beautiful,
        user-friendly websites to life. With 5 years of experience in the
        industry, I've had the privilege of working on a diverse range of
        projects, each one presenting a unique challenge that I've eagerly
        tackled.
      </p>
      <SocialLinks />
      <Button name={'Hire me'} link={'www.kehad.com'} />
    </div>
  );
};

export default AboutMe;
