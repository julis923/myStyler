//Hooks and Helper Functions
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

//Components
import LandingNav from './LandingNav';

const LoginPage = ({ isAuth, setIsAuth, setUser, mobileNav, setMobileNav }) => {

    let history = useHistory();

    const [userLogin, setUserLogin] = useState({
        'email': '',
        'password': ''
    })

    const [error, setError] = useState({
        error: false,
        message: ''
    })


    const handleChange = (target, objKey) => {
        let newUserLogin = {...userLogin}
        newUserLogin[objKey] = target.value;
        setUserLogin(newUserLogin)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('https://mystyler.herokuapp.com/login-api', userLogin)
        //axios.post('http://localhost:4000/login-api', userLogin)
        .then((res) => {
            //If server does not authenticate user
            if (!res.data.auth) {
                setIsAuth(false)
                setError({error: true, message: 'Email or password is incorrect'})
            } else {
                //If server does authenticate user
                setUser({
                    name: res.data.user.name,
                    email: res.data.user.email
                })
                setIsAuth(true)
            }
        })
        .catch((err) => {
            console.log(err)
            setIsAuth(false)
            setError({error: true, message: 'Please enter your email and password'})
        })
    }

    useEffect(() => {
        if (isAuth) {
            history.push('/dashboard')
        } 
    }, [isAuth, history])
    

    return (  
        <div className="page-container login-container">
            <LandingNav isAuth={isAuth} mobileNav={mobileNav} setMobileNav={setMobileNav}/>
            <div className="login-background"></div>
            <div className="content-container login-content">
                <h2>Log in</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-inputs-flexbox">
                        <div className="login-input-section">
                            <label htmlFor="username">Email</label>
                            <input type="username" value={userLogin.email} id="username" onChange={({target}) => handleChange(target, 'email')}/>
                        </div>
                        <div className="login-input-section">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={userLogin.password} id="password" onChange={({target}) => handleChange(target, 'password')}/>
                        </div>
                    </div>
                    <p className="login-error">{error.message}</p>
                    <button type="submit" id="submit">Submit</button>
                </form>
                <div className="login-link-container">
                    <p>Don't have an account?</p>
                    <Link to="/register">
                        <p className="user-info-btn">Sign up</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;