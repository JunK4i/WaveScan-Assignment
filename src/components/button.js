import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

/**
 * @param {string} text - name of the input field
 * @param {function} handleClick - Callback on input changed.
 * @param {String} colorVariant - (Optional) Color variant of the button.
 * @param {boolean} loading - (Optional) Show loading animation
 * @returns {JSX.Element} - ReactJS component that provides a text input field.
 */
const Button = ({ text, handleClick, colorVariant, loading }) => {
    if (colorVariant === "disabled") {
        <div className={`btn ${colorVariant && colorVariant}`} onClick={() => { }}>
            <span className="btn-text">{text}</span>
        </div>
    } else if (loading) {
        return (
            <div className={`btn ${colorVariant && colorVariant}`} onClick={() => { }}>
                <CircularProgress size={15} />
            </div>
        )
    }
    return (
        <div className={`btn ${colorVariant && colorVariant}`} onClick={handleClick}>
            <span className="btn-text">{text}</span>
        </div>
    );
}

export default Button