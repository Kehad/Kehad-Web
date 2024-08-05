import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useState } from "react";

// temporary
// delete before deployment
const Navigation = () => {
  const menuItems = [
    {
      href: "/home",
      iconPath: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
      label: "Home",
    },
    {
      href: "/skills",
      iconPath:
        "M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-8 11.17-1.41 1.42L6 12l3.59-3.59L11 9.83 8.83 12zm1-9.92c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m2.41 11.34L13 14.17 15.17 12 13 9.83l1.41-1.42L18 12z",
      label: "Skills",
    },
    {
      href: "/works",
      iconPath:
        "M6 13c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m6-10C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m6 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4",
      label: "Works",
    },
    {
      href: "/side-project",
      iconPath:
        "M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28m-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6",
      label: "Side project",
    },
    {
      href: "/about-me",
      iconPath:
        "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4",
      label: "About me",
    },
  ];

  return (
    <div className="flex flex-col items-start space-y-4 min-h-screen bg-red-600 p-4">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="relative group my-4 transition-all duration-500"
        >
          <a
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition-all duration-500 hover:text-primary group"
            href={item.href}
            aria-current={item.current ? "page" : undefined}
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-primary css-i4bv87-MuiSvgIcon-root"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="icon"
            >
              <path d={item.iconPath}></path>
            </svg>
            <span className="text-primary hidden transition-all duration-[2000ms] group-hover:flex hover:text-primary">
              {item.label}
            </span>
          </a>
        </div>
      ))}
    </div>
  );
};

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
    // <nav className="fixed bottom-[0%] transform trnslate-y-1/2">
    <nav className="">
      {/* <div className="lg:flex flex-col justify-center rounded-7 bg-sup w-max pt-20 pb-20 lg:pr-[1.5rem] md:pr-6 lg:pl-[1.5rem] md:pl-6 gp-4 duration-500 border-1 border-sub flex group hover:flex dark:bg-mainOpacity dark:text-white dark:border-primary dark:border-1 hidden sm:hidden md:block transition-all duration-[2000ms] dark:transition-all dark:duration-[2000ms] hover:transition hover:transition-all hover:duration-[500ms]"> */}
      <div className="lg:flex flex-col justify-center rounded-7 bg-sup w-max duration-500 border-1 border-sub flex group hover:flex dark:bg-mainOpacity dark:text-white dark:border-primary dark:border-1 hidden sm:hidden md:block transition-all duration-[2000ms] dark:transition-all dark:duration-[2000ms] hover:transition hover:transition-all hover:duration-[500ms]">
        <div className=" transition transition-all duration-[500ms]">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/home"
          >
            <HomeIcon
              className={classNames(
                pathname === "/home"
                  ? " text-primary"
                  : "iconFill-secondary text-white hover:text-primary"
              )}
            />
            <span
              className={`${
                pathname === "/home" ? "text-primary" : ""
              } max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[190px] transition-[max-width]   `}
            >
              Home
            </span>
          </NavLink>
        </div>
        <div className=" transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/skills"
          >
            {/* <i className="material-icons material-icons-round"> */}
            {/* integration_instructions */}
            {/* </i> */}
            <IntegrationInstructionsIcon
              className={classNames(
                pathname === "/skills"
                  ? " text-primary"
                  : "iconFill-secondary text-white hover:text-primary"
              )}
            />
            <span
              className={`${
                pathname === "/skills" ? "text-primary" : ""
              } max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[190px] transition-[max-width] `}
            >
              Skills
            </span>
          </NavLink>
        </div>
        <div className=" transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/works"
          >
            {/* <i className="material-icons material-icons-round">work</i> */}
            <WorkspacesIcon
              className={classNames(
                pathname === "/works"
                  ? " text-primary"
                  : "iconFill-secondary text-white hover:text-primary"
              )}
            />
            <span
              className={`${
                pathname === "/works" ? "text-primary" : ""
              } max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[190px] transition-[max-width] `}
            >
              Works
            </span>
          </NavLink>
        </div>
        <div className=" transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/side-project"
          >
            {/* <i className="material-icons material-icons-round">workspaces</i> */}
            <WorkspacePremiumIcon
              className={classNames(
                pathname === "/side-project"
                  ? " text-primary"
                  : "iconFill-secondary text-white hover:text-primary "
              )}
            />
            <span
              className={`${
                pathname === "/side-project" ? "text-primary" : ""
              } max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[190px] transition-[max-width] `}
            >
              Side project
            </span>
          </NavLink>
        </div>
        <div className="transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/about-me"
          >
            {/* <i className="material-icons material-icons-round">person</i> */}
            <PersonIcon
              className={classNames(
                pathname === "/about-me"
                  ? " text-primary"
                  : "iconFill-secondary text-white hover:text-primary"
              )}
            />
            <span
              className={`${
                pathname === "/about-me" ? "text-primary" : ""
              } max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[190px] transition-[max-width] `}
            >
              About me
            </span>
          </NavLink>
        </div>
        <div className=" transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/contact-me"
          >
            {/* <i className="material-icons material-icons-round">email</i> */}
            <ContactPageIcon
              className={classNames(
                pathname === "/contact-me"
                  ? " text-primary"
                  : "iconFill-secondary text-white group hover:text-primary"
              )}
            />
            <span
              className={`${
                pathname === "/contact-me" ? "text-primary" : ""
              } max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[190px] transition-[max-width] `}
            >
              Contact me
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

// width 80px
// width 189.062px
export default Nav;

{
  // <NavLink
  //   className="flex items-center gap-2.5 no-underline text-lg hover:text-primary group"
  //   to="/contact-me"
  // >
  //   {/* <i className="material-icons material-icons-round">email</i> */}
  //   <ContactPageIcon
  //     className={classNames(
  //       pathname === "/contact-me"
  //         ? " text-primary"
  //         : "iconFill-secndary text-white group-hover:text-primary "
  //     )}
  //   />
  //   <span
  //     className={`${
  //       pathname === "/contact-me" ? "text-primary" : "group-hover:text-primary"
  //     } 
  //             max-w-0 opacity-0 group-hover:opacity-100`}
  //   >
  //     Contact me
  //   </span>
  // </NavLink>;
}
