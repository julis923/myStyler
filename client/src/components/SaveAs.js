const SaveAs = ({ resumeTitle, setCreatingResume, setResumeTitle }) => {
    
    const handlePDF = (e) => {
        e.preventDefault();
        setCreatingResume(true)
    }

    const handleChange = (e) => {
        setResumeTitle(e.target.value)
    }
    
    return (
        <>
            <div className="save-as">
                <label htmlFor="resume-name-input">Save as:</label>
                <div className="save-as-container">
                    <input type="text" id="resume-name-input" value={resumeTitle} placeholder="my-resume" onChange={handleChange}/>
                    <h4>.pdf</h4>
                </div>
            </div>
            <button className="create-pdf-btn" onClick={handlePDF}>Save & Create PDF</button>
        </>
    )
}

export default SaveAs;