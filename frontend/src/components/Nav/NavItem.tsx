import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
    routeName: string,
    path: string
}

const NavItem: React.FC<NavItemProps> = ({ routeName, path }) => {
  return <Link to={path}>{routeName}</Link>;
};

export default NavItem;
