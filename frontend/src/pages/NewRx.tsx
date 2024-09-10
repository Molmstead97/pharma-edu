import React, { useState, useCallback, useMemo } from "react";
import "./page-styles/Prescribers.css";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import axios from "axios";

interface PrescriptionData {
  [key: string]: string | number;
}

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "date" | "textarea" | "tel" | "number" | "select";
};

const NewRx: React.FC = () => {
  const [prescriptionInfo, setPrescriptionInfo] = useState<PrescriptionData>({
    patientId: "",
    prescriberId: "",
    prescribedDate: "",
    rxItemId: "",
    directions: "",
    quantity: "",
    quantityDispensed: "",
    refills: "",
    status: "",
    techInitials: "",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPrescriptionFound, setIsPrescriptionFound] =
    useState<boolean>(false);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setPrescriptionInfo((prevInfo) => ({
        ...prevInfo,
        [name]:
          name === "patientId" || // Fixed typo
          name === "prescriberId" ||
          name === "rxItemId" ||
          name === "quantity" ||
          name === "quantityDispensed" ||
          name === "refills"
            ? parseFloat(value) || 0
            : value,
      }));
    },
    []
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any required fields are empty
    const { patientId, prescriberId, rxItemId } = prescriptionInfo;
    if (!patientId || !prescriberId || !rxItemId) {
      alert(
        "Please ensure all fields are filled out."
      );
      return;
    }

    try {
      // Perform checks to verify IDs
      const [patientCheck, prescriberCheck, rxItemCheck] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/patients/${patientId}`),
        axios.get(`http://127.0.0.1:8000/prescribers/${prescriberId}`),
        axios.get(`http://127.0.0.1:8000/rx-items/${rxItemId}`),
      ]);

      if (!patientCheck.data || !prescriberCheck.data || !rxItemCheck.data) {
        alert(
          "One or more of the IDs (Patient, Prescriber, Rx Item) do not exist in the database."
        );
        return;
      }

      // Proceed with saving the prescription
      const response = await axios.post(`http://127.0.0.1:8000/prescriptions`, {
        patient_id: prescriptionInfo.patientId,
        prescriber_id: prescriptionInfo.prescriberId,
        prescribed_date: prescriptionInfo.prescribedDate,
        rx_item_id: prescriptionInfo.rxItemId,
        directions: prescriptionInfo.directions,
        quantity: prescriptionInfo.quantity,
        quantity_dispensed: prescriptionInfo.quantityDispensed,
        refills: prescriptionInfo.refills,
        status: prescriptionInfo.status,
        tech_initials: prescriptionInfo.techInitials,
      });

      alert(
        `Prescription information saved successfully. Rx Number: ${response.data.rx_number}`
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Error saving prescription information:",
          error.response.data
        );
        alert("Error saving prescription information");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleSaveWithConfirmation = (e: React.FormEvent) => {
    const confirmSave = window.confirm(
      "Save information for this prescription?"
    );
    if (confirmSave) {
      handleSave(e); // Calls the existing save function
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check if any required fields are empty
    const { patientId, prescriberId, rxItemId } = prescriptionInfo;
    if (!patientId || !prescriberId || !rxItemId) {
      alert("Please ensure all required fields (Patient ID, Prescriber ID, Rx Item ID) are filled out.");
      return;
    }
  
    try {
      // Perform checks to verify IDs
      const [patientCheck, prescriberCheck, rxItemCheck] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/patients/${patientId}`),
        axios.get(`http://127.0.0.1:8000/prescribers/${prescriberId}`),
        axios.get(`http://127.0.0.1:8000/rx-items/${rxItemId}`)
      ]);
  
      if (!patientCheck.data || !prescriberCheck.data || !rxItemCheck.data) {
        alert("One or more of the IDs (Patient, Prescriber, Rx Item) do not exist in the database.");
        return;
      }
  
      // Proceed with updating the prescription
      const response = await axios.patch(`http://127.0.0.1:8000/prescriptions/${prescriptionInfo.id}`, {
        patient_id: prescriptionInfo.patientId,
        prescriber_id: prescriptionInfo.prescriberId,
        prescribed_date: prescriptionInfo.prescribedDate,
        rx_item_id: prescriptionInfo.rxItemId,
        directions: prescriptionInfo.directions,
        quantity: prescriptionInfo.quantity,
        quantity_dispensed: prescriptionInfo.quantityDispensed,
        refills: prescriptionInfo.refills,
        status: prescriptionInfo.status,
        tech_initials: prescriptionInfo.techInitials,
      });
      
      alert(`Prescription information updated successfully. Rx Number: ${response.data.rx_number}`);
    } catch (error) {
      console.error("Error updating prescription information:", error);
      alert("Error updating prescription information");
    }
  };
  

  const handleUpdateWithConfirmation = (e: React.FormEvent) => {
    const confirmSave = window.confirm(
      "Update information for this prescription?"
    );
    if (confirmSave) {
      handleUpdate(e); // Calls the existing save function
    }
  };

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
          setPrescriptionInfo({
            id: data.rx_number,
            patientId: data.patient_id,
            prescriberId: data.prescriber_id,
            prescribedDate: data.prescribed_date,
            rxItemId: data.rx_item_id,
            directions: data.directions,
            quantity: data.quantity,
            quantityDispensed: data.quantity_dispensed,
            refills: data.refills,
            status: data.status,
            techInitials: data.tech_initials,
          });

          setIsPrescriptionFound(true);
        } else {
          // If no data is found, show alert and switch to "save" mode
          console.log("No matching prescription found.");
          alert("No matching prescription found.");
          setIsPrescriptionFound(false); // No entity found
        }
      } else {
        // If no ID is provided, handle the case as needed
        console.log("No ID provided for search.");
        alert("No ID provided for search.");
        setIsPrescriptionFound(false); // No ID provided
      }
    } catch (error: any) {
      // Handle specific error cases, such as 404 or 500
      if (error.response && error.response.status === 404) {
        console.error("Prescription not found:", error.response.data);
        alert("Prescription not found.");
        setIsPrescriptionFound(false); // No entity found
      } else {
        // General error handling
        console.error("Error fetching prescription data:", error);
        alert("An error occurred while searching for the prescription.");
      }
    }
  };

  const handleClear = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the prescription information?"
    );

    if (confirmClear) {
      setPrescriptionInfo({
        patientId: "",
        prescriberId: "",
        prescribedDate: "",
        rxItemId: "",
        directions: "",
        quantity: "",
        quantityDispensed: "",
        refills: "",
        status: "",
        techInitials: "",
      });
      setIsPrescriptionFound(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const generalFields: FieldConfig[] = [
    { name: "patientId", label: "Patient ID", type: "number" },
    { name: "prescriberId", label: "Prescriber ID", type: "number" },
    { name: "prescribedDate", label: "Prescribed Date", type: "date" },
    { name: "rxItemId", label: "Rx Item ID", type: "number" },
    { name: "directions", label: "Directions", type: "textarea" },
  ];

  const additionalFields: FieldConfig[] = [
    { name: "quantity", label: "Quantity", type: "number" },
    { name: "quantityDispensed", label: "Quantity Dispensed", type: "number" },
    { name: "refills", label: "Refills", type: "number" },
    { name: "status", label: "Status" },
    { name: "techInitials", label: "Tech Initials" },
  ];

  const renderInputFields = useMemo(
    () => (
      <>
        <div className="form-box general-info">
          <h2>Prescription Information</h2>
          {generalFields.map(({ name, label, type }) => (
            <InputField
              key={name}
              name={name}
              value={prescriptionInfo[name]?.toString() || ""}
              label={label}
              onChange={handleChange}
              type={type}
            />
          ))}
        </div>
        <div className="form-box address-info">
          <h2>Additional Information</h2>
          {additionalFields.map(({ name, label, type }) => (
            <InputField
              key={name}
              name={name}
              value={prescriptionInfo[name]?.toString() || ""}
              label={label}
              onChange={handleChange}
              type={type}
            />
          ))}
        </div>
      </>
    ),
    [prescriptionInfo, handleChange]
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Prescription Profile</h1>
      </div>
      <div className="info-section">{renderInputFields}</div>
      <div className="actions">
        <div className="action-box">
          <button type="button" onClick={openModal} className="search">
            Search
          </button>
        </div>

        <div className="action-box">
          {isPrescriptionFound ? (
            <button
              type="submit"
              className="save"
              onClick={handleUpdateWithConfirmation} // Use the update handler here
            >
              Update Prescription
            </button>
          ) : (
            <button
              type="submit"
              className="save"
              onClick={handleSaveWithConfirmation} // Use the save handler here
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
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSearch={handleSearch}
        entityType="prescription"
      />
    </div>
  );
};

export default NewRx;
