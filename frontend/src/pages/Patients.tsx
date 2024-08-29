import React, { useState } from "react";
import "../page-styles/Patients.css";
import Modal from "../components/Modal";
import axios from "axios";

interface PatientInfo {
  lastName: string;
  firstName: string;
  contactNumber: string;
  contactEmail: string;
  dob: string;
  addressNumber: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  allergies: string;
  bin: string;
  pcn: string;
  personCode: string;
  idNumber: string;
  groupNumber: string;
}

const PatientProfile: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    lastName: "",
    firstName: "",
    contactNumber: "",
    contactEmail: "",
    dob: "",
    addressNumber: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    allergies: "",
    bin: "",
    pcn: "",
    personCode: "",
    idNumber: "",
    groupNumber: "",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientInfo({
      ...patientInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Logic to save the patient info
    console.log("Patient Info Saved", patientInfo);
  };

  const handleSearch = async (searchParams: { firstName?: string; lastName?: string; dateOfBirth?: string; }) => {
    try {
      const response = await axios.post("/api/patients/search", searchParams);
      const data = response.data;
  
      setPatientInfo(prevInfo => ({
        ...prevInfo,
        ...data, // Spread the response data directly into the patientInfo state
      }));
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="patient-profile">
      <div className="header">
        <h1>Patient Profile</h1>
        <div className="logo">
          <img src="path-to-logo" alt="Logo" />
        </div>
      </div>
      <div className="info-section">
        <div className="form-box general-info">
          <h2>General Information</h2>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={patientInfo?.firstName || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={patientInfo?.lastName || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Contact #:
            <input
              type="text"
              name="contactNumber"
              value={patientInfo?.contactNumber || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Contact Email:
            <input
              type="text"
              name="contactEmail"
              value={patientInfo?.contactEmail || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={patientInfo?.dob || ''}
              onChange={handleChange}
            />
          </label>
          {/* Address Information */}
          <div>
            <h2>Address Information</h2>
          </div>
          <label>
            Number:
            <input
              type="text"
              name="addressNumber"
              value={patientInfo?.addressNumber || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Street:
            <input
              type="text"
              name="street"
              value={patientInfo?.street || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={patientInfo?.city || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={patientInfo?.state || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Zip Code:
            <input
              type="text"
              name="zip"
              value={patientInfo?.zip || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Allergies:
            <input
              type="text"
              name="allergies"
              value={patientInfo?.allergies || ''}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-box insurance-info">
          <h2>Insurance Info</h2>
          <label>
            ID#:
            <input
              type="text"
              name="idNumber"
              value={patientInfo?.idNumber || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Group #:
            <input
              type="text"
              name="groupNumber"
              value={patientInfo?.groupNumber || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Bin:
            <input
              type="text"
              name="bin"
              value={patientInfo?.bin || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            PCN:
            <input
              type="text"
              name="pcn"
              value={patientInfo?.pcn || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Person Code:
            <input
              type="text"
              name="personCode"
              value={patientInfo?.personCode || ''}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <div className="actions">
        <button onClick={handleSave}>Save Info</button>
        <button onClick={openModal}>Search</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSearch={handleSearch}
        fields={["firstName", "lastName", "dateOfBirth"]}
      />
    </div>
  );
};

export default PatientProfile;
