import React from "react";
import './InputComponent.css'

const InputComponent = ({label, value, placeholder, name, type, onChange, error, row}) => {
    return (
        <div className="input-component-container">
            <div className={`${row? 'd-flex-row' : 'd-flex-column'}`}>
                <label className="input-label">{label}</label>
                <input
                    className="input-field"
                    value={value}
                    onChange={onChange}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    autoComplete="off"
                    max={type == 'number' ? 5 : null}
                    min={type == 'number' ? 0 : null}
                />
            </div>
            {error && <span className="input-error">{error}</span>}
        </div>
    )
}

export default InputComponent