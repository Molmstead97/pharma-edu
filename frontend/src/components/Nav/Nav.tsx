import React from "react";
import routes from "../../routes";
import NavItem from "./NavItem";

const Nav: React.FC = () => {
  // Filter out routes that shouldn't appear in the navigation bar
  const navRoutes = routes.filter(
    (route) =>
      ![
        "RxItem",
        "DoctorProfile",
        "PatientProfile",
      ].includes(route.name)
  );

  return (
    <nav>
      <ul>
        {navRoutes.map((route) => (
          <NavItem key={route.path} name={route.name} path={route.path} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
