import React from 'react';
import InputSection from './InputSection'

const SummarySection = ({ resumeData, setResumeData }) => {

    const handleChange = (target) => {
        const resumeDataCopy = {...resumeData}
        resumeDataCopy.summaryInput = target.value;
        setResumeData(resumeDataCopy);
    }

    return (
        <div>
            <div className='input-container'>
                <h3>Summary</h3>
                <InputSection 
                    value={resumeData.summaryInput} 
                    onChange={({target}) => handleChange(target)} 
                    id='summary-input' 
                    label='Professional Summary'
                    textArea={true} 
                    placeholder={'ex: I am a junior developer with experience in front-end...'}/>
                    
            </div>
        </div>
        
    )
}

export default SummarySection;