//Hooks and Helper Functions
import { React, useEffect } from 'react';
import axios from 'axios';

//Components
import LoadCreate from './LoadCreate'
import SaveAs from './SaveAs';

//Assets
import exitIcon from '../assets/exit-icon.png'

const SaveModal = ({ modalDisplay, setModalDisplay, creatingResume, setCreatingResume, resumeData, setResumeData, resumeTitle, setResumeTitle, error, setError }) => {

    const handleClose = () => {
        setModalDisplay(false)
    }

    useEffect(() => {
        if (creatingResume) {
            //First, save resume to database
            //axios.post('http://localhost:4000/build/save', resumeData)
            axios.post('https://mystyler.herokuapp.com/build/save', resumeData)
            .then((res) => {     
                //axios.post(`http://localhost:4000/build`, res.data.data, {responseType: 'arraybuffer', headers: {'Accept': 'application/pdf'}})
                 axios.post(`https://mystyler.herokuapp.com/build`, res.data.data, {responseType: 'arraybuffer', headers: {'Accept': 'application/pdf'}})
                //When response recieved, create the PDF link to be saved/viewed by user
                .then((response) => {
                    const blob = new Blob([response.data], {type: 'application/pdf'})
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = resumeData.resumeTitle ? resumeData.resumeTitle : `Untitled.pdf`
                    link.click()
                    setCreatingResume(false)
                    setModalDisplay(false)

                    //Set the session storage (and by default the resumeData state) with the response which includes the db ID and thumbnail)
                    sessionStorage.setItem('resumeData', JSON.stringify(res.data.data))
                    let session = sessionStorage.getItem('resumeData')
                    let sessionData = JSON.parse(session)
                    setResumeData(sessionData)
                })
                .catch(err => {
                    setError(true)
                    setModalDisplay(false)
                    setCreatingResume(false)
                    console.log(err)
                })
            })
            .catch(err => {
                setError(true)
                setModalDisplay(false)
                setCreatingResume(false)
                console.log(err)
            })              
        } 
    }, [creatingResume, resumeData, setResumeData, resumeTitle, setCreatingResume, modalDisplay, setModalDisplay])

    useEffect(() => {
        let resumeDataCopy = {...resumeData}
        resumeDataCopy.resumeTitle = resumeTitle;
        setResumeData(resumeDataCopy);
    }, [resumeTitle, setResumeTitle])

    useEffect(() => {
    }, [resumeData])

    

    return (
        <div className={modalDisplay ? "save-modal-container" : "hidden"}>
            <div className={modalDisplay ? "save-modal" : "hidden"}>
                <div className="save-modal-content">
                    <div className="exit-icon-container" onClick={handleClose}>
                        <img src={exitIcon} className="exit-icon" alt="exit save modal"/>
                    </div>
                    <div className="flex">
                        <h2>Looking</h2>
                        <h2 className="petrona">Good!</h2>
                    </div>
                    <form action="" className="save-resume-form">
                        <SaveAs resumeTitle={resumeTitle} setCreatingResume={setCreatingResume} setResumeTitle={setResumeTitle} />
                    </form> 
                    <div className="modal-graphic"></div>
                </div>
            </div>
            {!error ? <LoadCreate creatingResume={creatingResume} setCreatingResume={setCreatingResume}/> : null }
        </div>
    )
}

export default SaveModal;