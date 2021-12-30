import axios from 'axios';
import React from 'react';
import { useHistory } from "react-router-dom";

const ErrorMessage = ({ setError, setIsAuth }) => {

    const history = useHistory()
    
    const handleError = () => {
        axios.get('http://localhost:4000/login-api')
        //axios.get('https://mystyler.herokuapp.com/login-api')
        .then(res => {
            if (!res.data.auth) {
                setIsAuth(false)
                history.push('/login')
            }
        })
        setError(false)
    }
    
    
    return (
        <div className="error-container">
            <div className="error-message">
                <p className="error-icon">!</p>
                <p>Something went wrong! Try again.</p>
                <button onClick={handleError}>OK</button>
            </div>
        </div>
    )
}

export default ErrorMessage;