import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const MainNav = ({ setLoggedOut, mobileNav, setMobileNav, active }) => {

    const [dropdown, setDropdown] = useState(false)

    const handleLogOut = () => {
        axios.get('https://mystyler.herokuapp.com/logout')
        //axios.get('http://localhost:4000/logout')
        .then(res => {
            setLoggedOut(true)
            sessionStorage.removeItem('resumeData')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="main-nav">
            <Link to='dashboard' style={{ textDecoration: 'none' }}>
                <div className="logo" onClick={() => setMobileNav(false)}>
                    <span className={`logo_my ${mobileNav ? 'logo-white' : ''}`}>my</span>
                    <span className={`logo_styler ${mobileNav ? 'logo-white' : ''}`}>styler</span>
                </div>
            </Link>
            <div className="main-nav-btns">
                <Link to="/create">
                    <button className={ active === 'create' ? "new-btn new-btn-active" : "new-btn"}>Create Resume</button>
                </Link>
                <Link to="/resumes">
                    <button className={active === 'resumes' ? "resume-btn resume-btn-active" : "resume-btn"}>My Resumes</button>
                </Link>
                <div className="account-menu-container" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
                    <button className={ dropdown || active === 'account' ? "account-btn account-btn-active" : "account-btn"}>Account</button>
                    <div className={dropdown ? "account-dropdown" : "hidden"}>
                        <Link to="/settings">
                            <button className={"settings-btn"}>Settings</button>
                        </Link>
                        <button className="logout-btn" onClick={handleLogOut}>Log Out</button>
                    </div>
                </div>
            </div>
            <div className="navbar-mobile" onClick={() => setMobileNav(!mobileNav)}>
                <div className={mobileNav ? "top-exit-transform" : ""}></div>
                <div className={mobileNav ? "slide-off": "center-burger"}></div>
                <div className={mobileNav ? "bottom-exit-transform": ""}></div>
            </div>
        </div>
    )
}

export default MainNav;