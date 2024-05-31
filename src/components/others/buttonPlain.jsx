/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

// import classes from './button.module.css';

const ButtonPlain = function (props) {
  return (
    <div className="">
      <div className="flex align-center gap-9">
        <Link
          to={props.link}
          onClick={props.action}
          className="py-4 px-6 border rounded-full transition-all duration-500 font-bold cursor-pointer text-base sm:text-base lg:text-3xl hover:bg-primary hover:text-black hover:border-primary  text-primary border-primary bg-transparent "
          download={props.download}
          target={props.target}
          style={props.style}
        >
          {props.name}
        </Link>
      </div>
    </div>
  );
};

export default ButtonPlain;
