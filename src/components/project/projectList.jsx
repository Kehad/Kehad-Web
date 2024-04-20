import React, { useState } from 'react';

// import classes from './worksList.module.css';
import WorksItem from './projectItem.jsx';
// import Pagination from './pagination.jsx';

import Piccon from '../../assets/Piccon.png';

const ProjectData = [
  {
    id: 'm1',
    name: 'Piccon',
    description:
      "Adboöks operates as a subsidiary of Adlife, specializing in the sale of captivating romance novels. Their website is dedicated to showcasing and offering the top 10 romance books. The website seamlessly integrates the branding of their parent company, 'Adlife,' ensuring a cohesive and recognizable experience for our visitors.",
    website: 'https://piccon.onrender.com/',
    imageSrc: Piccon,
  },
  {
    id: 'm2',
    name: 'CalcXpert',
    description:
      "CalcXpert is your trusted source for accurate and user-friendly simple online calculators. Whether you're a student, professional, or simply need a reliable tool for calculations, we have you covered. Say goodbye to distractions and explore the world of precise online calculations with CalcXpert.",
    website: 'https://piccon.onrender.com/',
    imageSrc: 'https://www.w3schools.com/css/img_5terre.jpg',
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
      setCurrentPage(worksData.length);
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
    </div>
  );
};

export default ProjectList;
