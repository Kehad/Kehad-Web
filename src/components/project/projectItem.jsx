import React from 'react';
import Button from '../others/button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import Button from '../../layout/button';
// import classes from "./worksItem.module.css";
// import MobilePagination from "../Paginations/mobilePagination";

const ProjectItem = function (props) {
  const { name, description, website, imageSrc, next, back } = props;

  return (
    // <Slider {...settings}>
    <div className="classes.projectItem">
      <div className="flex items-center justify-between gap-12">
        <div className="">
          <h2 className="text-3xl text-primary mb-4 font-judson">{name}</h2>
          <p className="text-2xl font-judson mb-10 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-center p-12 bg-sub rounded-xl">
          <img
            className="w-full h-auto object-cover"
            src={imageSrc}
            alt="The Landing"
          />
        </div>
      </div>
      <div className="flex items-center">
        <Button link={website} target={'_blank'} name={'Visit Website'} />
        {/* <MobilePagination next={next} back={back} /> */}
      </div>
    </div>
    // </Slider>
  );
};

export default ProjectItem;
