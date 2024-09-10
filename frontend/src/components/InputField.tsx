import React from "react";

interface InputFieldProps {
  name: string;
  value: string | number;
  label: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  type?: "text" | "date" | "textarea" | "tel" | "number" | "select";
  options?: { value: string; label: string }[];
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = React.memo(
  ({
    name,
    value,
    label,
    onChange,
    type = "text",
    options = [],
    readOnly = false,
  }) => {
    const renderInput = () => {
      switch (type) {
        case "textarea":
          return (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              readOnly={readOnly}
            />
          );
        case "select":
          return (
            <select name={name} value={value} onChange={onChange}>
              <option value="">Select an option</option>{" "}
              {/* Ensure there's a default option */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        default:
          return (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              readOnly={readOnly}
            />
          );
      }
    };

    return (
      <label>
        {label}:{renderInput()}
      </label>
    );
  }
);

export default InputField;
