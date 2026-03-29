"use client";
import { Home, User, Code, Briefcase, Award, Contact, X } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { menuHandler, themeHandler } from '../../redux/menuSlice';
import { motion } from 'framer-motion';
import Toggle from '../header/toggleMode';

const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Skills', href: '/skills', icon: Code },
  { name: 'Works', href: '/works', icon: Briefcase },
  { name: 'Side project', href: '/side-project', icon: Award },
  { name: 'About me', href: '/about-me', icon: User },
  { name: 'Contact me', href: '/contact-me', icon: Contact },
];

const NavMobile = function ({ navStatus }: any) {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.menu.themeState);
  const pathname = usePathname();

  const handleNavStatus = () => {
    dispatch(menuHandler(false));
    // Keep theme consistent on click
    const targetTheme = (theme === 'system' || theme === 'dark') ? 'dark' : 'light';
    dispatch(themeHandler(targetTheme));
  };

  return (
    // Removed md:hidden temporarily so you can see it during development
    <motion.nav 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed w-[50%] inset-0 z-[110] bg-[#1a1a1a] p-10 md:relative md:bg-transparent flex flex-col justify-between"
    >
      <div>
        <button 
          onClick={handleNavStatus}
          className="absolute top-8 right-8 text-white hover:text-primary hover:rotate-90 transition-all duration-300 md:hidden"
          aria-label="Close menu"
        >
          <X size={36} />
        </button>

        <div className="flex flex-col gap-6 mt-12 md:mt-0">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <div key={link.href} className="transition-all duration-500">
                <Link
                  href={link.href}
                  onClick={handleNavStatus}
                  className="flex items-center gap-4 text-lg font-josefin-sans hover:text-primary transition-colors"
                >
                  <Icon
                    className={classNames(
                      "w-6 h-6",
                      isActive ? 'text-primary' : 'text-white'
                    )}
                  />
                  <span className={isActive ? 'text-primary' : 'text-white'}>
                    {link.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Theme Toggle for mobile view */}
      <div className="md:hidden pb-10">
        <Toggle />
      </div>
    </motion.nav>
  );
};

export default NavMobile;