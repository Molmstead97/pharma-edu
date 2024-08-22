import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import routes from "./routes";

const App: React.FC = () => {
  return (
    <Router basename="/pharma-edu/">
      <Nav />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
