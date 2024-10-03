import React, { useState, useCallback, useMemo } from "react";
import "./page-styles/Prescribers.css";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import axios from "axios";
//import { handleChange, handleSaveOrUpdate, handleSearch, handleClear, handleDelete } from "../handle-functions";

interface PrescriberInfo {
  [key: string]: string;
}

const PrescriberProfile: React.FC = () => {
  const [prescriberInfo, setPrescriberInfo] = useState<PrescriberInfo>({
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
  const [isPrescriberFound, setIsPrescriberFound] = useState<boolean>(false);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setPrescriberInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    },
    []
  );

  /* HANDLE UPDATE (PATCH) */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

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
      console.log(
        "Prescriber information updated successfully:",
        response.data
      );
      alert(
        `Prescriber information updated successfully. Prescriber ID: ${prescriberInfo.id}`
      );
    } catch (error) {
      console.error("Error updating prescriber information:", error);
    }
  };

  const handleUpdateWithConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update the prescriber information?"
    );

    if (confirmUpdate) {
      handleUpdate(e); // Call the actual update logic here
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8000/prescribers`, {
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
      });
      console.log("Prescriber information saved successfully:", response.data);
      alert(
        `Prescriber information saved successfully. Prescriber ID: ${prescriberInfo.id}`
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Error saving prescriber information:",
          error.response.data
        );
        alert("Error saving prescriber information");
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleSaveWithConfirmation = (e: React.FormEvent) => {
    const confirmSave = window.confirm("Save information for this prescriber?");
    if (confirmSave) {
      handleSave(e); // Calls the existing save function
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
          // Transform data to match frontend field names
          setPrescriberInfo({
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            prescriberType: data.prescriber_type,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zipcode,
            contactNumber: data.contact_number,
            dea: data.dea,
            npi: data.npi,
          });

          setIsPrescriberFound(true);
        } else {
          // If no data is found, show alert and switch to "save" mode
          console.log("No matching prescriber found.");
          alert("No matching prescriber found.");
          setIsPrescriberFound(false); // No entity found
        }
      } else {
        // If no ID is provided, handle the case as needed
        console.log("No ID provided for search.");
        alert("No ID provided for search.");
        setIsPrescriberFound(false); // No ID provided
      }
    } catch (error: any) {
      // Handle specific error cases, such as 404 or 500
      if (error.response && error.response.status === 404) {
        console.error("Prescriber not found:", error.response.data);
        alert("Prescriber not found.");
        setIsPrescriberFound(false); // No entity found
      } else {
        // General error handling
        console.error("Error fetching prescriber data:", error);
        alert("An error occurred while searching for the prescriber.");
      }
    }
  };

  const handleClear = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the prescriber information?"
    );

    if (confirmClear) {
      setPrescriberInfo({
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

      setIsPrescriberFound(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescriber?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/prescribers/${prescriberInfo.id}`
        );
        alert("Prescriber deleted successfully.");
        setPrescriberInfo({
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
      } catch (error) {
        console.error("Error deleting prescriber:", error);
        alert("Error deleting prescriber.");
      }

      setIsPrescriberFound(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderInputFields = useMemo(
    () => (
      <>
        <div className="form-box general-info">
          <h2>General Information</h2>
          {[
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          ))}
        </div>
      </>
    ),
    [prescriberInfo, handleChange]
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Prescriber Profile</h1>
      </div>
      <div className="info-section">{renderInputFields}</div>
      <div className="actions">
        <div className="action-box">
          <button type="button" onClick={openModal} className="search">
            Search
          </button>
        </div>

        <div className="action-box">
          {isPrescriberFound ? (
            <button
              type="submit"
              className="save"
              onClick={handleUpdateWithConfirmation} // Use the update handler here
            >
              Update Prescriber
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
        <div className="action-box">
          <button type="button" className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSearch={handleSearch}
        entityType="prescriber"
      />
    </div>
  );
};

export default PrescriberProfile;
