import React from 'react';
import InputSection from './InputSection';
import { duplication } from './ResumeData';

const EducationSection = ({ resumeData, setResumeData, duplicated, setDuplicated }) => {
    
    const handleEducationUpdate = (key, i, target) => {
        let resumeDataUpdate = {...resumeData}
        resumeDataUpdate.educationInput[i][key].text = target.value;
        setResumeData(resumeDataUpdate);
    }

    const handleDegreeUpdate = (key, i, z, target) => {
        let resumeDataUpdate = {...resumeData}
        resumeDataUpdate.educationInput[i]['degrees'][z][key].text = target.value
        setResumeData(resumeDataUpdate);
    }

    const duplicateSection = (section, sectionIndex, key) => {
        setDuplicated(true)
        duplication(section, sectionIndex, key, resumeData)
        setTimeout(() => {
            setDuplicated(false)
        })
        
    }

    return (
        <>
        <h3>Education</h3>
        {resumeData.educationInput.map((object, i) => {
            return (
                <div className="section-wrapper" key={`${i}-education-section-wrapper`}>
                    {Object.keys(object).map((key) => {
                        if (key !== 'degrees') {
                            return (
                                <InputSection 
                                    value={object[key].text}
                                    onChange={({target}) => handleEducationUpdate(key, i, target)} 
                                    key={`${key}-${i}-education-item`} 
                                    id={`${key}-${i}-education-item`}
                                    label={object[key].label} 
                                    placeholder={object[key].placeholder}
                                    flex={key === 'start-date' || key === 'end-date' ? true : false}
                                    duplicated={duplicated}
                                />
                            )
                        } else if (key === 'degrees') {
                            return (
                                <div key={`${i}-degrees-input-wrapper`} style={{width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                                    {object[key].map((degree, z) => {
                                        return (
                                            Object.keys(degree).map((degreeKey, y) => {
                                                return (
                                                    <InputSection 
                                                        value={degree[degreeKey].text}
                                                        onChange={({target}) => handleDegreeUpdate(degreeKey, i, z, target)} 
                                                        key={`${degreeKey}-${i}${z}-education-item`} 
                                                        id={`${degreeKey}-${i}${z}-education-item`}
                                                        label={degree[degreeKey].label} 
                                                        placeholder={degree[degreeKey].placeholder}
                                                        flex={true}
                                                        duplicated={duplicated}
                                                    />
                                                ) 
                                            }) 
                                        )
                                    })}
                                    <div className="duplicate-button" key={`education-duplicate-btn-${i}`} onClick={() => duplicateSection('educationInput', i, 'degrees')}> 
                                        <p>Add another degree +</p> 
                                    </div>
                                </div>
                            )
                        }
                        return key;
                    })}  
                </div>
            )
        })}
        <div className="duplicate-button duplicate-section" onClick={() => duplicateSection('educationInput', null, null)}> 
            <p>Add another education section +</p> 
        </div> 
        </>
    )
}

export default EducationSection;