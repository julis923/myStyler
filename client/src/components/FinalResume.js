//Hooks and Helper Functions
import React, { useState, useReducer, useEffect, useRef } from "react";
import { contentExists, numNodes } from "../helpers/functions"

//Components
import { RenderSvg, getIcon } from './svgs';

//Assets
import loadSpinner from '../assets/loadingspinner.gif';
import enlargeIcon from '../assets/enlarge-icon.png';
import decreaseIcon from '../assets/decrease-icon.png';


const ACTIONS = {
    RESIZE_CONTACTP: "resize_contactP",
    RESIZE_P: "resize_p",
    RESIZE_H1: "resize_h1",
    BASE_SIZES: "base-sizes"
}

const FinalResume = ({ resumeData, resumeStyle, zoom, setZoom, loading, setLoading, setResize, resize }) => {
    
    const outerContactWrapper = useRef();
    const outerResumeWrapper = useRef();
    const outerNameWrapper = useRef();
    const outerLeftWrapper = useRef();
    const outerRightWrapper = useRef();
    const innerRightWrapper = useRef();
    const headerSection = useRef();


    //Reducer function to update font size state 
    const reducer = (resume, action) => {
        switch(action.type) {
            case ACTIONS.BASE_SIZES:
                return {
                    ...resume,
                    p: action.payload.em * 0.38,
                    contactP: action.payload.em * 0.38,
                    h1: action.payload.em * 1.2,
                }
            case ACTIONS.RESIZE_P:
                return {
                    ...resume,
                    p: action.payload.newSize,
                }
            case ACTIONS.RESIZE_CONTACTP:
                return {
                    ...resume,
                    contactP: action.payload.newSize,
                }
            case ACTIONS.RESIZE_H1:
                return {
                    ...resume,
                    h1: action.payload.newSize,
                }
            default: 
                return;
        }
    }
    
    //States & reducer
    const [resumeHeight, setResumeHeight] = useState(0)
    const [em, setEm] = useState(resumeHeight * 0.04)
    const [resume, dispatch] = useReducer(reducer, {
        p: 0,
        h1: 0,
        contactP: 0,
        '0': {
            circleFill: 'black',
            pathFill: 'white',
        },
        '1': {
            circleFill: '#EABE21',
            pathFill: 'white',
        },
        '2': {
            circleFill: '#1D8694',
            pathFill: 'white',
        },
        '3': {
            circleFill: '#9F7F7F',
            pathFill: 'white',
        },
        '4': {
            circleFill: '#384C62',
            pathFill: 'white'
        },
        '5': {
            circleFill: '#93AAA0',
            pathFill: 'white'
        },
        '6': {
            circleFill: '#93AAA0',
            pathFill: '#363636'
        },
        '7': {
            circleFill: '#9F7F7F',
            pathFill: '#363636'
        },
        '8': {
            circleFill: '#7F9AB3',
            pathFill: '#363636'
        },
        '9': {
            circleFill: '#D08686',
            pathFill: 'white'
        },
        '10': {
            circleFill: '#384C62',
            pathFill: 'white'
        }, 
        '11': {
            circleFill: '#EABE21',
            pathFill: 'white'
        },
        '12': {
            circleFill: 'black',
            pathFill: 'white'
        },
        '13': {
            circleFill: '#EABE21',
            pathFill: 'white'
        },
        '14': {
            circleFill: '#1D8694',
            pathFill: 'white'
        }
    })
    const [zoomVisible, setZoomVisible] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0)
    const [educationLength, setEducationLength] = useState(resumeData.educationInput.length)

    
    //When window is resized the page rerenders to update resume sizing
    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         setResize(true)
    //         setTimeout(() => {
    //             setResize(false)
    //         }, 800)
    //     })
        
    //     return () => {
    //         window.removeEventListener('resize', null);
    //     }
        
    // }, [])

    //Load spinner effect 
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 200)   
    }, [resumeStyle, setLoading])

    useEffect(() => {
        setResumeHeight(outerResumeWrapper.current.offsetHeight)
        setHeaderHeight(headerSection.current.offsetHeight)
    }, [resumeData, em])

    useEffect(() => {
        setResumeHeight(outerResumeWrapper.current.offsetHeight)
        setHeaderHeight(headerSection.current.offsetHeight)
        setEm(resumeHeight * 0.040)
        dispatch({type: ACTIONS.BASE_SIZES, payload: {em: em}})
    }, [resumeHeight, em, zoom, resize, resumeStyle])

    const contactItemNodes = numNodes(resumeData.contactInput)

    useEffect(() => {
        setEm(resumeHeight * 0.040)
        dispatch({type: ACTIONS.BASE_SIZES, payload: {em: em}})
    }, [resumeData.headerInput.name.length, em, resumeHeight, contactItemNodes])

    //Function that resizes text. Takes in current size and decrements it
    const resizeFont = (size, action, decrement) => {
        let newSize = size - decrement;
        if (newSize > 0) {
            dispatch({type: `${action}`, payload: {newSize: newSize}})
        }
    }

    //Effect fires every time value changes and document p changes. This way, it will check itself after the resizeText function fires and will only stop if the text fits
    useEffect(() => {
        if (outerContactWrapper.current.scrollHeight > outerContactWrapper.current.clientHeight) {
            setLoading(true)
            resizeFont(resume.contactP, ACTIONS.RESIZE_CONTACTP, 0.2)
        } else {
            setTimeout(() => {
                setLoading(false)
            })
            return;
        }
        }, [resume.contactP, zoom, resumeData, resize, setLoading])
    

    useEffect(() => {
        if (outerNameWrapper.current.scrollHeight > outerNameWrapper.current.clientHeight) {
            setLoading(true)
            resizeFont(resume.h1, ACTIONS.RESIZE_H1, 0.15)
        } else {
            setTimeout(() => {
                setLoading(false)
            })
            return;
        }
    }, [resumeData, zoom, resume.h1, resize, setLoading])

    useEffect(() => {
        if (outerLeftWrapper.current.scrollHeight > outerLeftWrapper.current.clientHeight || outerRightWrapper.current.scrollHeight > outerRightWrapper.current.clientHeight) {
            setLoading(true)
            resizeFont(resume.p, ACTIONS.RESIZE_P, 0.05)
        } else {
            setTimeout(() => {
                setLoading(false)
            })
            return;
        }
    }, [resume.p, resumeData, zoom, resize, setLoading])

    useEffect(() => {
        setEducationLength(resumeData.educationInput.length)
    }, [resumeData])


    //Data Elements

    const contactItems = []
    const otherContactItems = []

    resumeData.contactInput.map((item, i) => {
        let imageInc = em * .15
        if (!item[0] && item.text) {
            contactItems.push(
                <div className="contact-item" key={`${i}-contact`}>
                    <p style={{fontSize: resume.contactP}}>{item.text}</p> 
                    <RenderSvg component={getIcon(item.image)} circleFill={resume[resumeStyle].circleFill} pathFill={resume[resumeStyle].pathFill} width={resume.contactP + imageInc} height={resume.contactP + imageInc} />
                </div>
            )
        } else {
            if (item[0]) {
                item.map((other, i) => {
                    if (other.text) {
                        otherContactItems.push(
                        <div className="contact-item" key={`${i}-contact-other`}>
                            <p style={{fontSize: resume.contactP}}>{other.text}</p>
                            <RenderSvg component={getIcon(other.image)} circleFill={resume[resumeStyle].circleFill} pathFill={resume[resumeStyle].pathFill} width={resume.contactP + imageInc} height={resume.contactP + imageInc} />
                        </div>)
                    }
                    return null;  
                })
            }
        }
        return null;
    })


    const styleContactWrapper = () => {
        if ((resumeStyle >= 0 && resumeStyle < 3 && contactItems.length + otherContactItems.length > 3) || (resumeStyle >= 6 && resumeStyle < 9 && contactItems.length + otherContactItems.length > 3) || (resumeStyle >= 12 && resumeStyle < 15 && contactItems.length + otherContactItems.length > 3 )) {
            return {
                justifyContent: "space-between"
            }
        }
    }

    if (!outerResumeWrapper || !outerContactWrapper || !outerLeftWrapper  ) return null;
    return (
        <>

            <div className={`resume-${resumeStyle} outer-resume-wrapper ${zoom ? "enlarged-outer-resume-wrapper" : ''}`} style={{fontSize: em }} ref={outerResumeWrapper} onMouseOver={() => setZoomVisible(true)} onMouseLeave={() => setZoomVisible(false)}>
            <div className={zoomVisible ? "zoom-button flex" : "hidden"} onClick={()=> setZoom(!zoom)}>
                <img src={zoom ? decreaseIcon : enlargeIcon} alt="resize resume button"/>
            </div>
                <div className={`inner-resume-wrapper ${ resize ? 'hidden' : '' }`}>
                    <div className="header-section" ref={headerSection}>
                        <div className="name-title-wrapper">
                            <div className="outer-name-wrapper" ref={outerNameWrapper}>
                                <h1 style={{ fontSize: resume.h1 }}>{resumeData.headerInput.name}</h1>            
                                <div className={`${resumeData.headerInput.name ? 'header-underline' : ''}`}></div>
                            </div> 
                            <h2>{resumeData.headerInput.title}</h2>
                        </div>
                        <div className={contentExists(resumeData.contactInput) ? "outer-contact-wrapper": ""} ref={outerContactWrapper} style={styleContactWrapper()}>  
                            {contactItems}
                            {otherContactItems}
                        </div>
                    </div>
                    
                    <div className="outer-body-wrapper" style={{height: resumeHeight - headerHeight }}>
                        <div className="inner-body-wrapper">
                            <div className="outer-left-body-wrapper" ref={outerLeftWrapper}>
                                <div className={`${contentExists(resumeData.contactInput) ? "extra-body-padding" : ""} inner-left-body-wrapper`}>
                                    { resumeData.summaryInput[0] ? 
                                        <div className="content-section summary-section">
                                            <h2>SUMMARY</h2>
                                            <p style={{fontSize: resume.p}}>{resumeData.summaryInput}</p>
                                        </div>
                                        : 
                                        <div></div>
                                    }
                                    { contentExists(resumeData.educationInput) ? 
                                        <div className="content-section">
                                            <h2>EDUCATION</h2>
                                            {resumeData.educationInput.map((item, i) => {
                                                const info = item['additional-info'].text.split(',')
                                                return (
                                                    <div className={educationLength - 1 === i ? "" : "education-item"} style={{fontSize: resume.p}} key={`${i}-education`}>
                                                        <div className="all-degrees-wrapper" key={`${i}-education-degrees`}>
                                                            {item['degrees'].map((degree, x) => {
                                                                return (
                                                                    <div className="degree-wrapper" key={`${i}${x}-degree`}>
                                                                        <p className="degree-type">{degree['degree-type'].text}</p>
                                                                        <p className="degree-field">{degree['degree-field'].text}</p>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        <div className="institution-wrapper" key={`${i}-institution`}>
                                                            <p>{item.institution.text}</p>
                                                            <div className="dates-wrapper">
                                                                <p>{item['start-date'].text}</p>
                                                                <span style={ item['start-date'].text && item['end-date'].text ? {margin: '0 .2em'} : {display: 'none'} }> - </span>
                                                                <p>{item['end-date'].text}</p>
                                                            </div>
                                                        </div> 
                                                        {info.map((infoItem, y) => {
                                                            return (
                                                                <p className="additional-info" key={`${i}${y}-education-info`}>{infoItem}</p>
                                                            )
                                                        })} 
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        : 
                                        <div></div>
                                    }
                                    {contentExists(resumeData.skillsInput) ?  
                                        <div className="content-section skill-content-section">
                                            <h2>SKILLS</h2>
                                            {resumeData.skillsInput.map((section, i) => {
                                                const regex = /,/g
                                                return (
                                                    <div className={section['skill-category'].text ? "skill-category-wrapper" : ""} style={{fontSize: resume.p}} key={`${i}-skill-category`}>
                                                        <p className="skill-category">{section['skill-category'].text}</p>
                                                        <div className="skills-wrapper">
                                                            <p>{section['skills'].text.replace(regex, ' /')}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>  
                                        
                                        : <div></div>   
                                    }
                                </div>
                            </div>
                            <div className="outer-right-body-wrapper" ref={outerRightWrapper}>
                                <div className={`${contentExists(resumeData.contactInput) ? "extra-body-padding" : ""} inner-right-body-wrapper`} ref={innerRightWrapper}>
                                    {contentExists(resumeData.experienceInput) ? 
                                        <div>
                                            <h2>EXPERIENCE</h2>
                                            {resumeData.experienceInput.map((section, i) => {
                                                return (
                                                    <div className="experience-content-wrapper" key={`${i}-experience-section`} style={{fontSize: resume.p}}>
                                                        <div className="experience-title-dates-wrapper">
                                                            <p className="job-title">{section['job-title'].text}</p>  
                                                            <div className="experience-dates-wrapper">
                                                                <p>{section['start-date'].text}</p>
                                                                <p>{section['start-date'].text && section['end-date'].text ? ' / ' : ''}</p>
                                                                <p>{section['end-date'].text}</p>
                                                            </div>
                                                        </div>
                                                        <p className="company" key={`${i}-experience-company`}>{section.company.text}</p>
                                                        <p className="experience-summary" key={`${i}-experience-summary`}>{section.summary.text}</p>
                                                        <ul key={`${i}-experience-details`} className="experience-details-ul">
                                                            {section.details.map((detail, x) => {
                                                                if (detail.text) {
                                                                    return (
                                                                        <li key={`${i}${x}-experience-detail`} className="experience-detail">{detail.text}</li>
                                                                    )
                                                                } 
                                                                return null;
                                                            })}
                                                        </ul>
                                                        
                                                    </div>
                                                    
                                                )
                                            })}
                                        </div> 
                                        : 
                                        <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={loading || resize ? "load" : "no-display"}>
                    <img src={loadSpinner} alt="load spinner animation"/>
                </div>
            </div>   
        </>
    )
}

export default FinalResume;


