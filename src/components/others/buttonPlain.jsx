/* eslint-disable react/prop-types */
import React from 'react';

// import classes from './button.module.css';

const ButtonPlain = function (props) {
  return (
    <div className="">
      <div className="flex align-center gap-9">
        <a
          href={props.link}
          onClick={props.action}
          className="py-4 px-6 border rounded-full transition-all duration-500 font-bold cursor-pointer text-3xl text-base sm:text-base hover:bg-primary hover:text-black hover:border-primary  text-primary border-primary bg-transparent "
          download={props.download}
          target={props.target}
          style={props.style}
        >
          {props.name}
        </a>
      </div>
    </div>
  );
};

export default ButtonPlain;
