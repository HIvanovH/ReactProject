import React, { ChangeEvent, FocusEvent, useState } from "react";

import "./FormInput.css";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  errorMessage,
  onChange,
  onBlur,
  onFocus,
  className,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true); // Add a state to track input validity
  const [isBlur, setIsBlur] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFocused(true);

    onChange && onChange(event);
  };

  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    setIsBlur(true);

    if (inputProps.pattern && event.target.value.match(inputProps.pattern)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    onChange && onChange(event);
  };

  const focusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    setIsBlur(false);
  };
  return (
    <div className="form-input">
      <label className="label-register">{label}</label>
      <input
        {...inputProps}
        onChange={handleChange}
        onBlur={blurHandler}
        // onFocus={() =>
        //   inputProps.name === "confirmPassword" && setFocused(true)
        // }
        onFocus={focusHandler}
        className={`input-register`}
      />

      {isBlur && !isValid && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default FormInput;
