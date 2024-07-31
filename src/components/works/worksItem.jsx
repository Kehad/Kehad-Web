import React from 'react';
import Button from '../others/button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import Button from '../../layout/button';
// import classes from "./worksItem.module.css";
// import MobilePagination from "../Paginations/mobilePagination";

const WorksItem = function (props) {
  const { name, description, website, imageSrc, next, back } = props;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    // <Slider {...settings}>
    <div className="worksItem">
      <div className="flex items-center justify-between gap-12 flex-col sm:flex-col lg:flex-row">
        <div className="">
          <h2 className="text-3xl text-primary mb-4 font-judson">{name}</h2>
          <p className="text-2xl text-xl leading-tight sm:text-xl sm:leading-tight font-judson mb-10 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-center p-12 bg-sub rounded-xl mb-8 sm:mb-8">
          <img
            className=" w-[100rem] h-[13rem] object-cover" /* use this w-full h-auto instead for  w-[100rem] h-[13rem]*/
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

export default WorksItem;
