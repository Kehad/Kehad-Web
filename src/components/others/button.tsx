/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'next/link';

// import classes from './button.module.css';

const Button = function (props: any) {
  const handleClick = (event: any) => {
    event.preventDefault();
    console.log('Link clicked!');
  };
  return (
    <div className="">
      <div className="flex align-center gap-9">
        <Link
          href={props.link}
          onClick={props.action}
          className="py-4 px-6 border rounded-full transition-all duration-500 font-bold bg-primary text-black text-base sm:text-base lg:text-3xl border-primary cursor-pointer hover:text-primary hover:border-primary hover:bg-transparent hover:shadow-[0_0_20px_rgba(7,197,20,0.5)]"
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
