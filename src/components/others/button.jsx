/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

// import classes from './button.module.css';

const Button = function (props) {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('Link clicked!');
  };
  return (
    <div className="">
      <div className="flex align-center gap-9">
        <Link
          to={props.link}
          onClick={props.action}
          className="py-4 px-6 border rounded-full transition-all duration-500 font-bold bg-primary text-black text-base sm:text-base lg:text-3xl border-primary cursor-pointer hover:text-primary hover:border-primary hover:bg-transparent "
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

export default Button;
