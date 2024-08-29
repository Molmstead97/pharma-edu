import Home from "./pages/Home";
import NewRx from "./pages/NewRx";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";

interface PharmacyRoutes {
  name: string;
  path: string;
  component: React.FC;
}

const routes: PharmacyRoutes[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "New Rx",
    path: "/new-rx",
    component: NewRx,
  },
  {
    name: "Patients",
    path: "/patients",
    component: Patients,
  },
  {
    name: "Doctors",
    path: "/doctors",
    component: Doctors,
  },
];

export default routes;