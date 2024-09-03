import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  name: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ name, path }) => {
  return (
    <NavLink to={path} className="nav-item">
      {name}
    </NavLink>
  );
};

export default NavItem;
