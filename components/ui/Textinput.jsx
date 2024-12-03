import React, { useState } from "react";
import PropTypes from "prop-types";

const Textinput = ({
  name,
  type,
  label,
  placeholder = "Add placeholder",
  classLabel = "form-label",
  className = "",
  classGroup = "",
  readonly,
  value, // Controlled value from parent
  error,
  disabled,
  id,
  horizontal,
  validate,
  onChange, // Controlled change handler
  helperText,
  ...rest
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  if (!name) {
    console.error("The 'name' prop is required for TextInput.");
  }

  return (
    <div
      className={`formGroup ${error ? "has-error" : ""} ${
        horizontal ? "flex" : ""
      } ${validate ? "is-valid" : ""}`}
    >
      {label && (
        <label
          htmlFor={id || name}
          className={`block capitalize ${classLabel} ${
            horizontal ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words" : ""
          }`}
        >
          {label}
        </label>
      )}
      <div className={`relative ${horizontal ? "flex-1" : ""}`}>
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          name={name}
          id={id || name}
          value={value} // Controlled value
          onChange={onChange} // Pass change handler to parent
          placeholder={placeholder}
          readOnly={readonly}
          disabled={disabled}
          className={`form-control py-2 ${className} ${
            error ? "border-red-500" : ""
          }`}
          {...rest}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {helperText && <small className="text-gray-500">{helperText}</small>}
      {error && <div className="text-red-500 mt-1">{error}</div>}
    </div>
  );
};

Textinput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string, // Ensure it's a controlled component
  onChange: PropTypes.func, // Controlled change handler
  error: PropTypes.string,
  helperText: PropTypes.string,
};

export default Textinput;
