import React from "react";
import NavItem from "./NavItem";
import routes from "../routes";
import "./component-styles/Nav.css"

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <NavItem name={route.name} path={route.path} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
