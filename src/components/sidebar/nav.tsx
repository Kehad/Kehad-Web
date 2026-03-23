"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { 
  Home, 
  Code2, 
  Briefcase, 
  Layers, 
  User, 
  Mail 
} from "lucide-react";

/**
 * Navigation Sidebar component featuring smooth hover-to-expand labels.
 * Designed to maintain fixed icon positions while labels transition.
 */
const Nav = function () {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Skills", href: "/skills", icon: Code2 },
    { name: "Works", href: "/works", icon: Briefcase },
    { name: "Side project", href: "/side-project", icon: Layers },
    { name: "About me", href: "/about-me", icon: User },
    { name: "Contact me", href: "/contact-me", icon: Mail },
  ];

  return (
    <nav className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:block">
      <div
        className={classNames(
          "nav-div pointer-events-auto flex flex-col gap-8 justify-center rounded-[4rem] bg-sup w-max py-20 px-8",
          "shadow-2xl backdrop-blur-sm",
          "dark:bg-sup dark:text-white",
          "items-start"
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link group flex items-center no-underline outline-none"
            >
              <Icon
                className={classNames(
                  "transition-colors duration-300 flex-shrink-0",
                  isActive ? "text-primary" : "text-white group-hover:text-primary"
                )}
                size={22}
              />
              <span
                className={classNames(
                  "span-el",
                  isActive ? "text-primary max-w-[100px ml-4 font-semibold" : "text-white"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;