/* eslint-disable react/prop-types */
import React from 'react';

function Layout(props) {
  return (
    <div className="bg-main text-white h-screen w-screen py-16 px-28">
      {props.children}
    </div>
  );
}

export default Layout;
