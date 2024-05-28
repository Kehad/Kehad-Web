/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import Button from '../others/button.jsx';
import ButtonPlain from '../others/buttonPlain.jsx';
import SocialLinks from '../others/socialLinks.jsx';
import MyComponent from './autoType.jsx';
// import classes from './home.module.css';
// import Button from '../layout/button.jsx';
// import ButtonType2 from '../layout/buttonType2.jsx';
// import SocialLinks from '../layout/socialLinks.jsx';

const Home = function () {
  return (
    <div className="flex flex-col mt-0 ">
      <h1 className="text-primary font-Judson mb-4 sm:text-5xl md:text-5xl lg:text-7xl">
        Hi.
      </h1>
      <h3 className="mb-5 text-[2rem] lg:text-5xl">
        I'm <MyComponent name={'Kehinde Adigun.'} />
      </h3>
      {/* <h3 className="text-gray-200 font-Judson text-2.5xl font-normal mt-0.5 mb-0.7">
        I'm Kehinde Adigun.
      </h3> */}
      <p className=" font-judson  font-normal  mt-3 mb-3 md:text-[1.5rem] md:text-3xl md:leading-tight lg:text-4xl lg:leading-normal">
        I am a <span className="text-primary">front-end developer</span> who
        currently seek out <br></br> innovative solution to everyday problems.
        <br />I am a dedicated and creative front-end developer with a strong
        passion for crafting engaging and visually appealing web experiences.
        With a keen eye for design and a mastery of front-end technologies, I
        thrive in the ever-evolving world of web development.
      </p>
      <SocialLinks />
      <div className="flex items-center gap-2">
        <Button name={'hire me'} link={'www.kehad.com'} />
        <ButtonPlain name={'about me'} link={'http://kehad.onrender.com'} />
      </div>
      {/* <MusicPlayer /> */}
    </div>
  );
};

export default Home;
