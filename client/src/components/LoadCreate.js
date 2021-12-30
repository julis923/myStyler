
import React, { useEffect, useState } from 'react';
import spinningGears from '../assets/spinning-gears.gif';

const LoadCreate = ({ creatingResume }) => {

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (!creatingResume) {
            setTimeout(() => {
                setDisplay(false)
            }, 1300)
        } else {
            setDisplay(true)
        }

    }, [creatingResume])


    return (
        <div className={display ? 'creating-loadscreen' : ''} style={creatingResume ? {display: 'flex'} : {display: 'none'}}>
            <h2>Creating your resume...</h2>
            <img className="spinning-gears" src={spinningGears} alt="spinning gears animation"></img>
        </div>
    )
}

export default LoadCreate;