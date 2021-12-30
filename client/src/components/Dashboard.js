//Hooks and Helper Functions
import React, { useEffect, useState } from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { renderResumes } from './API';

//Components
import MainNav from './MainNav';
import MobileNav from './MobileNav';

//Assets
import loadSpinner from '../assets/loadingspinner.gif'

const Dashboard = ({ user, setLoggedOut, mobileNav, setMobileNav, isLoading }) => {

        const [delayRender, setDelayRender] = useState(true)
        const [userResumes, setUserResumes] = useState([])

        const history = useHistory();

        const callback = (res) => {
            const sorted = res.data.reverse()
            setUserResumes(sorted)
            setTimeout(() => {
                setDelayRender(false)
            }, 500)
        }

        useEffect(() => {
            if (!isLoading) {
                renderResumes(callback)
            } 
        }, [])

        const handleEdit = (resume) => {
            resume.data.resumeId = resume.id;
            resume.data.resumeThumbnail = resume.thumbnail;
            sessionStorage.setItem('resumeData', JSON.stringify(resume.data))
            history.push('/create')
        }

        return (
            
            <div>
                <MainNav setLoggedOut={setLoggedOut} mobileNav={mobileNav} setMobileNav={setMobileNav} />
                {
                    delayRender ? 
                    <div className="loading-page"><img src={loadSpinner} alt="loading spinner animation"></img></div>
                    :
                    <div className="dashboard-body">
                        <div className="dashboard-content-container">
                            <div>
                                <h1 className="welcome">Welcome <span className="user">{user.name}</span></h1>
                                <div className="dashboard-resumes">
                                    <h3>Your Recent Resumes</h3> 
                                    { userResumes[0] ? 
                                        <>
                                            <div className="user-resumes-container">
                                            {   
                                                userResumes.map((resume, i) => {
                                                    return (
                                                        <div key={resume.id} className={i < 3 ? "user-resume" : "hidden"} onClick={() => handleEdit(resume)}>
                                                            <img src={'/public/' + resume.thumbnail + '.png'} alt="resume thumbnail"></img>
                                                            <p className="user-resume-title">{resume.data.resumeTitle || 'Untitled'}</p>   
                                                        </div>
                                                    )
                                                })}
                                            </div> 
                                        </>
                                        : 
                                        <div className="empty-dashboard-resumes">
                                            <p>No saved resumes yet</p>
                                        </div>
                                    }
                                    <div className="dashboard-button-wrapper">
                                        <Link to="/create">
                                            <button className="new-resume-button">Build a Resume</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-bg"></div>
                    </div>
                           
                }
                <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} setLoggedOut={setLoggedOut}/>            
            </div>
        )
}

export default withRouter(Dashboard);