import React from "react";
import './TextFieldComponent.css';

const TextFieldComponent = ({label, value, placeholder, name, type, onChange, error, row}) => {

    return (
        <div className="text-area-container">
            <label className="input-label">{label}</label>
            <textarea
                className="text-area-field"
                value={value}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
            {error && <span className="input-error">{error}</span>}
        </div>
    )
}

export default TextFieldComponent