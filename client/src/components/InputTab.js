import EducationSection from './EducationSection'

const InputTab = ({component, resumeData, setResumeData, duplicated, setDuplicated}) => {
    
    const Component = component || EducationSection;
    return (
        <Component resumeData={resumeData} setResumeData={setResumeData} duplicated={duplicated} setDuplicated={setDuplicated} />
    )
}

export default InputTab;