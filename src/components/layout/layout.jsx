/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

function Layout(props) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // console.log(dimensions);

  return (
    <div
      className="bg-main min-h-screen w-screen text-white py-16 lg:px-28  font-judson dark:bg-gray-300 dark:text-black px-12  sm:px-12 md:px-16 transition-all duration-[2000ms] dark:transition-all dark:duration-[2000ms]"
      // className=" h-screen w-screen"
      // style={dimensions}
    >
      {props.children}
    </div>
  );
}

export default Layout;
