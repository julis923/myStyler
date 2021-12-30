//Hooks and Helper Functions
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { renderResumes } from './API';

//Components
import MobileNav from './MobileNav';
import ErrorMessage from './ErrorMessage';
import MainNav from '../components/MainNav.js'

//Assets
import deleteExitIcon from '../assets/delete-exit-icon.png'
import loadSpinner from '../assets/loadingspinner.gif'

const UserResumes = ({ setLoggedOut, mobileNav, setMobileNav, setIsAuth }) => {
    
    const [userResumes, setUserResumes] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [focusedResume, setFocusedResume] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    let history = useHistory();

    const callback = (res) => {
        const sorted = res.data.reverse()
        setUserResumes(sorted)
        setIsLoading(false)
    }

    useEffect(() => {
        renderResumes(callback);
    }, [])

    const handleEdit = (resume) => {
        resume.data.resumeId = resume.id;
        resume.data.resumeThumbnail = resume.thumbnail;
        sessionStorage.setItem('resumeData', JSON.stringify(resume.data))
        history.push('/create')
    }

    const handleDelete = () => {
        setDeleteModal(false)
        //axios.post('http://localhost:4000/user/delete-resume', [focusedResume.id, focusedResume.thumbnail])
        axios.post('https://mystyler.herokuapp.com/user/delete-resume', [focusedResume.id, focusedResume.thumbnail])
        .then((res) => {
           renderResumes(callback);
        })
        .catch(() => {
            setError(true)
        })
    }

    const handleDeleteModal = (resume) => {
        setDeleteModal(true)
        setFocusedResume(resume)
    }

    const handleGoBack = () => {
        setDeleteModal(false)
        setFocusedResume(null)
    }

    
    return (
        <div className={deleteModal ? "noclick" : ""}>
            <MainNav setLoggedOut={setLoggedOut} mobileNav={mobileNav} setMobileNav={setMobileNav} active={'resumes'} />
            {isLoading ? 
             <div className="loading-page"><img src={loadSpinner} alt="loading spinner animation"></img></div> : null }
             <div className="user-resumes-body">
                <h3>Your Saved Resumes</h3> 
                {userResumes[0] ? 
                    <div className="user-resumes-container">
                    {   
                        userResumes.map((resume) => {
                            return (
                                <div key={resume.id} className="user-resume">
                                    <img src={'/public/' + resume.thumbnail + '.png'} alt="resume thumbnail"></img>
                                    <p className="user-resume-title">{resume.data.resumeTitle || 'Untitled'}</p> 
                                    <div className="resume-actions">
                                        <button className="view-resume" onClick={() => handleEdit(resume)}>View</button>
                                        <button className="delete-resume" onClick={() => handleDeleteModal(resume)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div> 
                : 
                    <div className="empty-user-resumes">
                        <p>You have no saved resumes...yet!</p>
                        <Link to="/create">
                            <button className="new-resume-button">Build a Resume</button>
                        </Link>
                    </div>
                }
                {
                    deleteModal ? 
                    <div className={deleteModal && focusedResume ? "delete-modal-container" : "hidden"}>
                        <div className="delete-modal-wrapper">
                            <div className="delete-modal">
                                <div className="exit-icon-container" onClick={handleGoBack}>
                                    <img src={deleteExitIcon} className="delete-exit-icon" alt="exit delete modal"/>
                                </div>
                                <div className="delete-modal-content">
                                    <p>Are you sure you want to delete {focusedResume.data.resumeTitle}? This cannot be undone.</p>
                                    <div className="delete-options">
                                        <button className="go-back" onClick={handleGoBack}>No, go back</button>
                                        <button className="confirm-delete" onClick={handleDelete}>Yes, delete forever</button>
                                    </div>
                                </div>
                                <div className="bottom-accent"></div>
                            </div>
                        </div>
                    </div> : null
                }
                <div className="user-resumes-bg"></div>
             </div>
             
            <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} setLoggedOut={setLoggedOut}/>
            {
                error ? <ErrorMessage setError={setError} setIsAuth={setIsAuth} /> : null
            }
        </div>
    )
}

export default UserResumes;