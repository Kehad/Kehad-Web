import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeHandler } from '../../redux/menuSlice';

const Toggle = function (props) {
  // const { onAction } = props;
  // const [lightMode, setLightMode] = useState(
  //   localStorage.getItem('lightMode') === 'true'
  // );
  // const [theme, setTheme] = useState('system');
  // console.log(theme);
  const theme = useSelector((state) => state.menu.themeState);
  const dispatch = useDispatch();

  const element = document.documentElement;
  // console.log(element);

  // to run immediately the page reloads or the theme value changes
  useEffect(() => {
    // console.log(theme);
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        break;
      case 'light':
        element.classList.remove('dark');
        // element.classList.add('medium');
        break;
      default:
    }
  }, [theme]);




  // The original theme of the website is the light mode
  // and using the dark class i.e dark: will change the theme to dark mode

  return (
    <div onClick="" className="">
      <div className="flex  flex-row items-center justify-between  border rounded-3xl border-primary bg-primry  p2 gap8 w24 h12 w-[130px] h-[43px] transition duration-300">
        <div
          title="light mode"
          className={`cursor-pointer w-2/4 rounded-3xl rounded-tr-none rounded-br-none h-full flex items-center justify-center ${
            theme === "dark" ? "bg-primary" : ""
          } ${theme === "system" ? "bg-primary" : ""} transition duration-300`}
          onClick={() => dispatch(themeHandler("dark"))}

        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // onClick={() => setTheme('dark')}
            title="light"
          >
            <g id="material-symbols:light-mode">
              <path
                id="Vector"
                d="M12.4473 17.327C11.0639 17.327 9.8846 16.8394 8.90927 15.864C7.93394 14.8887 7.4466 13.7097 7.44727 12.327C7.44727 10.9437 7.93494 9.76436 8.91027 8.78903C9.8856 7.8137 11.0646 7.32636 12.4473 7.32703C13.8306 7.32703 15.0099 7.8147 15.9853 8.79003C16.9606 9.76536 17.4479 10.9444 17.4473 12.327C17.4473 13.7104 16.9596 14.8897 15.9843 15.865C15.0089 16.8404 13.8299 17.3277 12.4473 17.327ZM2.44727 13.327C2.16394 13.327 1.92627 13.231 1.73427 13.039C1.54227 12.847 1.4466 12.6097 1.44727 12.327C1.44727 12.0437 1.54327 11.806 1.73527 11.614C1.92727 11.422 2.1646 11.3264 2.44727 11.327H4.44727C4.7306 11.327 4.96827 11.423 5.16027 11.615C5.35227 11.807 5.44794 12.0444 5.44727 12.327C5.44727 12.6104 5.35127 12.848 5.15927 13.04C4.96727 13.232 4.72994 13.3277 4.44727 13.327H2.44727ZM20.4473 13.327C20.1639 13.327 19.9263 13.231 19.7343 13.039C19.5423 12.847 19.4466 12.6097 19.4473 12.327C19.4473 12.0437 19.5433 11.806 19.7353 11.614C19.9273 11.422 20.1646 11.3264 20.4473 11.327H22.4473C22.7306 11.327 22.9683 11.423 23.1603 11.615C23.3523 11.807 23.4479 12.0444 23.4473 12.327C23.4473 12.6104 23.3513 12.848 23.1593 13.04C22.9673 13.232 22.7299 13.3277 22.4473 13.327H20.4473ZM12.4473 5.32703C12.1639 5.32703 11.9263 5.23103 11.7343 5.03903C11.5423 4.84703 11.4466 4.6097 11.4473 4.32703V2.32703C11.4473 2.0437 11.5433 1.80603 11.7353 1.61403C11.9273 1.42203 12.1646 1.32636 12.4473 1.32703C12.7306 1.32703 12.9683 1.42303 13.1603 1.61503C13.3523 1.80703 13.4479 2.04436 13.4473 2.32703V4.32703C13.4473 4.61036 13.3513 4.84803 13.1593 5.04003C12.9673 5.23203 12.7299 5.3277 12.4473 5.32703ZM12.4473 23.327C12.1639 23.327 11.9263 23.231 11.7343 23.039C11.5423 22.847 11.4466 22.6097 11.4473 22.327V20.327C11.4473 20.0437 11.5433 19.806 11.7353 19.614C11.9273 19.422 12.1646 19.3264 12.4473 19.327C12.7306 19.327 12.9683 19.423 13.1603 19.615C13.3523 19.807 13.4479 20.0444 13.4473 20.327V22.327C13.4473 22.6104 13.3513 22.848 13.1593 23.04C12.9673 23.232 12.7299 23.3277 12.4473 23.327ZM6.09727 7.37703L5.02227 6.32703C4.82227 6.1437 4.72627 5.91036 4.73427 5.62703C4.74227 5.3437 4.83827 5.10203 5.02227 4.90203C5.22227 4.70203 5.46394 4.60203 5.74727 4.60203C6.0306 4.60203 6.26394 4.70203 6.44727 4.90203L7.49727 5.97703C7.6806 6.17703 7.77227 6.41036 7.77227 6.67703C7.77227 6.9437 7.6806 7.17703 7.49727 7.37703C7.31394 7.57703 7.08494 7.67303 6.81027 7.66503C6.5356 7.65703 6.29794 7.56103 6.09727 7.37703ZM18.4473 19.752L17.3973 18.677C17.2139 18.477 17.1223 18.2394 17.1223 17.964C17.1223 17.6887 17.2139 17.4597 17.3973 17.277C17.5806 17.077 17.8099 16.9814 18.0853 16.99C18.3606 16.9987 18.5979 17.0944 18.7973 17.277L19.8723 18.327C20.0723 18.5104 20.1683 18.7437 20.1603 19.027C20.1523 19.3104 20.0563 19.552 19.8723 19.752C19.6723 19.952 19.4306 20.052 19.1473 20.052C18.8639 20.052 18.6306 19.952 18.4473 19.752ZM17.3973 7.37703C17.1973 7.1937 17.1013 6.9647 17.1093 6.69003C17.1173 6.41536 17.2133 6.1777 17.3973 5.97703L18.4473 4.90203C18.6306 4.70203 18.8639 4.60603 19.1473 4.61403C19.4306 4.62203 19.6723 4.71803 19.8723 4.90203C20.0723 5.10203 20.1723 5.3437 20.1723 5.62703C20.1723 5.91036 20.0723 6.1437 19.8723 6.32703L18.7973 7.37703C18.5973 7.56036 18.3639 7.65203 18.0973 7.65203C17.8306 7.65203 17.5973 7.56036 17.3973 7.37703ZM5.02227 19.752C4.82227 19.552 4.72227 19.3104 4.72227 19.027C4.72227 18.7437 4.82227 18.5104 5.02227 18.327L6.09727 17.277C6.29727 17.0937 6.5346 17.002 6.80927 17.002C7.08394 17.002 7.31327 17.0937 7.49727 17.277C7.69727 17.4604 7.79327 17.6897 7.78527 17.965C7.77727 18.2404 7.68127 18.4777 7.49727 18.677L6.44727 19.752C6.26394 19.952 6.0306 20.048 5.74727 20.04C5.46394 20.032 5.22227 19.936 5.02227 19.752Z"
                fill="white"
              />
            </g>
          </svg>
        </div>
        <div
          className={`flex items-center justify-center h-full w-2/4 rounded-3xl  rounded-tl-none rounded-bl-none  transition-all duration-[2000ms] dark:transition-all dark:duration-[2000ms] cursor-pointer  ${
            theme === "light" ? "bg-primary" : ""
          } ${theme === "medium" ? "bg-primary" : ""} `}
          onClick={() => dispatch(themeHandler("light"))}
        >
          <div
            className="flex items-center justify-center flex-row rounded-full bg-primary  border-0 py-0.4 px-0.4 gap-2 cursor-pointer"
            // onClick={setDarkMode(false)}
            // onClick={toggleLightMode}
            title="dark mode"
            // onClick={() => setTheme('light')}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="ic:sharp-dark-mode">
                <path
                  id="Vector"
                  d="M12.3241 3.32703C10.5441 3.32703 8.80401 3.85487 7.32397 4.8438C5.84393 5.83273 4.69037 7.23834 4.00918 8.88288C3.328 10.5274 3.14977 12.337 3.49703 14.0828C3.8443 15.8287 4.70147 17.4323 5.96014 18.691C7.21881 19.9497 8.82246 20.8068 10.5683 21.1541C12.3141 21.5014 14.1237 21.3231 15.7683 20.6419C17.4128 19.9608 18.8184 18.8072 19.8073 17.3272C20.7963 15.8471 21.3241 14.1071 21.3241 12.327C21.3241 11.867 21.2841 11.407 21.2241 10.967C20.7244 11.6677 20.0642 12.2385 19.2987 12.6317C18.5332 13.0249 17.6847 13.229 16.8241 13.227C15.6793 13.2271 14.5641 12.8635 13.6393 12.1887C12.7145 11.5139 12.0279 10.5628 11.6786 9.47263C11.3293 8.38243 11.3353 7.20946 11.6958 6.12288C12.0562 5.03631 12.7525 4.09231 13.6841 3.42703C13.2441 3.36703 12.7841 3.32703 12.3241 3.32703Z"
                  fill="black"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;

// import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  return (
    <button
      className="fixed bottom-0 right-0 p-4 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      // onClick={toggleDarkMode}
    >
      {/* {darkMode ? "Light Mode" : "Dark Mode"} */}
    </button>
  );
};

// export default DarkModeToggle;
