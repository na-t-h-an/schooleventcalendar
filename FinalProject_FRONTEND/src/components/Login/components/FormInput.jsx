import React from 'react';

export default function FormInput({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  disabled = false, 
  required = false 
}) {
  return (
    <div className="formGroup">
      <label htmlFor={id} className="boldLabel">{label}</label>
      <input
        type={type}
        id={id}
        className="formInput"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </div>
  );
}