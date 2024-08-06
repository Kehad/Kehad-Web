import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ContactPageIcon from "@mui/icons-material/ContactPage";


const Nav = function (props) {
  // eslint-disable-next-line react/prop-types
  // const { navStatus } = props;
  const { pathname } = useLocation();

  const [isMenuActive, setIsMenuActive] = useState(false);

  const falseMenuHandler = () => {
    setIsMenuActive(false);
  };
  // navStatus(isMenuActive);

  // console.log(pathname);

  // const navLinkStyles = ({ isActive }) => {
  //   return {
  //     color: isActive ? '#07c514' : '#fff',
  //     fill: isActive ? '#07c514' : '#fff',
  //   };
  // };

  return (
    <nav className="">
      {/* <div className="lg:flex flex-col justify-center rounded-7 bg-sup w-max pt-20 pb-20 lg:pr-[1.5rem] md:pr-6 lg:pl-[1.5rem] md:pl-6 gp-4 duration-500 border-1 border-sub flex hover:flex dark:bg-mainOpacity dark:text-white dark:border-primary dark:border-1 hidden sm:hidden md:block transition-all duration-[2000ms] dark:transition-all dark:duration-[2000ms] hover:transition hover:transition-all hover:duration-[500ms]"> */}
      <div
        className="nav-div flex lg:flex flex-col gap-8 justify-center rounded-7 bg-sup w-max
        py-20 px-10 md:gap-[1.5rem]  md:flex md:px-6 
       duration-500 border-1 border-sub dark:bg-mainOpacity
       dark:text-white dark:border-primary dark:border-1 hidden sm:hidden md:block
       transition-all duration-[2000ms] dark:transition-all dark:duration-[2000ms]
       hover:transition hover:transition-all hover:duration-[500ms]"
      >
        <div className="">
          <NavLink
            className="nav-link flex items-center gap-2.5 no-underline text-lg hover:text-primary"
            to="/home"
          >
            <HomeIcon
              className={`${classNames(
                pathname === "/home"
                  ? "text-primary"
                  : "text-white hover:text-primary"
              )} !h-[1.1rem] lg:!h-[1em] lg:!h-[1em] `}
            />
            <span
              className={`${pathname === "/home" ? "text-primary" : ""}
                span-el  `}
              // max-w-0 opacity-0 text-[0px] group-hover:text-xl group-hover:opacity-100 group-hover:max-w-[190px] transition-[max-width] duration-300 transiton-[opacity]`}
            >
              Home
            </span>
          </NavLink>
        </div>
        <div className="">
          <NavLink
            className="nav-link flex items-center gap-2.5 no-underline text-lg hover:text-primary"
            to="/skills"
          >
            <IntegrationInstructionsIcon
              className={`${classNames(
                pathname === "/skills"
                  ? " text-primary"
                  : "text-white hover:text-primary"
              )} !h-[1.1rem] lg:!h-[1em]`}
            />
            <span
              className={`${pathname === "/skills" ? "text-primary" : ""} 
                span-el `}
            >
              Skills
            </span>
          </NavLink>
        </div>
        <div className="">
          <NavLink
            className="nav-link flex items-center gap-2.5 no-underline text-lg hover:text-primary"
            to="/works"
          >
            <WorkspacesIcon
              className={`${classNames(
                pathname === "/works"
                  ? " text-primary"
                  : "text-white hover:text-primary"
              )} !h-[1.1rem] lg:!h-[1em]`}
            />
            <span
              className={`${pathname === "/works" ? "text-primary" : ""} 
              span-el `}
            >
              Works
            </span>
          </NavLink>
        </div>
        <div className=" ">
          <NavLink
            className="nav-link flex items-center gap-2.5 no-underline text-lg hover:text-primary"
            to="/side-project"
          >
            <WorkspacePremiumIcon
              className={`${classNames(
                pathname === "/side-project"
                  ? " text-primary"
                  : "text-white hover:text-primary "
              )} !h-[1.1rem] lg:!h-[1em]`}
            />
            <span
              className={`${pathname === "/side-project" ? "text-primary" : ""} 
              span-el `}
            >
              Side project
            </span>
          </NavLink>
        </div>
        <div className="">
          <NavLink
            className="nav-link flex items-center gap-2.5 no-underline text-lg hover:text-primary"
            to="/about-me"
          >
            <PersonIcon
              className={`${classNames(
                pathname === "/about-me"
                  ? " text-primary"
                  : "text-white hover:text-primary"
              )} !h-[1.1rem] lg:!h-[1em]`}
            />
            <span
              className={`${pathname === "/about-me" ? "text-primary" : ""} 
              span-el `}
            >
              About me
            </span>
          </NavLink>
        </div>
        <div className="">
          <NavLink
            className="nav-link flex items-center gap-2.5 no-underline text-lg hover:text-primary"
            to="/contact-me"
          >
            <ContactPageIcon
              className={`${classNames(
                pathname === "/contact-me"
                  ? " text-primary"
                  : "iconFill-secndary text-white hover:text-primary "
              )} !h-[1.1rem] lg:!h-[1em]`}
            />
            <span
              className={`${
                pathname === "/contact-me"
                  ? "text-primary"
                  : "hover:text-primary"
              } 
                span-el `}
            >
              Contact me
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
