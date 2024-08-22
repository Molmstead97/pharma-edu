import { FC } from "react";
import Home from "./pages/Home";
import NewRx from "./pages/NewRx";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import { RxItem, RxItemProps } from "./components/styles/RxItem/RxItem";
import { DoctorProfile, DoctorProfileProps } from "./components/styles/DoctorProfile/DoctorProfile";
import { PatientProfile, PatientProfileProps } from "./components/styles/PatientProfile/PatientProfile";

interface MainRoutes<T = {}> {
  name: string;
  path: string;
  component: React.FC<T>;
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
  {
    name: "RxItem",
    path: "/rxitem",
    component: RxItem as React.FC<RxItemProps>,
  },
  {
    name: "DoctorProfile",
    path: "/doctorprofile",
    component: DoctorProfile as React.FC<DoctorProfileProps>,
  },
  {
    name: "PatientProfile",
    path: "/patientprofile",
    component: PatientProfile as React.FC<PatientProfileProps>,
  },
];

export default routes;
