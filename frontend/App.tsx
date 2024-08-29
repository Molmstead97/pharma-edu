import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import routes from "./routes";

const App: React.FC = () => {
  return (
    <div>
      <Nav />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default App;