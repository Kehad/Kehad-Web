import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// import 'swiper/swiper-bundle.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle';
import data from './data'; // Assuming your data is in a file named 'data.js'
// import './swiperStyles.css';

const MyComponent = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // slidesPerView={1}
      // spaceBetween={0}
      loop={true}
      // pagination={{
      //   clickable: true,
      // }}
      // navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            {/* You can add more JSX elements here to display more data */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MyComponent;
