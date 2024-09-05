import React, { useState } from "react";
import "./page-styles/Prescribers.css";
import Modal from "../components/Modal";
import axios from "axios";

interface PrescriberInfo {
  [key: string]: string;
}

const PrescriberProfile: React.FC = () => {
  const [prescriberInfo, setPrescriberInfo] = useState<PrescriberInfo>({
    id: "",
    firstName: "",
    lastName: "",
    prescriberType: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    contactNumber: "",
    dea: "",
    npi: "",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrescriberInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prescriberInfo.id) {
      console.error("Prescriber ID is missing. Cannot save data.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/prescribers/${prescriberInfo.id}`,
        {
          first_name: prescriberInfo.firstName,
          last_name: prescriberInfo.lastName,
          prescriber_type: prescriberInfo.prescriberType,
          street: prescriberInfo.street,
          city: prescriberInfo.city,
          state: prescriberInfo.state,
          zipcode: prescriberInfo.zip,
          contact_number: prescriberInfo.contactNumber,
          dea: prescriberInfo.dea,
          npi: prescriberInfo.npi,
        }
      );
      console.log("Prescriber information saved successfully:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error saving prescriber information:", error.response.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleSearch = async (searchParams: {
    firstName?: string;
    lastName?: string;
  }) => {
    try {
      const searchResponse = await axios.get(
        "http://127.0.0.1:8000/prescribers",
        { params: searchParams }
      );
      const searchData = searchResponse.data;

      if (searchData && searchData.length > 0) {
        const prescriberId = searchData[0].id;
        const detailResponse = await axios.get(
          `http://127.0.0.1:8000/prescribers/${prescriberId}`
        );
        const prescriberDetails = detailResponse.data;

        // Transform data to match frontend field names
        setPrescriberInfo({
          id: prescriberId,
          firstName: prescriberDetails.first_name,
          lastName: prescriberDetails.last_name,
          prescriberType: prescriberDetails.prescriber_type,
          street: prescriberDetails.street,
          city: prescriberDetails.city,
          state: prescriberDetails.state,
          zip: prescriberDetails.zipcode,
          contactNumber: prescriberDetails.contact_number,
          dea: prescriberDetails.dea,
          npi: prescriberDetails.npi,
        });
      } else {
        console.log("No matching prescribers found.");
      }
    } catch (error) {
      console.error("Error fetching prescriber data:", error);
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
      <input
        type={name === "dob" ? "date" : "text"}
        name={name}
        value={value || ""}
        onChange={handleChange}
      />
    </label>
  );

  return (
    <div className="prescriber-profile">
      <div className="header">
        <h1>Prescriber Profile</h1>
      </div>
      <div className="info-section">
        <div className="form-box general-info">
          <h2>General Information</h2>
          {[
            { name: "prescriberId", label: "Prescriber ID" },
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "prescriberType", label: "Prescriber Type" },
            { name: "contactNumber", label: "Contact Number" },
            { name: "dea", label: "DEA" },
            { name: "npi", label: "NPI" },
          ].map(({ name, label }) => (
            <InputField
              key={name}
              name={name}
              value={prescriberInfo[name]}
              label={label}
            />
          ))}
        </div>
        <div className="form-box address-info">
          <h2>Address Information</h2>
          {["street", "city", "state", "zip"].map((field) => (
            <InputField
              key={field}
              name={field}
              value={prescriberInfo[field]}
              label={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
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
        fields={["firstName", "lastName"]}
      />
    </div>
  );
};

export default PrescriberProfile;
