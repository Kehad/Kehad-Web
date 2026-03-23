/* eslint-disable react/prop-types */
"use client";
import { Home, User, Code, Briefcase, Award, Contact } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { menuHandler, themeHandler } from '../../redux/menuSlice';
import { useDispatch, useSelector } from 'react-redux';

const NavMobile = function (props: any) {
  const { navStatus } = props;
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.menu.themeState);
  // console.log(navStatus);
  const pathname = usePathname();

  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleNavStatus = (event: any) => {
    // event.preventDefault();
    dispatch(menuHandler(false));
    if (theme === 'system' || theme === 'dark') {
      dispatch(themeHandler('dark'));
    } else {
      dispatch(themeHandler('light'));
    }
  };

  const handleNavLinkClick = (path: string) => {
    // Custom function logic here
    console.log(`Navigating to ${path}`);
    // Perform the navigation
    // navigate(path);
  };

  return (
    <nav className="">
      {/* <div className="flex flex-col justify-center w-max pt-14 pb-14 gap-511 transition transition-all duration-500 sm:flex  dark:text-white  block sm:block md:hidden lg:hidden"> */}
      <div className="flex flex-col justify-center w-max pt-14 pb-14 gap-511 transition transition-all duration-500 sm:flex  dark:text-white  block sm:block md:hidden lg:hidden">
        <div className="my-4 transition transition-all duration-500">
          <Link
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            href="/"
            onClick={handleNavStatus}
          >
            {/* <span className="material-symbols-rounded">home</span> */}
            <Home
              className={classNames(
                pathname === '/'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )}
            />
            <span className={`${pathname === '/' ? 'text-primary' : ''}  `}>
              Home
            </span>
          </Link>
        </div>
        <div
          className="my-4 transition transition-all duration-500"
          onClick={handleNavStatus}
        >
          <Link
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            href="/skills"
            // onClick={handleNavStatus}
          >
            {/* <i className="material-icons material-icons-round"> */}
            {/* integration_instructions */}
            {/* </i> */}
            <Code
              className={classNames(
                pathname === '/skills'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )}
            />
            <span
              className={`${pathname === '/skills' ? 'text-primary' : ''} `}
            >
              Skills
            </span>
          </Link>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <Link
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            href="/works"
            onClick={handleNavStatus}
          >
            {/* <i className="material-icons material-icons-round">work</i> */}
            <Briefcase
              className={classNames(
                pathname === '/works'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )}
            />
            <span className={`${pathname === '/works' ? 'text-primary' : ''} `}>
              Works
            </span>
          </Link>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <Link
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            href="/side-project"
            // onClick={handleNavStatus}
            onClick={(e) => {
              // e.preventDefault();
              handleNavLinkClick('/contact');
              dispatch(menuHandler(false));
            }}
          >
            {/* <i className="material-icons material-icons-round">workspaces</i> */}
            <Award
              className={classNames(
                pathname === '/side-project'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary '
              )}
            />
            <span
              className={`${
                pathname === '/side-project' ? 'text-primary' : ''
              } `}
            >
              Side project
            </span>
          </Link>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <Link
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            href="/about-me"
            onClick={handleNavStatus}
          >
            {/* <i className="material-icons material-icons-round">person</i> */}
            <User
              className={classNames(
                pathname === '/about-me'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )}
            />
            <span
              className={`${
                pathname === '/about-me' ? 'text-primary' : ''
              } hidde group-hover:fle`}
            >
              About me
            </span>
          </Link>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <Link
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition  transition-all duration-500 group hover:text-primary"
            href="/contact-me"
            onClick={handleNavStatus}
          >
            {/* <i className="material-icons material-icons-round">email</i> */}
            <Contact
              className={classNames(
                pathname === '/contact-me'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white group hover:text-primary'
              )}
            />
            <span
              className={`${pathname === '/contact-me' ? 'text-primary' : ''} `}
            >
              Contact me
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavMobile;

{
  /* <div className={classes["nav__container---box"]}>
  <Link
    className={classes["nav__container---box--link"]}
    style=""
    href="/home"
  >
    <i className="material-icons material-icons-round">home</i>
    <i className="fa fa-bullseye nav__container---box--icon"></i>
    <span className={classes["nav__container---box--name"]}>Home</span>
  </Link>
</div>; */
}
