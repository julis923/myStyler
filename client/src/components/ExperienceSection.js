import React from 'react';
import InputSection from './InputSection';
import { duplication } from './ResumeData';

const ExperienceSection = ({ resumeData, setResumeData, duplicated, setDuplicated }) => {

    const handleExperienceUpdate = (i, key, target) => {
        let resumeDataUpdate = {...resumeData}
        resumeDataUpdate.experienceInput[i][key].text = target.value;
        setResumeData(resumeDataUpdate);
    }

    const handleExperienceDetailUpdate = (i, x, target) => {
        let resumeDataUpdate = {...resumeData}
        resumeDataUpdate.experienceInput[i]['details'][x].text = target.value;
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
            <h3>Experience</h3>
            {resumeData.experienceInput.map((item, i) => {
                return (
                    <div className="section-wrapper experience-section-wrapper" key={`${i}-experience-section-wrapper`}>
                        {
                            Object.keys(item).map((key) => {
                                if (key !== 'details') {
                                    return (
                                        <InputSection 
                                            value={item[key].text} 
                                            onChange={({target}) => handleExperienceUpdate(i, key, target)} 
                                            id={`${i}-${key}-experience-item`} 
                                            key={`${i}-${key}-experience-item`}
                                            label={item[key].label}  
                                            placeholder={item[key].placeholder} 
                                            duplicated={duplicated}
                                            textArea={key === 'summary' ? true : false }
                                            flex={key === 'start-date' || key === 'end-date' ? true : false}
                                        />
                                    )
                                } else {
                                    return (
                                        <div key={`${i}-experienceItem-input-wrapper`} style={{width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                                            {item[key].map((detail, x) => {
                                                return (
                                                    <InputSection 
                                                        value={detail.text} 
                                                        onChange={({target}) => handleExperienceDetailUpdate(i, x, target)} 
                                                        id={`${i}${x}-experience-detail`} 
                                                        key={`${i}${x}-experience-detail`}
                                                        label={detail.label}  
                                                        placeholder={detail.placeholder} 
                                                        duplicated={duplicated}
                                                        flex={false}
                                                    />
                                                )
                                            })}
                                            <div className="duplicate-button" key={`${i}-experience-duplicate-btn`} onClick={() => duplicateSection('experienceInput', i, 'details')}>
                                                <p>Add another detail +</p>
                                            </div>
                                        </div>
                                    )
                                }   
                            })
                        }
                    </div>
                )
            })}
            <div className="duplicate-button duplicate-section" onClick={() => duplicateSection('experienceInput', null, null)}>
                <p>Add another experience section +</p>
            </div> 
        </>
    )
}

export default ExperienceSection;