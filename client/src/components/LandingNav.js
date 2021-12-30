import React from 'react';
import { Link, useHistory } from 'react-router-dom'

const LandingNav = ({ loggedIn, mobileNav, setMobileNav }) => {

    let history = useHistory();

    const handleNav = (route) => {
        history.push(route)
        setMobileNav(false)
    }

    return (
        <div>
            <div className="landing-nav">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="logo" onClick={() => setMobileNav(false)}>
                        <span className={`logo_my ${mobileNav ? "navy" : ""}`}>my</span>
                        <span className={`logo_styler ${mobileNav ? "navy" : ""}`}>styler</span>
                    </div>
                </Link>
                <div className="landing-nav-btn-container">
                    <Link to={loggedIn ? '/dashboard' : '/login'}>
                        <button className="navbar-login-btn">Log In</button>
                    </Link>
                    <Link to="/register">
                        <button className="navbar-signup-btn">Sign Up</button>
                    </Link>
                </div>
                <div className="navbar-mobile" onClick={() => setMobileNav(!mobileNav)}>
                    <div className={mobileNav ? "top-exit-transform" : ""}></div>
                    <div className={mobileNav ? "slide-off": "center-burger"}></div>
                    <div className={mobileNav ? "bottom-exit-transform": ""}></div>
                </div>
            </div>
            <div className={`${mobileNav ? "landing-nav-mobile_expanded" : "mobile-nav-page_invisible"}`}>     
                <button className="expanded-nav-btn expanded-login-btn" onClick={() => handleNav('/login')}>Log in</button>
                <button className="expanded-nav-btn expanded-signup-btn" onClick={() => handleNav('/register')}>Sign up</button>             
            </div>
        </div>
        
    )
}

export default LandingNav;