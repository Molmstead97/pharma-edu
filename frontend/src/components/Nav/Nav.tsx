import React from "react";
import NavItem from "./NavItem";
import routes from "../../routes";

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        {routes.map((item, index) => (
          <NavItem key={index} routeName={item.name} path={item.path} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
