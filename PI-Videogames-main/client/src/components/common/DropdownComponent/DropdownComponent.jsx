import React, { useState, useRef, useEffect } from "react";
import './DropdownComponent.css'

const DropdownComponent = ( {title, options, onSelect, multiSelect, error} ) => {
    const [ open, setOpen ] = useState(false)
    const [ valueSelected, setValueSelected ] = useState(multiSelect? [] : null)
    const dropComponentRef = useRef(null)

    useEffect(() => {
        if (open) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [open]);

    const handleSelectOption = (e) => {
        const newSelection = e.target.id
        if (multiSelect){
            const isSelected = valueSelected.includes(newSelection)
            const newValue = isSelected ? valueSelected.filter(value => value !== newSelection) : [...valueSelected, newSelection]
            setValueSelected(newValue)
            onSelect(title, newValue)
        }
        else{
            setValueSelected(e.target.innerHTML)
            onSelect(title, e.target.innerHTML)
            setOpen(false)
        }
    }

    const handleDropClick = () => {
        setOpen(!open)
    }

    const handleClickOutside = (event) => {
        if (dropComponentRef.current && !dropComponentRef.current.contains(event.target)) {
            setOpen(false); 
        }
    }

    const getDropLabel = () => {
        if (multiSelect){
            if (!valueSelected.length) return title
            return valueSelected.length == 1 ? valueSelected[0] : `${valueSelected.length} selected`
        }
        return valueSelected ? valueSelected : title
    }
    return (
        <div>
            <div className={`drop-container ${!open? 'container-closed' : ''}`} ref={dropComponentRef}>
                <div 
                    className={`drop-title-container ${open? 'opened' : ''}`}
                    onClick={handleDropClick}
                >
                    <label
                        className='drop-title'
                    >
                        {getDropLabel()}
                    </label>
                    <div className={`drop-arrow ${open? 'open' : 'closed'}`}/>
                </div>
                <div className={`drop-options-container ${open? 'show' : ''}`}>
                    {options.map(option =>
                        <div 
                            id={option}
                            className={`drop-option-item-container ${multiSelect && valueSelected.includes(option) ? 'option-selected' : ''}`}
                            onClick={e => handleSelectOption(e)}
                        >
                            {option}
                            {(multiSelect && valueSelected.includes(option)) && <div className="check-selected"/>}
                        </div>
                    )}
                </div>
            </div>
            {error && <span className="drop-error">{error}</span>}
        </div>
    )
}

export default DropdownComponent