import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({
    isAuth, 
    setIsAuth,
    component: Component,  
    user, 
    setLoggedOut,
    mobileNav,
    setMobileNav,
    setUser,
    ...rest}) => {
    
    return (
        <Route {...rest} render={(props)=> {
            if (isAuth) {
                return <Component user={user} setIsAuth={setIsAuth} setUser={setUser} setLoggedOut={setLoggedOut} mobileNav={mobileNav} setMobileNav={setMobileNav} />
            } else {
                return <Redirect to={{pathname: '/login', state: {from: props.location }}}/>
            }
        }} />
    )
}

export default ProtectedRoute;