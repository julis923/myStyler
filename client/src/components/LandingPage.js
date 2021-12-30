//Hooks and Helper Functions
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Components
import LandingNav from './LandingNav'

//Assets
import resumeGif from '../assets/resumeGif.gif'
import resume13 from '../assets/resumes/14.png'


const LandingPage = ({ loggedIn, mobileNav, setMobileNav }) => {

    const [animations, setAnimations] = useState(0);
    const [resizing, setResizing] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => {
          setResizing(true)
          setTimeout(() => {
            setResizing(false)
          }, 2000)
        })
        return () => {
            window.removeEventListener('resize', null);
        }
      }, [])

    const delay = 1;

    useEffect(() => {
        const timer = setInterval(() => setAnimations((v) => v + 1), delay * 500);
        return () => {
          clearInterval(timer)
        }
    }, [animations])

    return ( 
        <>
        <div className="landing-page-container">
                <div className="landing-bg-container"></div>
                <LandingNav loggedIn={loggedIn} autoDirect={true} mobileNav={mobileNav} setMobileNav={setMobileNav} />
                <div className="landing-page-banner-1">
                        <h1 className="banner-h1">
                            <span className={`${animations >= 1 ? "opaque-navy landing-h1" : "landing-h1"} ${resizing ? "no-animation" : ""}`}>You've </span> 
                            <span className={`${animations >= 2 ? "opaque-navy landing-h1" : "landing-h1"} ${resizing ? "no-animation" : ""}`}>Got </span> 
                            <span className={`${animations >= 3 ? "opaque-navy banner-h1-petrona landing-h1" : "banner-h1-petrona landing-h1"} ${resizing ? "no-animation" : ""}`}>Style</span>
                        </h1>
                        <div className="h3-container">
                            <h3>Build a beautiful resume in minutes with this <span>easy-to-use</span>, <span>no-hassle</span> styling tool.</h3>
                        </div>
                        <Link to="/dashboard">
                            <button>Get <span>Building</span></button>
                        </Link>
                </div>
            
            <div className="gif-container">
                <img className={`${animations >= 4 ? "resume-gif opaque" : "resume-gif"} ${resizing ? "no-animation" : ""}`} src={resumeGif} alt="resume style example"/>
                <img className={`${animations >= 5 ? "resume-gif-2 opaque" : "resume-gif-2"} ${resizing ? "no-animation" : ""}`} src={resume13} alt="resume style example"/>
            </div>
            <div className="landing-page-banner-2">
                <h1 className="banner-h1">
                    <span className="opaque-navy landing-h1">Custom </span>
                    <span className="opaque-navy banner-h1-petrona landing-h1">Designs</span>
                </h1>
                <div className="h3-container">
                    <h3>Simply enter your information and choose between <span>15 professional designs.</span></h3>
                </div>
                <div>
                    <Link to="/create">
                        <button className="get-started-btn">Get <span>Started</span></button>
                    </Link>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default LandingPage;