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
  value,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  isMask,
  msgTooltip,
  description,
  hasicon,
  onChange,
  options,
  onFocus,
  defaultValue,
  helperText,
  comment = null,
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
          htmlFor={id}
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
          {...rest}
          className={`${
            error ? "has-error" : ""
          } form-control py-2 ${className}`}
          placeholder={placeholder}
          readOnly={readonly}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          onChange={onChange}
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
    </div>
  );
};

Textinput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Textinput;
