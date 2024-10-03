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
      console.log("Current value for", name, ":", value); // Log the value to debug
      
      switch (type) {
        case "textarea":
          return (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              readOnly={readOnly}
              aria-label={label}
            />
          );
        case "select":
          return (
            <select name={name} value={value || ""} onChange={onChange} aria-label={label}>
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
              aria-label={label}
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
