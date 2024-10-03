import axios from "axios";
import React from "react";

const handleChange = <T extends object>(
    setEntityInfo: React.Dispatch<React.SetStateAction<T>>
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEntityInfo((prevInfo) => ({
      ...prevInfo,
      [name]: ["patientId", "prescriberId", "rxItemId", "quantity", "refills"].includes(name)
        ? parseFloat(value) || 0
        : value,
    }));
  };
  

  const handleSaveOrUpdate = async (
    entityType: string, // e.g., 'prescription', 'patient'
    entityInfo: any, // The state object (e.g., prescriptionInfo, patientInfo)
    setEntityInfo: React.Dispatch<React.SetStateAction<any>>,
    isUpdate = false // Boolean to differentiate between save and update
  ) => {
    const { patientId, prescriberId, rxItemId } = entityInfo;
    if (!patientId || !prescriberId || !rxItemId) {
      alert("Please ensure all required fields are filled out.");
      return;
    }
  
    try {
      const [patientCheck, prescriberCheck, rxItemCheck] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/patients/${patientId}`),
        axios.get(`http://127.0.0.1:8000/prescribers/${prescriberId}`),
        axios.get(`http://127.0.0.1:8000/rx-items/${rxItemId}`)
      ]);
  
      if (!patientCheck.data || !prescriberCheck.data || !rxItemCheck.data) {
        alert("One or more of the IDs do not exist in the database.");
        return;
      }
  
      const url = `http://127.0.0.1:8000/${entityType}s${isUpdate ? `/${entityInfo.id}` : ""}`;
      const method = isUpdate ? "patch" : "post";
      const response = await axios[method](url, entityInfo);
  
      alert(
        `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} information ${
          isUpdate ? "updated" : "saved"
        } successfully.`
      );
    } catch (error) {
      console.error(`Error ${isUpdate ? "updating" : "saving"} ${entityType} information:`, error);
      alert(`Error ${isUpdate ? "updating" : "saving"} ${entityType} information`);
    }
  };
  

  const handleSearch = async (
    searchParams: { id?: number },
    entityType: string,
    setEntityInfo: React.Dispatch<React.SetStateAction<any>>,
    entityFields: Record<string, string> // Field mapping between backend response and frontend state
  ) => {
    if (!searchParams.id) {
      alert("No ID provided for search.");
      return;
    }
  
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/${entityType}s/${searchParams.id}`
      );
      const data = response.data;
  
      if (data) {
        const mappedData = Object.keys(entityFields).reduce(
          (acc, key) => ({ ...acc, [key]: data[entityFields[key]] }),
          {}
        );
        setEntityInfo(mappedData);
      } else {
        alert(`No matching ${entityType} found.`);
      }
    } catch (error) {
      console.error(`Error fetching ${entityType} data:`, error);
      alert(`An error occurred while searching for the ${entityType}.`);
    }
  };
  

  const handleClear = (
    entityFields: Record<string, any>, 
    setEntityInfo: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const confirmClear = window.confirm("Are you sure you want to clear the information?");
    if (confirmClear) {
      setEntityInfo(entityFields);
    }
  };
  
  const handleDelete = async (
    entityType: string, 
    entityId: number | string, 
    setEntityInfo: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${entityType}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/${entityType}s/${entityId}`);
        alert(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} deleted successfully.`);
        setEntityInfo({});
      } catch (error) {
        console.error(`Error deleting ${entityType}:`, error);
        alert(`Error deleting ${entityType}`);
      }
    }
  };

  export {
    handleChange,
    handleSaveOrUpdate,
    handleSearch,
    handleClear,
    handleDelete
  };
  