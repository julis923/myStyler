import React from 'react';
import InputSection from './InputSection'
import { duplication } from './ResumeData';

const SkillsSection = ({ resumeData, setResumeData, duplicated, setDuplicated }) => {
    
    const handleSkillUpdate = (i, key, target) => {
        let resumeDataUpdate = {...resumeData};
        resumeDataUpdate.skillsInput[i][key].text = target.value;
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
        <div className="input-container skills-section">
            <h3>Skills</h3>
            {
                resumeData.skillsInput.map((skillObject, i) => {
                    return (
                        <div key={`${i}-skill-item`} className="section-wrapper">
                            {Object.keys(skillObject).map((key, x) => {
                                return (
                                    <InputSection 
                                        value={skillObject[key].text}
                                        key={`${key}-${i}${x}`}
                                        id={`${key}-${i}${x}`}
                                        onChange={({target}) => handleSkillUpdate(i, key, target)}
                                        label={skillObject[key].label}
                                        placeholder={skillObject[key].placeholder}
                                        duplicated={duplicated}
                                    />
                                )   
                            })}
                        </div>
                    )
                })
            }
            <div className="duplicate-button duplicate-section" onClick={() => duplicateSection('skillsInput', null, null)}>
                <p>Add another skill section +</p>
            </div>
        </div> 
    )
}

export default SkillsSection;