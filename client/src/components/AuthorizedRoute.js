import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedRoute = ({
    isAuth, 
    isAdmin,
    component: Component,  
    user, 
    setLoggedOut,
    ...rest}) => {
    
    return (
        <Route {...rest} render={(props)=> {
            if (isAuth && isAdmin) {
                return <Component user={user} setLoggedOut={setLoggedOut} />
            } else if (isAuth && !isAdmin) {
                return <Redirect to={{pathname: '/create', state: {from: props.location }}}/>
            } else {
                return <Redirect to={{pathname: '/login', state: {from: props.location }}}/>
            }
        }} />
    )
}

export default AuthorizedRoute;