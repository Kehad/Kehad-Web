/* eslint-disable react/prop-types */
import React from 'react';

// import classes from './button.module.css';

const Button = function (props) {
  return (
    <div className="">
      <div className="flex align-center gap-9">
        <a
          href={props.link}
          onClick={props.action}
          className="py-4 px-6 border rounded-full transition-all duration-500 font-bold bg-primary text-black text-3xl border-primary cursor-pointer hover:text-primary hover:border-primary hover:bg-transparent "
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

export default Button;
