import React, { useState, useCallback } from "react";
import "./page-styles/main.css";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import axios from "axios";
//import { handleChange, handleSaveOrUpdate, handleSearch, handleClear, handleDelete } from "../handle-functions";

interface PatientInfo {
  [key: string]: string;
}

interface Prescription {
  rxNumber: number;
  prescriberId: number;
  prescriberFirstName: string;
  prescriberLastName: string;
  prescriberType: string;
  prescribedDate: string;
  rxItemName: string;
  rxItemStrength: string;
  quantity: number;
  refills: number;
  directions: string;
}

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "date" | "textarea" | "select";
  options?: { value: string; label: string }[];
};

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

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPatientFound, setIsPatientFound] = useState<boolean>(false);

  /* HANDLE CHANGE */
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setPatientInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    },
    []
  );

  /* HANDLE PRESCRIPTION SELECTION */
  const handlePrescriptionChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // Check if the event target is a select element
    if (e.target instanceof HTMLSelectElement) {
      const selectedRxNumber = e.target.value;
      const selectedPrescription = prescriptions.find(
        (prescription) => prescription.rxNumber.toString() === selectedRxNumber
      );

      setSelectedPrescription(selectedPrescription || null);

      // Populate prescription fields when a valid prescription is selected
      if (selectedPrescription) {
        setPatientInfo((prevInfo) => ({
          ...prevInfo,
          rxNumber: selectedPrescription.rxNumber.toString(),
          prescriberId: selectedPrescription.prescriberId.toString(),
          rxItemName: selectedPrescription.rxItemName,
          rxItemStrength: selectedPrescription.rxItemStrength,
          prescriberFirstName: selectedPrescription.prescriberFirstName,
          prescriberLastName: selectedPrescription.prescriberLastName,
          prescriberType: selectedPrescription.prescriberType,
          prescribedDate: selectedPrescription.prescribedDate,
          quantity: selectedPrescription.quantity.toString(),
          refills: selectedPrescription.refills.toString(),
          directions: selectedPrescription.directions,
        }));
      }
    }
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
      alert(
        `Patient information saved successfully. Patient ID: ${patientInfo.id}`
      );
    } catch (error) {
      console.error("Error saving new patient information:", error);
    }
  };

  const handleSaveWithConfirmation = (e: React.FormEvent) => {
    const confirmSave = window.confirm("Save information for this patient?");
    if (confirmSave) {
      handleSave(e); // Calls the existing save function
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
      alert(
        `Patient information updated successfully. Patient ID: ${patientInfo.id}`
      );
    } catch (error) {
      console.error("Error updating patient information:", error);
    }
  };

  const handleUpdateWithConfirmation = (e: React.FormEvent) => {
    const confirmSave = window.confirm("Update information for this patient?");
    if (confirmSave) {
      handleUpdate(e); // Calls the existing save function
    }
  };

  /* HANDLE SEARCH */
  const handleSearch = async (
    searchParams: { id?: number },
    entityType: string
  ) => {
    try {
      if (searchParams.id) {
        const response = await axios.get(
          `http://127.0.0.1:8000/${entityType}s/${searchParams.id}`
        );
        const data = response.data;

        if (data) {
          setPatientInfo({
            firstName: data.first_name,
            lastName: data.last_name,
            dob: data.date_of_birth,
            phoneNumber: data.phone_number,
            allergies: data.allergies,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zipcode,
            insuranceName: data.insurance_name,
            bin: data.insurance_rx_bin,
            pcn: data.insurance_rx_pcn,
            personCode: data.insurance_person_code,
            idNumber: data.insurance_member_id,
            groupNumber: data.insurance_group_number,
            id: data.id,
          });

          // Set prescriptions
          setPrescriptions(
            data.prescriptions.map((prescription: any) => ({
              rxNumber: prescription.rx_number,
              prescriberId: prescription.prescriber_id,
              prescriberFirstName: prescription.prescriber_first_name,
              prescriberLastName: prescription.prescriber_last_name,
              prescriberType: prescription.prescriber_type,
              prescribedDate: prescription.prescribed_date,
              rxItemName: prescription.rx_item_name,
              rxItemStrength: prescription.rx_item_strength,
              quantity: prescription.quantity,
              refills: prescription.refills,
              directions: prescription.directions,
            }))
          );

          setIsPatientFound(true);
        } else {
          console.log("No matching patient found.");
          alert("No matching patient found.");
          setIsPatientFound(false);
        }
      } else {
        console.log("No ID provided for search.");
        alert("No ID provided for search.");
        setIsPatientFound(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.error("Patient not found:", error.response.data);
        alert("Patient not found.");
        setIsPatientFound(false);
      } else {
        console.error("Error fetching patient data:", error);
        alert("An error occurred while searching for the patient.");
      }
    }
  };

  const handleClear = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the patient information?"
    );

    if (confirmClear) {
      // Reset the patientInfo state to empty values
      setPatientInfo({
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

      // Clear the selected prescription and prescriptions list
      setSelectedPrescription(null);
      setPrescriptions([]);
      setIsPatientFound(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/patients/${patientInfo.id}`);
        alert("Patient deleted successfully.");
        setPatientInfo({
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
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Error deleting patient.");
      }

      setSelectedPrescription(null);
      setPrescriptions([]);
      setIsPatientFound(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const generalFields: FieldConfig[] = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "phoneNumber", label: "Phone Number" },
    { name: "allergies", label: "Allergies", type: "textarea" },
  ];

  const prescriptionFields: FieldConfig[] = [
    { name: "rxNumber", label: "Rx Number" },
    { name: "prescriberId", label: "Prescriber ID" },
    { name: "prescriberFirstName", label: "Prescriber First Name" },
    { name: "prescriberLastName", label: "Prescriber Last Name" },
    { name: "prescriberType", label: "Prescriber Type" },
    { name: "prescribedDate", label: "Prescribed Date" },
    { name: "rxItemName", label: "Rx Item Name" },
    { name: "rxItemStrength", label: "Rx Item Strength" },
    { name: "quantity", label: "Quantity" },
    { name: "refills", label: "Refills" },
    { name: "directions", label: "Directions", type: "textarea" },
  ];

  const insuranceFields: FieldConfig[] = [
    { name: "insuranceName", label: "Insurance Name" },
    { name: "bin", label: "BIN" },
    { name: "pcn", label: "PCN" },
    { name: "personCode", label: "Person Code" },
    { name: "idNumber", label: "ID Number" },
    { name: "groupNumber", label: "Group Number" },
  ];

  const addressFields: FieldConfig[] = [
    { name: "street", label: "Street" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "zip", label: "ZIP" },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Patient Profile</h1>
      </div>

      <form
        onSubmit={isPatientFound ? handleUpdate : handleSave}
        className="form-grid"
      >
        <div className="form-box">
          <h2>Patient Info</h2>
          {generalFields.map(({ name, label, type }) => (
            <InputField
              key={name}
              name={name}
              value={patientInfo[name] || ""}
              label={label}
              onChange={handleChange}
              type={type || "text"}
              readOnly={false}
            />
          ))}
        </div>

        <div className="form-box">
          <h2>Prescriptions</h2>
          <InputField
            label="Select Prescription"
            name="selectedPrescription"
            type="select"
            options={prescriptions.map((prescription) => ({
              value: prescription.rxNumber.toString(),
              label: prescription.rxItemName,
            }))}
            value={selectedPrescription?.rxNumber.toString() || ""}
            onChange={handlePrescriptionChange}
          />
          {selectedPrescription &&
            prescriptionFields.map((field) => (
              <InputField
                key={field.name}
                name={field.name}
                value={patientInfo[field.name] || ""}
                label={field.label}
                type={field.type || "text"}
                onChange={handleChange}
                readOnly={
                  field.name === "rxNumber" || field.name === "prescriberId"
                }
              />
            ))}
        </div>

        <div className="form-box">
          <h2>Address Information</h2>
          {addressFields.map(({ name, label }) => (
            <InputField
              key={name}
              name={name}
              value={patientInfo[name]}
              label={label}
              onChange={handleChange}
              readOnly={false}
            />
          ))}
        </div>

        <div className="form-box">
          <h2>Insurance Information</h2>
          {insuranceFields.map(({ name, label }) => (
            <InputField
              key={name}
              name={name}
              value={patientInfo[name]}
              label={label}
              onChange={handleChange}
              readOnly={false}
            />
          ))}
        </div>

        <div className="actions">
          <div className="action-box">
            <button type="button" onClick={openModal} className="search">
              Search
            </button>
          </div>

          <div className="action-box">
            {isPatientFound ? (
              <button
                type="submit"
                className="save"
                onClick={handleUpdateWithConfirmation}
              >
                Update Patient
              </button>
            ) : (
              <button
                type="submit"
                className="save"
                onClick={handleSaveWithConfirmation}
              >
                Save
              </button>
            )}
          </div>

          <div className="action-box">
            <button type="button" className="clear" onClick={handleClear}>
              Clear
            </button>
          </div>
          <div className="action-box">
            <button type="button" className="delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSearch={handleSearch}
        entityType="patient"
      />
    </div>
  );
};

export default PatientProfile;
