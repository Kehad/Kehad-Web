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

  console.log(dimensions);

  return (
    <div
      className="bg-main text-white py-16 px-28  font-judson dark:bg-gray-300 dark:text-black duration-100"
      // className=" h-screen w-screen"
      style={dimensions}
    >
      {props.children}
    </div>
  );
}

export default Layout;
