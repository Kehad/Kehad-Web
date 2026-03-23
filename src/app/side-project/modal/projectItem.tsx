"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Pagination } from '@mui/material';
import React, { useState } from 'react';
import Button from '@/components/others/button';
import Image from 'next/image';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import Button from '../../layout/button';
// import classes from "./worksItem.modul e.css";
// import MobilePagination from "../Paginations/mobilePagination";

const ProjectItem = function (props: any) {
  const { name, description, website, imageSrc, next, back } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    // <Slider {...settings}>

    <div className="classes.projectItem">
      <div className="flex items-center justify-between gap-12 flex-col sm:flex-col lg:flex-row">
        <div className="">
          <h2 className="text-3xl text-primary mb-4 font-judson">{name}</h2>
          {/* <p className="text-xl sm:text-xl lg:text-2xl font-judson mb-10 leading-tight sm:leading-tight lg:leading-relaxed"> */}
          <p className="text-xl leading-tight sm:text-xl sm:leading-tight font-judson mb-10 leading-relaxed">
            {description}
          </p>
        </div>
        <div
          className="flex items-center justify-center p-12 bg-sub rounded-xl mb-8 sm:mb-8 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={toggleModal}
        >
          <Image
            className="w-[100rem] h-[13rem] object-cover" /* use this w-full h-auto instead for  w-[100rem] h-[13rem]*/
            src={imageSrc}
            alt="The Landing Page of the website"
          />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={toggleModal}
        >
          <div
            className="relative max-w-7xl w-full flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white text-4xl font-bold cursor-pointer hover:text-gray-300 transition-colors z-[110]"
              onClick={toggleModal}
            >
              &times;
            </button>
            <Image
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
              src={imageSrc}
              alt={`${name} preview`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
