/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import Slider from 'react-slick';
// import classes from './worksList.module.css';
import WorksItem from './projectItem.jsx';
// import Pagination from './pagination.jsx';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import Piccon from '../../assets/Piccon.png';
import wondabite from '../../assets/wondabite.png';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Button from '../others/button.jsx';
import ProjectItem from './projectItem.jsx';
import Pagination from './pagination.jsx';

// import './swiperStyles.css';

const ProjectData = [
  {
    id: 'm1',
    name: 'Piccon',
    description:
      "Piccon is your go-to platform for comparing designs and logos to check for originality. Easily upload your designs and verify their uniqueness against a comprehensive database. Our advanced algorithms ensure accurate and reliable results, helping you avoid copyright issues. With a user-friendly interface, you can navigate and compare effortlessly. Protect your creativity and ensure your designs stand out with PicCon..",
    website: 'https://piccon.onrender.com/',
    imageSrc: Piccon,
  },
  {
    id: 'm2',
    name: 'Wondabite',
    description:
      "Welcome to WondaBite, your go-to online store for a delightful variety of snacks! Whether you're craving something sweet, savory, or healthy, WondaBite has it all. Our user-friendly website allows you to easily browse through a wide selection of snacks, add your favorites to a personalized list, and conveniently add items to your cart for a seamless shopping experience. Enjoy exclusive deals, read customer reviews, and get your favorite snacks delivered right to your doorstep with WondaBite!",
    website: 'https://wondabite.onrender.com/',
    imageSrc: wondabite,
  },
];
const ProjectList = function (props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [initDisable, setInitDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(false);
  const [forDisable, setForDisable] = useState(false);
  const recordsPerPage = 1;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = ProjectData.slice(firstIndex, lastIndex);
  console.log(records);
  function handleBackClick() {
    console.log('Back clicked');

    if (currentPage === 1) {
      setCurrentPage(ProjectData.length);
      return;
    }
    setCurrentPage(currentPage - 1);
  }
  function handleNextClick() {
    if (ProjectData.length === currentPage) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="md:relative">
      {records.map((data) => (
        <ProjectItem
          key={data.id}
          id={data.id}
          name={data.name}
          description={data.description}
          website={data.website}
          imageSrc={data.imageSrc}
          next={handleNextClick}
          back={handleBackClick}
        />
      ))}

      <Pagination back={handleBackClick} next={handleBackClick} />
    </div>
  );

  // return (
  //   <div className="md:relative">
  //     <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
  //       {ProjectData.map((data) => (
  //         <SwiperSlide key={data.id}>
  //           <div className="classes.projectItem w-4">
  //             <div className="flex items-center justify-between gap-12">
  //               <div className="">
  //                 <h2 className="text-3xl text-primary mb-4 font-judson">
  //                   {data.name}
  //                 </h2>
  //                 <p className="text-2xl font-judson mb-10 leading-relaxed">
  //                   {data.description}
  //                 </p>
  //               </div>
  //               <div className="flex items-center justify-center p-12 bg-sub rounded-xl">
  //                 <img
  //                   className="w-full h-auto object-cover"
  //                   src={data.imageSrc}
  //                   alt="The Landing"
  //                 />
  //               </div>
  //             </div>
  //             <div className="flex items-center">
  //               <Button
  //                 link={data.website}
  //                 target={'_blank'}
  //                 name={'Visit Website'}
  //               />
  //               {/* <MobilePagination next={next} back={back} /> */}
  //             </div>
  //           </div>
  //         </SwiperSlide>
  //       ))}
  //     </Swiper>
  //   </div>
  // );
};

export default ProjectList;
