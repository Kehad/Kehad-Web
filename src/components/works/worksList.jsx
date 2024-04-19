import React, { useState } from 'react';

// import classes from './worksList.module.css';
import WorksItem from './worksItem.jsx';
// import Pagination from './pagination.jsx';

import Adbook from '../../assets/Adbook.png';
import kadee from '../../assets/kadee.png';
import Exchnge from '../../assets/static-exchnge.png';

// import MobilePagination from "../Paginations/mobilePagination";
// import DesktopPagination from '../Paginations/desktopPaginaton';
// import

const worksData = [
  {
    id: 'm1',
    name: 'Adboöks',
    description:
      "Adboöks operates as a subsidiary of Adlife, specializing in the sale of captivating romance novels. Their website is dedicated to showcasing and offering the top 10 romance books. The website seamlessly integrates the branding of their parent company, 'Adlife,' ensuring a cohesive and recognizable experience for our visitors.",
    website: 'https://adbook.onrender.com/',
    imageSrc: Adbook,
  },
  {
    id: 'm2',
    name: 'Kadee',
    description:
      'Your stylish online boutique for both men and women. Discover the latest trends with easy login, detailed product pages, and a user-friendly cart. Shop effortlessly on any device. Join us for a hassle-free fashion experience where style meets convenience.',
    website: 'https://kadee.onrender.com/',
    imageSrc: kadee,
  },
  {
    id: 'm3',
    name: 'Static Exchnge',
    description:
      'Your premier decentralized crypto platform. Trade, earn, and win on this secure, user-friendly space. Explore various cryptocurrencies and lucrative earning opportunities. Join contests for stellar crypto rewards. Embark on an interstellar journey of financial possibilities today!',
    website: 'https://static-exchnge.onrender.com/',
    imageSrc: Exchnge,
  },
];

const WorkList = function (props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [initDisable, setInitDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(false);
  const [forDisable, setForDisable] = useState(false);

  const recordsPerPage = 1;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  // console.log(currentPage);
  // console.log(recordsPerPage);
  // console.log(lastIndex);
  // console.log(firstIndex);
  const records = worksData.slice(firstIndex, lastIndex);
  console.log(records);

  // console.log(npage, numbers);
  // const paginate = () => {
  // console.log(prevState)
  // setCurrentPage(prevState, pageNumber) => (
  //   console.log(prevState);
  // );
  // setCurrentPage((currentPage) => currentPage + 1)
  // };
  // console.log(currentPage);

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   console.log('a');
  //   console.log(currentPage)
  // };
  function handleBackClick() {
    console.log('Back clicked');
    /*
     // USE THIS WHEN YOU WANT TO DISABLE THE BACK BUTTON WHEN THE WORKDATA ITEM IS THE 1 ITEM  I.E useState(1)
    // if (currentPage === 1) {
    //   setPrevDisable(true);
    //   return;
    // }
    // setForDisable(false);
    // setPrevDisable(true);
    // setCurrentPage(currentPage - 1);
    */
    if (currentPage === 1) {
      setCurrentPage(worksData.length);
      return;
    }
    setCurrentPage(currentPage - 1);
  }

  function handleNextClick() {
    /* 
    // USE THIS WHEN YOU WANT TO DISABLE THE NEXT BUTTON WHEN THE WORKDATA ITEM IS FINISHED I.E useState(3)
    // if (worksData.length === currentPage) {
    //   setForDisable(true);
    //   return;
    // }
    // setPrevDisable(false);
    // setForDisable(false);
    // setCurrentPage(currentPage + 1); 
    */
    if (worksData.length === currentPage) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(currentPage + 1);
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="md:relative">
      {records.map((data) => (
        <WorksItem
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

      {/* <Pagination
        postsPerPage={recordsPerPage}
        totalPosts={records.length}
        next={handleNextClick}
        back={handleBackClick}
        currentPage={currentPage}
        nextDisable={forDisable}
        backDisable={prevDisable}
        initDisable={initDisable}
      /> */}
      {/* <DesktopPagination next={handleNextClick} back={handleBackClick} /> */}
    </div>
  );
};

export default WorkList;
