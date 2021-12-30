import React from 'react';
import InputSection from './InputSection';
import { resumeObject } from './ResumeData';

const ContactSection = ({ resumeData, setResumeData, duplicated, setDuplicated }) => {
    
    const handleOtherUpdate = (target, i, x) => {
        let resumeDataCopy = {...resumeData};
        resumeDataCopy.contactInput[i][x].text = target.value;
        setResumeData(resumeDataCopy)
    }

    const handleContactUpdate = (target, i) => {
        let resumeDataCopy = {...resumeData};
        resumeDataCopy.contactInput[i].text = target.value;
        setResumeData(resumeDataCopy)
    }

    const duplicateSection = (section) => {
        setDuplicated(true)
        const resumeObjectCopy = JSON.parse(JSON.stringify(resumeObject));
        let addOn = resumeData[section][8].length
        resumeData[section][8][addOn] = resumeObjectCopy[section][8][0];
        setTimeout(() => {
            setDuplicated(false)
        }) 
    }
    
    return (
        <>
            <div>
                <h3>Contact</h3>
            </div>
            <div className="section-wrapper contact-section-wrapper">
                {resumeData.contactInput.map((item, i) => {
                    if (!item[0]) {
                        return (
                            <InputSection 
                                value={item.text}
                                onChange={({target}) => handleContactUpdate(target, i)}
                                id={`${item.label}${i}`} 
                                key={`${item.label}${i}`} 
                                label={item.label}
                                flex={true}
                                placeholder={item.placeholder}
                                duplicated={duplicated}
                            />
                        )
                    } else {
                        return (
                            item.map((other, x) => {
                                return (
                                
                                    <InputSection 
                                        value={other.text}
                                        onChange={({target}) => handleOtherUpdate(target, i, x)}
                                        id={`${other.label}${i}${x}`}
                                        key={`${other.label}${i}${x}`}
                                        label={other.label}
                                        flex={true}
                                        placeholder={other.placeholder}
                                        duplicated={duplicated}
                                    />
                                )
                            })
                        )    
                    }
                })}
                <button className="duplicate-button" onClick={() => duplicateSection('contactInput')}>Add another point of contact +</button>
            </div>    
        </>
    )
}

export default ContactSection;