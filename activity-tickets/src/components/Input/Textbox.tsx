import React, { ChangeEvent } from "react";
import "./Input.css";
interface TextboxProps {
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  value: string;
}

const Textbox: React.FC<TextboxProps> = ({
  name,
  handleChange,
  label,
  placeholder,
  value,
}) => {
  return (
    <div className="textbox-container">
      <label htmlFor={name} className="textbox-label">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Textbox;
