import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const NavMobile = function () {
  const { pathname } = useLocation();
  console.log(pathname);

  // const navLinkStyles = ({ isActive }) => {
  //   return {
  //     color: isActive ? '#07c514' : '#fff',
  //     fill: isActive ? '#07c514' : '#fff',
  //   };
  // };

  return (
    <nav className="">
      <div className="lg:flex flex-col justify-center w-max pt-20 pb-20 gap-4 transition transition-all duration-500 sm:flex  dark:text-white  block sm:block md:hidden">
        <div className="my-4 transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/home"
          >
            {/* <span className="material-symbols-rounded">home</span> */}
            <HomeIcon
              className={classNames(
                pathname === '/home'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )}
            />
            <span className={`${pathname === '/home' ? 'text-primary' : ''}  `}>
              Home
            </span>
          </NavLink>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/about-me"
          >
            {/* <i className="material-icons material-icons-round">person</i> */}
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
              } hidde group-hover:fle`}
            >
              About me
            </span>
          </NavLink>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/skills"
          >
            {/* <i className="material-icons material-icons-round"> */}
            {/* integration_instructions */}
            {/* </i> */}
            <IntegrationInstructionsIcon
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
          </NavLink>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/works"
          >
            {/* <i className="material-icons material-icons-round">work</i> */}
            <WorkspacesIcon
              className={classNames(
                pathname === '/works'
                  ? ' text-primary'
                  : 'iconFill-secondary text-white hover:text-primary'
              )}
            />
            <span className={`${pathname === '/works' ? 'text-primary' : ''} `}>
              Works
            </span>
          </NavLink>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition transition-all duration-500 hover:text-primary"
            to="/side-project"
          >
            {/* <i className="material-icons material-icons-round">workspaces</i> */}
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
              } `}
            >
              Side project
            </span>
          </NavLink>
        </div>
        <div className="my-4 transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition  transition-all duration-500 group hover:text-primary"
            to="/contact-me"
          >
            {/* <i className="material-icons material-icons-round">email</i> */}
            <ContactPageIcon
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
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavMobile;

{
  /* <div className={classes["nav__container---box"]}>
  <NavLink
    className={classes["nav__container---box--link"]}
    style=""
    to="/home"
  >
    <i className="material-icons material-icons-round">home</i>
    <i className="fa fa-bullseye nav__container---box--icon"></i>
    <span className={classes["nav__container---box--name"]}>Home</span>
  </NavLink>
</div>; */
}
