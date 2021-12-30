import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

const MobileNav = ({ mobileNav, setMobileNav, setLoggedOut }) => {

    const history = useHistory();

    const handleLogOut = () => {
        axios.get('https://mystyler.herokuapp.com/logout')
        //axios.get('http://localhost:4000/logout')
        .then(res => {
            setLoggedOut(true)
            sessionStorage.removeItem('resumeData')
            setMobileNav(false)
            history.push('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={`${mobileNav ? "main-mobile-nav-page" : "mobile-nav-page_invisible"}`}> 
            <div className="main-mobile-nav-buttons">
                <Link to="/create">
                    <button className="expanded-nav-btn mobile-nav-btn" onClick={() => setMobileNav(false)}>Create Resume</button>
                </Link>
                <Link to="/resumes">
                    <button className="expanded-nav-btn mobile-nav-btn" onClick={() => setMobileNav(false)}>My Resumes</button>
                </Link>
                <Link to="/settings">
                    <button className="expanded-nav-btn mobile-nav-btn" onClick={() => setMobileNav(false)}>Settings</button>  
                </Link>
                <button className="expanded-nav-btn mobile-nav-btn" onClick={handleLogOut}>Log Out</button>      
            </div>
            <div className="main-mobile-nav-bg"></div>                
        </div>
    )
}

export default MobileNav;