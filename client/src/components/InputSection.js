import React, { useEffect, useState } from 'react';

const InputSection = ({
    
    label, 
    id, 
    value, 
    onChange, 
    placeholder, 
    flex, 
    duplicated,
    textArea
    }) => {

    const [opacity, setOpacity] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setOpacity(true)
        }, 1)
    }, [])
    
    return (
        <div className={ flex ? 'flex-input-section' : 'input-section'} style={!opacity && duplicated ? {opacity: 0} : {opacity: 100, transition: 'all 0.2s ease-in-out'}}>
            <label htmlFor={id}>{label}</label>
            {!textArea ? 
            <input type="text" id={id} value={value} onChange={onChange} placeholder={placeholder}/> 
            : 
            <textarea id={id} rows="4" value={value} onChange={onChange} placeholder={placeholder}/>}
        </div>
    )

}

export default InputSection;