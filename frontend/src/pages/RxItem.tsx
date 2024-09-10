import React, { useState, useCallback, useMemo } from "react";
import "./page-styles/RxItem.css";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import axios from "axios";

interface RxData {
  [key: string]: string;
}

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "date" | "textarea" | "tel" | "number" | "select";
  options?: { value: string; label: string }[];
};

const RxItem: React.FC = () => {
  const [rxInfo, setRxInfo] = useState<RxData>({
    name: "",
    strength: "",
    ndc: "",
    expiration: "",
    lotNumber: "",
    dosageForm: "",
    deaSchedule: "",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isItemFound, setIsItemFound] = useState<boolean>(false);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setRxInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    },
    []
  );

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/prescribers/${rxInfo.id}`,
        {
          name: rxInfo.name,
          strength: rxInfo.strength,
          ndc: rxInfo.ndc,
          expiration: rxInfo.expiration,
          lot_number: rxInfo.lotNumber,
          dosage_form: rxInfo.dosageForm,
          dea_schedule: rxInfo.deaSchedule,
        }
      );
      console.log("Rx Item information updated successfully:", response.data);
      alert(`Item information updated successfully. Item ID: ${rxInfo.id}`)
    } catch (error) {
      console.error("Error updating Rx Item information:", error);
      alert("Error updating item information")
    }
  };

  const handleUpdateWithConfirmation = (e: React.FormEvent) => {
    const confirmSave = window.confirm(
      "Update information for this item?"
    );
    if (confirmSave) {
      handleUpdate(e); // Calls the existing save function
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/prescriptions`, {
        name: rxInfo.name,
        strength: rxInfo.strength,
        ndc: rxInfo.ndc,
        expiration: rxInfo.expiration,
        lot_number: rxInfo.lotNumber,
        dosage_form: rxInfo.dosageForm,
        dea_schedule: rxInfo.deaSchedule,
      });
      console.log("Rx Item information saved successfully:", response.data);
      alert(`Item information saved successfully. Item ID: ${rxInfo.id}`)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error saving Rx Item information:", error.response.data);
        alert("Error saving item information")
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleSaveWithConfirmation = (e: React.FormEvent) => {
    const confirmSave = window.confirm(
      "Save information for this item?"
    );
    if (confirmSave) {
      handleSave(e); // Calls the existing save function
    }
  };

  const handleSearch = async (searchParams: { id?: number }, entityType: string) => {
    try {
      if (searchParams.id) {
        const response = await axios.get(
          `http://127.0.0.1:8000/rx-items/${searchParams.id}`
        );
        const data = response.data;

        if (data) {

          setRxInfo({
            id: data.id,
            name: data.name,
            strength: data.strength,
            ndc: data.ndc,
            expiration: data.expiration,
            lotNumber: data.lot_number,
            dosageForm: data.dosage_form,
            deaSchedule: data.dea_schedule,
          });

        setIsItemFound(true);
      } else {
        // If no data is found, show alert and switch to "save" mode
        console.log("No matching item found.");
        alert("No matching item found.");
        setIsItemFound(false); // No entity found
      }
    } else {
      // If no ID is provided, handle the case as needed
      console.log("No ID provided for search.");
      alert("No ID provided for search.");
      setIsItemFound(false); // No ID provided
    }
  } catch (error: any) {
    // Handle specific error cases, such as 404 or 500
    if (error.response && error.response.status === 404) {
      console.error("Rx item not found:", error.response.data);
      alert("Rx item not found.");
      setIsItemFound(false); // No entity found
    } else {
      // General error handling
      console.error("Error fetching item data:", error);
      alert("An error occurred while searching for the item.");
    }
  }
};
      
const handleClear = () => {
  const confirmClear = window.confirm(
    "Are you sure you want to clear the item information?"
  );

  if (confirmClear) {
    setRxInfo({
      name: "",
      strength: "",
      ndc: "",
      expiration: "",
      lotNumber: "",
      dosageForm: "",
      deaSchedule: "",
    });
    setIsItemFound(false);
  }
};

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderInputFields = useMemo(() => {
    const fieldConfigs: FieldConfig[] = [
      { name: "name", label: "Name" },
      { name: "strength", label: "Strength" },
      { name: "ndc", label: "NDC" },
      { name: "expiration", label: "Expiration", type: "date" },
      { name: "lotNumber", label: "Lot Number" },
      { name: "dosageForm", label: "Dosage Form" },
      {
        name: "deaSchedule",
        label: "DEA Schedule",
        type: "select",
        options: [
          { value: "Legend", label: "Legend" },
          { value: "Schedule II", label: "Schedule II" },
          { value: "Schedule III", label: "Schedule III" },
          { value: "Schedule IV", label: "Schedule IV" },
          { value: "Schedule V", label: "Schedule V" },
        ],
      },
    ];

    return (
      <div className="form-box general-info">
        <h2>General Information</h2>
        {fieldConfigs.map(({ name, label, type, options }) => (
          <InputField
            key={name}
            name={name}
            value={rxInfo[name]}
            label={label}
            onChange={handleChange}
            type={type}
            options={options}
          />
        ))}
      </div>
    );
  }, [rxInfo, handleChange]);

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
          {isItemFound ? (
            <button
              type="submit"
              className="save"
              onClick={handleUpdateWithConfirmation} // Use the update handler here
            >
              Update Rx Item
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
        entityType="rxItem"
      />
    </div>
  );
};

export default RxItem;
