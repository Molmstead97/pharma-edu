import React, { useState } from 'react';
import "./component-styles/Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchParams: { id?: number }, entityType: string) => Promise<void>;
  entityType: string
}

interface SearchParams {
  id?: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSearch, entityType }) => {
  const [id, setId] = useState<string>('');

  const handleSearch = () => {
    const searchParams: SearchParams = {};

    if (id) searchParams.id = parseInt(id, 10); // Convert ID to number
    onSearch(searchParams, entityType);
    onClose(); // Close the modal after searching
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">X</button>
        <h2>Search</h2>
        <div className="modal-form">
          <input
            type="text"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="modal-input"
          />
          <button onClick={handleSearch} className="modal-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;



