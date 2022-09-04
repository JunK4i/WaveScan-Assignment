import React from 'react';

/**
 * @param {string} name - name of the input field
 * @param {String} labelName - (Optional) Text displayed on input label.
 * @param {String} placeholder - Placeholder text.
 * @param {String} value - Dynamic input value.
 * @param {function} handleChange - Callback on input changed.
 * @param {Boolean} inline - (Optional) Label inline with field.
 * @returns {JSX.Element} - ReactJS component that provides a text input field.
 */
const TextInputField = ({ name, labelName, placeholder, value, handleChange, inline }) => {
  return (
    <div className="input-field">
      <label htmlFor={name} className={`input-label ${inline && "inline"}`}>{labelName}</label>
      <input
        name={name}
        type="search"
        value={value}
        className={`input-text-box ${inline && "inline"}`}
        placeholder={placeholder}
        onChange={handleChange}
      >
      </input>
    </div>
  )
}

export default TextInputField