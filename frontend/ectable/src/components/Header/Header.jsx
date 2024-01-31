import { useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";

const NavLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/restaurantList",
    display: "Restaurants",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  return (
    <header className="header flex items-center">
      <div className="container flex items-center justify-between w-full">
        {/*====logo *=====*/}
        <div>
          <img src={logo} alt="logo" />
        </div>

        {/**========Menu */}
        <div className="navigation">
          <ul className="menu flex items-center gap-[2.7rem]">
            {NavLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-primary-Color text-[16px] leading-7 font-[600]"
                      : "text-text-Color text-[16px] leading-7 font-[500] hover:text-primary-Color"
                  }
                  activeClassName="active"
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
