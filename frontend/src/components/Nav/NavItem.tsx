import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  name: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ path, name }) => {
  return (
    <li>
      <Link to={path}>{name}</Link>
    </li>
  );
};

export default NavItem;
