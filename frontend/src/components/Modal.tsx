import React, { useState } from 'react';
import "./component-styles/Modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (searchParams: SearchParams) => void;
    fields: Array<'firstName' | 'lastName' | 'dateOfBirth'>;
}

interface SearchParams {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSearch, fields }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');

    const handleSearch = () => {
        const searchParams: SearchParams = {};
        if (fields.includes('firstName')) searchParams.firstName = firstName;
        if (fields.includes('lastName')) searchParams.lastName = lastName;
        if (fields.includes('dateOfBirth')) searchParams.dateOfBirth = dateOfBirth;

        onSearch(searchParams);
        onClose();  // Close the modal after searching
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close">X</button>
                <h2>Search</h2>
                <div className="modal-form">
                    {fields.includes('firstName') && (
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="modal-input"
                        />
                    )}
                    {fields.includes('lastName') && (
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="modal-input"
                        />
                    )}
                    {fields.includes('dateOfBirth') && (
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="modal-input"
                        />
                    )}
                    <button onClick={handleSearch} className="modal-button">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;


