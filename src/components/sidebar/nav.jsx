import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const Nav = function () {
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
      <div className="flex flex-col justify-center rounded-7 bg-sup w-max pt-20 pb-20 lg:pr-10 md:pr-6 lg:pl-10 md:pl-6  gap-4 transition transition-all duration-500 border-1 border-sub group hover:flex dark:bg-mainOpacity dark:text-white dark:border-primary dark:border-1 sm:hidden md:block">
        <div className=" my-4 transition transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2  font-josefin-sans transition transition-all duration-500 hover:text-primary"
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
            <span
              className={`${
                pathname === '/home' ? 'text-primary' : ''
              } hidden group-hover:flex `}
            >
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
              } hidden group-hover:flex`}
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
              className={`${
                pathname === '/skills' ? 'text-primary' : ''
              } hidden group-hover:flex`}
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
            <span
              className={`${
                pathname === '/works' ? 'text-primary' : ''
              } hidden group-hover:flex`}
            >
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
              } hidden group-hover:flex`}
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
              className={`${
                pathname === '/contact-me' ? 'text-primary' : ''
              } hidden group-hover:flex`}
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
