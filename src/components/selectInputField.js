import React from 'react';

/**
 * @param {string} name - name of the input field
 * @param {String} labelName - (Optional) Text displayed on input label.
 * @param {String} value - Dynamic input value.
 * @param {function} handleChange` - Callback on input changed.
 * @param {Array} optionList - List of options to be displayed.
 * @returns {JSX.Element} - ReactJS component that provides a select input field.
 */
const SelectInputField = ({ name, labelName, value, handleChange, optionList }) => {
    return (
        <div className="input-field">
            <label htmlFor={name} className={`input-label`}>{labelName}</label>
            <select
                name={name}
                onChange={handleChange}
                type="search"
                value={value}
                className={`input-text-box ${value === "" && "placeholder"}`}
            >
                {optionList}
            </select>
        </div>
    )
}

export default SelectInputField