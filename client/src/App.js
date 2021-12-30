//Stylesheet
import './styles/app.css';

//Hooks and Helper Functions
import React, { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import axios from 'axios';
import { useWindowWidth } from '@react-hook/window-size';

//Components 
import LoginPage from './components/LoginPage'
import CreateResume from './components/CreateResume'
import RegisterPage from './components/RegisterPage'
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthorizedRoute from './components/AuthorizedRoute';
import Dashboard from './components/Dashboard';
import PDF from './components/PDF';
import UserResumes from './components/UserResumes';
import Settings from './components/Settings';

//Assets
import loadSpinner from './assets/loadingspinner.gif'

function App() {

  //Allow client to save cookie sent from server
  axios.defaults.withCredentials = true;

  //Global authorization, user, and loading states
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const width = useWindowWidth();

  useEffect(() => {
    if (width >= 900) {
      setMobileNav(false)
    }
  }, [width])

  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [mobileNav])


  useEffect(() => {
    setIsAuth(false)
    setIsAdmin(false)
    setUser({})
    setLoggedOut(false)
  },[loggedOut])

  //On every render, authorize user and get user name & email
  useEffect(() => {
    axios.get('https://mystyler.herokuapp.com/login-api')
    //axios.get('http://localhost:4000/login-api')
    .then((res) =>{
      if (res.data.user) {
        setIsAuth(true)
        setUser({
          name: res.data.user.name,
          email: res.data.user.email
        })
        if (res.data.admin) {
          setIsAdmin(true)
        }
        setIsLoading(false)
      } else {
        setIsAuth(false)
        setIsLoading(false)
      }
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setIsAuth(false)
      setIsLoading(false)
    })

  }, [])

  //If loading, return blank page with spinner
  if (isLoading) {
    return <div className="loading-page"><img src={loadSpinner} alt="loading spinner animation"></img></div>
  }

  //Routes
  return (
    <div className={`${mobileNav ? "app no-overflow" : "app"}`}>
          <Route exact path="/">
            <LandingPage 
              isAuth={isAuth} 
              mobileNav={mobileNav} 
              setMobileNav={setMobileNav} 
            />   
          </Route>
          <Route exact path="/login">
            <LoginPage 
              isAuth={isAuth} 
              setIsAuth={setIsAuth} 
              user={user} 
              setUser={setUser} 
              mobileNav={mobileNav}
              setMobileNav={setMobileNav}
            />
          </Route>
          <Route exact path="/register">
            <RegisterPage 
              isAuth={isAuth} 
              mobileNav={mobileNav} 
              setMobileNav={setMobileNav} 
              setUser={setUser} 
              setIsAuth={setIsAuth}
            />
          </Route>
          <ProtectedRoute 
            path="/dashboard" 
            component={Dashboard} 
            isAuth={isAuth} 
            user={user} 
            setLoggedOut={setLoggedOut}
            mobileNav={mobileNav} 
            setMobileNav={setMobileNav}
            isLoading={isLoading}
          />
          <ProtectedRoute 
            exact path="/create" 
            component={CreateResume} 
            isAuth={isAuth} 
            setIsAuth={setIsAuth}
            user={user} 
            setLoggedOut={setLoggedOut}
            mobileNav={mobileNav} 
            setMobileNav={setMobileNav}
          />
          <AuthorizedRoute 
            path="/pdf" 
            component={PDF} 
            isAuth={isAuth} 
            isAdmin={isAdmin}
            user={user} 
            setLoggedOut={setLoggedOut}
          />
          <ProtectedRoute 
            path="/resumes" 
            component={UserResumes} 
            isAuth={isAuth} 
            setIsAuth={setIsAuth}
            user={user} 
            setLoggedOut={setLoggedOut}
            mobileNav={mobileNav} 
            setMobileNav={setMobileNav}
          />
          <ProtectedRoute 
            path="/settings" 
            component={Settings} 
            isAuth={isAuth} 
            user={user} 
            setUser={setUser}
            setLoggedOut={setLoggedOut}
            mobileNav={mobileNav} 
            setMobileNav={setMobileNav}
          />
    </div>
  );
}

export default App;
