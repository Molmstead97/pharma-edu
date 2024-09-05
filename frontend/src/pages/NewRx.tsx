import React, { useState } from "react";
import "./page-styles/NewRx.css";
import Modal from "../components/Modal";
import axios from "axios";

interface RxData {
  [key: string]: string;
}

const Prescription: React.FC = () => {
  const [rxInfo, setRxInfo] = useState<RxData>({
    rxNumber: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRxInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rxInfo.rx_number) {
      console.error("Prescription ID is missing. Cannot save data.");
      return;
    }
      
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/prescriptions/${rxInfo.rx_number}`,
        {
          patient_id: rxInfo.patientId,
          prescriber_id: rxInfo.prescriberId,
          prescribed_date: rxInfo.prescribedDate,
          rx_item_id: rxInfo.rxItemId,
          directions: rxInfo.directions,
          quantity: rxInfo.quantity,
          quantity_dispensed: rxInfo.quantityDispensed,
          refills: rxInfo.refills,
          status: rxInfo.status,
          tech_initals: rxInfo.techInitials,
        }
      );
      console.log("Prescription information saved successfully:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error saving prescription information:", error.response.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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
        const rxNumber = searchData[0].rx_number; 
        const detailResponse = await axios.get(
          `http://127.0.0.1:8000/patients/${patientId}`
        );
        const prescriptionDetails = detailResponse.data;

        // Transform data to match frontend field names
        setRxInfo({
          id: rxNumber,
          patientId: prescriptionDetails.patient_id,
          prescriberId: prescriptionDetails.prescriber_id,
          prescribedDate: prescriptionDetails.prescribed_date,
          rxItemId: prescriptionDetails.rx_item_id,
          directions: prescriptionDetails.directions,
          quantity: prescriptionDetails.quantity,
          quantityDispensed: prescriptionDetails.quantity_dispensed,
          refills: prescriptionDetails.refills,
          status: prescriptionDetails.status,
          techInitials: prescriptionDetails.tech_initals,
        });
      } else {
        console.log("No matching prescriptions found.");
      }
    } catch (error) {
      console.error("Error fetching prescription data:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const InputField: React.FC<{
    name: string;
    value: string;
    label: string;
}> = ({ name, value, label }) => (
    <label>
        {label}:
        {name === "directions" ? (
            <textarea
                name={name}
                value={value || ""}
                onChange={handleChange}
            />
        ) : (
            <input
                type="text"
                name={name}
                value={value || ""}
                onChange={handleChange}
            />
        )}
    </label>
);

  return (
    <div className="rx-profile">
      <div className="header">
        <h1>Prescription</h1>
      </div>
      <div className="info-section">
        <div className="form-box general-info">
          <h2>General Information</h2>
          {[
            { name: "patientId", label: "Patient ID" },
            { name: "presciberId", label: "Prescriber ID" },
            { name: "prescribedDate", label: "Prescribed Date" },
            { name: "rxItemId", label: "Rx Item ID" },
            { name: "directions", label: "Directions" },
            { name: "quantity", label: "Quantity" },
            { name: "quantityDispensed", label: "Quantity Dispensed" },
            { name: "refills", label: "Refills" },
            { name: "status", label: "Status" },
            { name: "techInitials", label: "Tech Initials" },
          ].map(({ name, label }) => (
            <InputField
              key={name}
              name={name}
              value={rxInfo[name]}
              label={label}
            />
          ))}
        </div>
      </div>
      <div className="actions">
        <button onClick={handleSave}>Save</button>
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

export default Prescription;
