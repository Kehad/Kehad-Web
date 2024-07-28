import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ContactPageIcon from '@mui/icons-material/ContactPage';

import './navClone.css'

const Navigation = () => {
  const menuItems = [
    {
      href: '/home',
      iconPath: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      label: 'Home',
    },
    {
      href: '/skills',
      iconPath: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-8 11.17-1.41 1.42L6 12l3.59-3.59L11 9.83 8.83 12zm1-9.92c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75m2.41 11.34L13 14.17 15.17 12 13 9.83l1.41-1.42L18 12z',
      label: 'Skills',
    },
    {
      href: '/works',
      iconPath: 'M6 13c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m6-10C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4m6 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4',
      label: 'Works',
    },
    {
      href: '/side-project',
      iconPath: 'M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l2.31 1.84zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28m-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6',
      label: 'Side project',
    },
    {
      href: '/about-me',
      iconPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4',
      label: 'About me',
    },
  ];

  return (
    <div className="flex flex-col items-start space-y-4 min-h-screen bg-red-600 p-4">
      {menuItems.map((item, index) => (
        <div key={index} className="relative group my-4 transition-all duration-500">
          <a
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition-all duration-500 hover:text-primary group"
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
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

const NavClone = function (props) {

  const { pathname } = useLocation();

  const [isMenuActive, setIsMenuActive] = useState(false);

  const falseMenuHandler = () => {
    setIsMenuActive(false);
  };


  return (
  // <nav className="fixed bottom-[0%] transform trnslate-y-1/2">
  <nav className="">
      <div className='nav'>
        <div className="nav__div">
          <NavLink
            className="nav__div---link"
            to="/home"
          >
            <HomeIcon
              className={`${classNames(
                pathname === '/home'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )} nav__div---link--icon`}
            />
            <span
              className={`${
                pathname === '/home' ? 'text-primary' : ''
              } nav__div---link--span`}
            >
              Home
            </span>
          </NavLink>
        </div>
        <div className="nav__div">
          <NavLink
            className="nav__div---link"
            to="/skills"
          >
            <IntegrationInstructionsIcon
              className={classNames(
                pathname === '/skills'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )}
            />
            <span
              className={`${
                pathname === '/skills' ? 'text-primary' : ''
              } nav__div---link--span "`}
            >
              Skills
            </span>
          </NavLink>
        </div>
        <div className="nav__div">
          <NavLink
            className="nav__div---link"
            to="/works"
          >
            {/* <i className="material-icons material-icons-round">work</i> */}
            <WorkspacesIcon
              className={`${classNames(
                pathname === '/works'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )} nav__div---link--icon`}
            />
            <span
              className={`${
                pathname === '/works' ? 'text-primary' : ''
              } nav__div---link--span`}
            >
              Works
            </span>
          </NavLink>
        </div>
        <div className="nav__div">
          <NavLink
            className="nav__div---link"
            to="/side-project"
          >
            <WorkspacePremiumIcon
              className={classNames(
                pathname === '/side-project'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary '
              )}
            />
            <span
              className={`${
                pathname === '/side-project' ? 'text-primary' : ''
              } nav__div---link--span`}
            >
              Side project
            </span>
          </NavLink>
        </div>
        <div className="nav__div">
          <NavLink
            className="nav__div---link"
            to="/about-me"
          >
            <PersonIcon
              className={classNames(
                pathname === '/about-me'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )}
            />
            <span
              className={`${
                pathname === '/about-me' ? 'text-primary' : ''
              } nav__div---link--span`}
            >
              About me
            </span>
          </NavLink>
        </div>
        <div className="nav__div">
          <NavLink
            className="nav__div---link"
            to="/contact-me"
          >
            <ContactPageIcon
              className={classNames(
                pathname === '/contact-me'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white group hover:text-primary'
              )}
            />
            <span
              className={`${
                pathname === '/contact-me' ? 'text-primary' : ''
              } nav__div---link--span`}
            >
              Contact me
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavClone;

