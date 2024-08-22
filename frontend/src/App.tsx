import "./App.css";

import Nav from "./components/Nav/Nav";
import NavItem from "./components/Nav/NavItem";

import routes from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { DoctorProfileScreen } from "./components/DoctorProfileScreen/DoctorProfileScreen";
import { DoctorSearchScreen } from "./components/DoctorSearchScreen/DoctorSearchScreen";
import { NewPatientScreen } from "./components/NewPatientScreen/NewPatientScreen";
import { NewPrescriptionScreen } from "./components/NewPrescriptionScreen/NewPrescriptionScreen";
import { NewRxPageScreen } from "./components/NewRxPageScreen/NewRxPageScreen";
import { PatientProfileScreen } from "./components/PatientProfileScreen/PatientProfileScreen";
import { PatientSearchScreen } from "./components/PatientSearchScreen/PatientSearchScreen";
import { RxItemScreen } from "./components/RxItemScreen/RxItemScreen";

function App() {
  return (
    <BrowserRouter>
      <Nav>
        {routes.map((item, index) => (
          <NavItem key={index} routeName={item.name} path={item.path} />
        ))}
      </Nav>
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={item.component} />
        ))}
        <Route path="/doctor-search" element={<DoctorSearchScreen />} />
        <Route path="/doctor-profile" element={<DoctorProfileScreen />} />
        <Route path="/doctor-profile" element={<DoctorProfileScreen />} />
        <Route path="/doctor-profile" element={<DoctorProfileScreen />} />
        <Route path="/doctor-profile" element={<DoctorProfileScreen />} />
        <Route path="/doctor-profile" element={<DoctorProfileScreen />} />
        <Route path="/doctor-profile" element={<DoctorProfileScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
