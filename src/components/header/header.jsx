import React, { useState } from 'react';
import Toggle from './toggleMode.jsx';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import Nav from '../sidebar/nav.jsx';
import NavMobile from '../sidebar/navMobile.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { menuHandler } from '../../redux/menuSlice.jsx';

function Header(props) {
  // const { menuActive } = props;
  // const [isMenuActive, setIsMenuActive] = useState(false);
  // const trueMenuHandler = () => {
  //   setIsMenuActive(true);
  // };
  // const falseMenuHandler = (event, name) => {
  //   event.preventDefault();
  //   console.log(name);
  //   setIsMenuActive(name);
  //   const element = document.documentElement;
  //   console.log(element);
  // };
  // menuActive(isMenuActive);

  const isMenu = useSelector((state) => state.menu.menuState);
  const dispatch = useDispatch();

  const trueMenuHandler = () => {
    dispatch(menuHandler(true));
  };
  const falseMenuHandler = (event) => {
    event.preventDefault();
    dispatch(menuHandler(false));
  };
  return (
    <div>
      <div className="flex justify-between">
        <a href="https://kehad.onrender.com">
          <div className="flex gap-3.5 items-center">
            <svg
              width="39"
              height="33"
              viewBox="0 0 39 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group 1">
                <path
                  id="Intersect"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8463 6.73581H6.46811C1.84931 6.73581 -1.03743 11.7358 1.27197 15.7358L11.019 32.6182H16.3972C21.016 32.6182 23.9028 27.6182 21.5934 23.6182L11.8463 6.73581Z"
                  fill="#07C51A"
                />
                <path
                  id="Intersect_2"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M28.2743 0.618195H22.8961C18.2773 0.618195 15.3905 5.61819 17.6999 9.61819L27.447 26.5006H32.8252C37.444 26.5006 40.3307 21.5006 38.0213 17.5006L28.2743 0.618195Z"
                  fill="#07C51A"
                />
              </g>
            </svg>
            <h1 className="font-semibold text-4xl">Kehad</h1>
          </div>
        </a>

        {/*  To open side Navigation butto for mobile view */}
        <div className="sm:block md:hidden lg:hidden">
          {/* <MenuRoundedIcon sx={{ color: 'text-primary' }} /> */}
          <MenuRoundedIcon
            className="text-primary cursor-pointer"
            style={{ width: '40px', height: '40px' }}
            onClick={trueMenuHandler}
          />
        </div>

        <div className="hidden sm:hidden md:block lg:block">
          <Toggle />
        </div>

        {/*  side Navigation for mobile view */}
        {isMenu ? (
          <div className="h-full bg-[#1A1A1A] w-40 fixed top-0 right-0 flex flex-col items-center gap-4 transition-all duration-500 z-[100] flex justify-between items-center py-8 sm:flex lg:hidden">
            <div className="flex justify-between flex-col gap-4 ">
              {/* to close side nav for mobile view */}
              <CloseIcon
                className="text-primary cursor-pointer"
                style={{
                  width: '40px',
                  height: '40px',
                  margin: '15px',
                }}
                onClick={falseMenuHandler}
              />
              {/* nav for mobile view */}
              <NavMobile />
            </div>
            {/* toggle for mobile view */}
            <Toggle />
          </div>
        ) : (
          ''
        )}
      </div>
      <div></div>
    </div>
  );
}

export default Header;
