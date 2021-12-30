import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import LandingNav from './LandingNav';

const Register = ({ loggedIn, mobileNav, setMobileNav, setUser, setIsAuth }) => {

    let history = useHistory();

    const [newUser, setNewUser] = useState({
        'name': '',
        'email': '',
        'password': ''
    })

    const [error, setError] = useState('')

    const handleChange = (target, objKey) => {
        let newUserUpdate = {...newUser}
        newUserUpdate[objKey] = target.value;
        setNewUser(newUserUpdate)
    }

    const createNewUser = (e) => {
        e.preventDefault();
        if (newUser.name && newUser.email && newUser.password) {
            axios.post('https://mystyler.herokuapp.com/register-api', newUser)
            //axios.post('http://localhost:4000/register-api', newUser)
            .then(res => {
                if (res.data.error) {
                    setError(res.data.error)
                } else {
                    console.log('success!')
                    setUser({
                        name: newUser.name,
                        email: newUser.email
                    })
                    setIsAuth(true)
                    history.push('/dashboard')
                }
            })
        } else {
            setError('All text fields required')
        }
    }

    return (
        <>
        <div className="page-container register-container">
            <LandingNav loggedIn={loggedIn} mobileNav={mobileNav} setMobileNav={setMobileNav}/>
            <div className="register-background"></div>
            <div className="content-container register-content">
                <h2>Sign Up</h2>
                <form className="login-form" onSubmit={createNewUser}>
                    <div className="login-input-section register-input-section">
                        <label htmlFor="signup_name_input">Name</label>
                        <input type="text" value={newUser.name} id="signup_name_input" onChange={({target}) => handleChange(target, 'name')}/>
                    </div>
                    <div className="login-input-section register-input-section">
                        <label htmlFor="signup_email_input">Email</label>
                        <input type="text" value={newUser.email} id="signup_email_input" onChange={({target}) => handleChange(target, 'email')}/>
                    </div>
                    <div className="login-input-section register-input-section">
                        <label htmlFor="signup_password_input">Password</label>
                        <input type="password" value={newUser.password} id="signup_password_input" onChange={({target}) => handleChange(target, 'password')}/>
                    </div>
                    <p className="register-error">{error}</p>
                    <button type="submit">Create Account</button>
                </form>
                <div className="login-link-container">
                    <p>Already have an account?</p>
                    <Link to="/login">
                        <p className="user-info-btn">Log in</p>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register;