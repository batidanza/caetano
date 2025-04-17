import React, { useState } from "react";
import { Controller } from "react-hook-form";
import "./InputStyles.css"; // Asegúrate de importar los estilos CSS

const CustomDropdown = ({ name, control, options, rules }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const selectedOption = options?.find(option => option.value === field.value);
        const displayText = selectedOption ? selectedOption.label : "Select an option";

        return (
          <div className="custom-dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
              {displayText}
            </div>
            {isOpen && (
              <div className="dropdown-options">
                {options?.map((option) => (
                  <div
                    key={option.value}
                    className="dropdown-option"
                    onClick={() => {
                      field.onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
            {error && <p className="error-message">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default CustomDropdown;
