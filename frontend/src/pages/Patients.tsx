import React, { useState } from "react";
import "./page-styles/Patients.css";
import Modal from "../components/Modal";
import axios from "axios";

// Simplified PatientInfo type
interface PatientInfo {
  [key: string]: string;
}

const PatientProfile: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    allergies: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    insuranceName: "",
    bin: "",
    pcn: "",
    personCode: "",
    idNumber: "",
    groupNumber: "",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPatientFound, setIsPatientFound] = useState<boolean>(false); // Tracks if a patient was found

  /* HANDLE CHANGE */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  /* HANDLE SAVE (POST) */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8000/patients`, {
        first_name: patientInfo.firstName,
        last_name: patientInfo.lastName,
        date_of_birth: patientInfo.dob,
        phone_number: patientInfo.phoneNumber,
        allergies: patientInfo.allergies,
        street: patientInfo.street,
        city: patientInfo.city,
        state: patientInfo.state,
        zipcode: patientInfo.zip,
        insurance_name: patientInfo.insuranceName,
        insurance_rx_bin: patientInfo.bin,
        insurance_rx_pcn: patientInfo.pcn,
        insurance_person_code: patientInfo.personCode,
        insurance_member_id: patientInfo.idNumber,
        insurance_group_number: patientInfo.groupNumber,
      });
      console.log("New patient saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving new patient information:", error);
    }
  };

  /* HANDLE UPDATE (PATCH) */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/patients/${patientInfo.id}`,
        {
          first_name: patientInfo.firstName,
          last_name: patientInfo.lastName,
          date_of_birth: patientInfo.dob,
          phone_number: patientInfo.phoneNumber,
          allergies: patientInfo.allergies,
          street: patientInfo.street,
          city: patientInfo.city,
          state: patientInfo.state,
          zipcode: patientInfo.zip,
          insurance_name: patientInfo.insuranceName,
          insurance_rx_bin: patientInfo.bin,
          insurance_rx_pcn: patientInfo.pcn,
          insurance_person_code: patientInfo.personCode,
          insurance_member_id: patientInfo.idNumber,
          insurance_group_number: patientInfo.groupNumber,
        }
      );
      console.log("Patient information updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating patient information:", error);
    }
  };

  /* HANDLE SEARCH */
  const handleSearch = async (searchParams: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
  }) => {
    try {
      const searchResponse = await axios.get("http://127.0.0.1:8000/patients", {
        params: searchParams,
      });
      const searchData = searchResponse.data;

      if (searchData && searchData.length > 0) {
        const patientId = searchData[0].id; // Assuming the searchData includes an "id" field
        const detailResponse = await axios.get(
          `http://127.0.0.1:8000/patients/${patientId}`
        );
        const patientDetails = detailResponse.data;

        setPatientInfo({
          firstName: patientDetails.first_name,
          lastName: patientDetails.last_name,
          dob: patientDetails.date_of_birth,
          phoneNumber: patientDetails.phone_number,
          allergies: patientDetails.allergies,
          street: patientDetails.street,
          city: patientDetails.city,
          state: patientDetails.state,
          zip: patientDetails.zipcode,
          insuranceName: patientDetails.insurance_name,
          bin: patientDetails.insurance_rx_bin,
          pcn: patientDetails.insurance_rx_pcn,
          personCode: patientDetails.insurance_person_code,
          idNumber: patientDetails.insurance_member_id,
          groupNumber: patientDetails.insurance_group_number,
          id: patientId, // Store the patient ID
        });

        setIsPatientFound(true); // Set to true as we found a patient
      } else {
        console.log("No matching patients found.");
        setIsPatientFound(false); // No patient found, switch to "save" mode
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* COMPONENT FOR ALL INPUT FIELDS */
  const InputField: React.FC<{
    name: string;
    value: string;
    label: string;
  }> = ({ name, value, label }) => (
    <label>
      {label}:
      <input
        type={name === "dob" ? "date" : "text"}
        name={name}
        value={value || ""}
        onChange={handleChange}
      />
    </label>
  );

  return (
    <div className="patient-profile">
      <div className="header">
        <h1>Patient Profile</h1>
      </div>
      <div className="info-section">
        <div className="form-box general-info">
          <h2>General Information</h2>
          {[
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "dob", label: "Date of Birth" },
            { name: "phoneNumber", label: "Phone Number" },
            { name: "allergies", label: "Allergies" },
          ].map(({ name, label }) => (
            <InputField
              key={name}
              name={name}
              value={patientInfo[name]}
              label={label}
            />
          ))}
          {/* Address Information */}
          <div>
            <h2>Address Information</h2>
            {[
              { name: "street", label: "Street" },
              { name: "city", label: "City" },
              { name: "state", label: "State" },
              { name: "zip", label: "Zip" },
            ].map(({ name, label }) => (
              <InputField
                key={name}
                name={name}
                value={patientInfo[name]}
                label={label}
              />
            ))}
          </div>
        </div>
        <div className="form-box insurance-info">
          <h2>Insurance Info</h2>
          {[
            { name: "insuranceName", label: "Name" },
            { name: "idNumber", label: "Member ID #" },
            { name: "groupNumber", label: "Group #" },
            { name: "bin", label: "BIN" },
            { name: "pcn", label: "PCN" },
            { name: "personCode", label: "Person Code" },
          ].map(({ name, label }) => (
            <InputField
              key={name}
              name={name}
              value={patientInfo[name]}
              label={label}
            />
          ))}
        </div>
      </div>
      <div className="actions">
        {/* Dynamically render the button based on whether a patient was found */}
        {isPatientFound ? (
          <button onClick={handleUpdate}>Update Patient</button>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
        <button type="button" onClick={openModal}>
          Search
        </button>
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



