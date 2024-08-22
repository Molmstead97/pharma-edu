import Home from "./pages/Home";
import NewRx from "./pages/NewRx";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";

interface MainRoutes {
  name: string;
  path: string;
  component: React.FC;
}

const routes: MainRoutes[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "NewRx",
    path: "/new-rx",
    component: NewRx,
  },
  {
    name: "Doctors",
    path: "/doctors",
    component: Doctors,
  },
  {
    name: "Patients",
    path: "/patients",
    component: Patients,
  },
];

export default routes;
