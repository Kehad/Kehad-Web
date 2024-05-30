/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Pagination } from '@mui/material';
import React from 'react';
import Button from '../others/button';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import Button from '../../layout/button';
// import classes from "./worksItem.module.css";
// import MobilePagination from "../Paginations/mobilePagination";

const ProjectItem = function (props) {
  const { name, description, website, imageSrc, next, back } = props;

  return (
    // <Slider {...settings}>

    <div className="classes.projectItem">
      <div className="flex items-center justify-between gap-12 sm:flex-col lg:flex-row">
        <div className="">
          <h2 className="text-3xl text-primary mb-4 font-judson">{name}</h2>
          <p className="text-2xl sm:text-xlfont-judson mb-10 leading-relaxed sm:leading-tight">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-center p-12 bg-sub rounded-xl sm:mb-8">
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
  );
};

export default ProjectItem;
