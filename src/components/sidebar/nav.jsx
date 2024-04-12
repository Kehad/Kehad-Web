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
      <div className="flex flex-col justify-center rounded-7 bg-sub w-max pt-20 pb-20 pr-10 pl-10 gap-4 transition-all duration-500 group hover:flex">
        <div className=" my-4 transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition-all duration-500 hover:text-green-500"
            to="/home"
          >
            {/* <span className="material-symbols-rounded">home</span> */}
            <HomeIcon
              className={classNames(
                pathname === '/home'
                  ? ' text-green-500'
                  : 'iconFill-secondary text-red-500 hover:text-green-500'
              )}
            />
            <span className="hidden group-hover:flex">Home</span>
          </NavLink>
        </div>
        <div className="my-4 transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition-all duration-500 hover:text-green-500"
            to="/about-me"
          >
            {/* <i className="material-icons material-icons-round">person</i> */}
            <PersonIcon
              className={classNames(
                pathname === '/about-me'
                  ? ' text-green-500'
                  : 'iconFill-secondary text-red-500 hover:text-green-500'
              )}
            />
            <span className="hidden group-hover:flex">About me</span>
          </NavLink>
        </div>
        <div className="my-4 transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition-all duration-500 hover:text-green-500"
            to="/skills"
          >
            {/* <i className="material-icons material-icons-round"> */}
            {/* integration_instructions */}
            {/* </i> */}
            <IntegrationInstructionsIcon
              className={classNames(
                pathname === '/skills'
                  ? ' text-green-500'
                  : 'iconFill-secondary text-red-500 hover:text-green-500'
              )}
            />
            <span className="hidden group-hover:flex">Skills</span>
          </NavLink>
        </div>
        <div className="my-4 transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition-all duration-500 hover:text-green-500"
            to="/works"
          >
            {/* <i className="material-icons material-icons-round">work</i> */}
            <WorkspacesIcon
              className={classNames(
                pathname === '/works'
                  ? ' text-green-500'
                  : 'iconFill-secondary text-red-500 hover:text-green-500'
              )}
            />
            <span className="hidden group-hover:flex">Works</span>
          </NavLink>
        </div>
        <div className="my-4 transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition-all duration-500 hover:text-green-500"
            to="/side-project"
          >
            {/* <i className="material-icons material-icons-round">workspaces</i> */}
            <WorkspacePremiumIcon
              className={classNames(
                pathname === '/side-project'
                  ? ' text-green-500'
                  : 'iconFill-secondary text-red-500 hover:text-green-500'
              )}
            />
            <span className="hidden group-hover:flex">Side project</span>
          </NavLink>
        </div>
        <div className="my-4 transition-all duration-500">
          <NavLink
            className="flex items-center text-base no-underline gap-3.5 text-lg ml-2 font-josefin-sans transition-all duration-500 group hover:text-green-500"
            to="/contact"
          >
            {/* <i className="material-icons material-icons-round">email</i> */}
            <ContactPageIcon
              className={classNames(
                pathname === '/contact'
                  ? ' text-green-500'
                  : 'iconFill-secondary text-red-500 group hover:text-green-500'
              )}
            />
            <span
              className={
                (classNames(pathname === '/contact' ? 'text-green-500' : ''),
                'hidden group-hover:flex ')
              }
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
