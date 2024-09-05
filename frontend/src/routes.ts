import Home from "./pages/Home";
import NewRx from "./pages/NewRx";
import RxItem from "./pages/RxItem";
import Patients from "./pages/Patients";
import Prescribers from "./pages/Prescribers";

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
    name: "Rx Item",
    path: "/rx-item",
    component: RxItem,
  },
  {
    name: "Patients",
    path: "/patients",
    component: Patients,
  },
  {
    name: "Prescribers",
    path: "/prescribers",
    component: Prescribers,
  },
];

export default routes;
