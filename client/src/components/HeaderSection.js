import React from 'react';
import InputSection from './InputSection'

const HeaderSection = ({ resumeData, setResumeData }) => {

    const handleChange = (target, param) => {
        let resumeDataCopy = {...resumeData}
        resumeDataCopy.headerInput[param] = target.value;
        setResumeData(resumeDataCopy)
    }

    return (
        <div>
            <div className='input-container'>
                <h3>Header</h3>
                <InputSection value={resumeData.headerInput.name} onChange={({target}) => handleChange(target, 'name')} id='name-input' label='Full Name' placeholder={'ex: John Smith'}/>
                <InputSection value={resumeData.headerInput.title} onChange={({target}) => handleChange(target, 'title')} id='title-input' label='Title' placeholder={'ex: Front-End Developer'}/>
            </div>
        </div>
    )
}

export default HeaderSection;