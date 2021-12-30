//Data & Helper Functions
import React, {useState, useEffect } from 'react';
import {resumeObject, inputsObject } from './ResumeData';
import { useWindowWidth } from '@react-hook/window-size';
// import { generateData } from './format-tests';

//Components
import ErrorMessage from './ErrorMessage';
import MainNav from './MainNav';
import MobileNav from './MobileNav';
import SaveModal from './SaveModal';
import FinalResume from './FinalResume';
import InputTab from './InputTab';
import StyleSelector from './SelectStyle';

//Assets
import expandTabs from '../assets/expand-tabs.png'

const CreateResume = ({ setLoggedOut, mobileNav, setMobileNav, setIsAuth }) => {

  //Save deep copy of the resume object (clean slate) to a variable
  const resumeObjectCopy = JSON.parse(JSON.stringify(resumeObject));

  //Pull session resume data from browser and parse into object
  let session = sessionStorage.getItem('resumeData')
  let sessionData = JSON.parse(session)

  //Set the resumeData state. If there is session resume data from the browser, assign it to the state and
  // the browser will rerender and populate all input fields with corresponding values
  // If no session data, then set the state to the deep copy, which has no values yet. 
  const [resumeData, setResumeData] = useState(sessionData ? sessionData : resumeObjectCopy)

  //Additional states for UI/UX
  const [styleBar, setStyleBar] = useState(true)
  const [textBar, setTextBar] = useState(true)
  const [modalDisplay, setModalDisplay] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [duplicated, setDuplicated] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [minMargin, setMinMargin] = useState(false)
  const [tab, setTab] = useState('header')
  const [resumeTitle, setResumeTitle] = useState(resumeData.resumeTitle)
  const [creatingResume, setCreatingResume] = useState(false)
  const [tabMenu, setTabMenu] = useState(false)
  const [resize, setResize] = useState(false)


  //Each time the resumeData state is updated when input values are changed by the user, it is resaved in session storage 
  useEffect(() => {
    sessionStorage.setItem('resumeData', JSON.stringify(resumeData))
  }, [resumeData])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= 60) {
        setMinMargin(true);
      } else {
        setMinMargin(false)
      }
    })

    return () => {
      window.removeEventListener('scroll', null)
    }
  }, [])
  
  //Clears all fields by removing the resume data object from session storage and resetting resumeData state to the deep copy
  const clearResume = () => {
    sessionStorage.removeItem('resumeData')
    setResumeData(resumeObjectCopy)
    setResumeTitle('Untitled')
  }

  const width = useWindowWidth();

  const handleTabClick = (input) => {
    if (width > 500) {
      setTab(input)
    } else {
      if (tab === input) {
        setTabMenu(!tabMenu)
      } else {
        setTab(input)
        setTabMenu(false)
      }
      
    }
  }

  const handleModal = () => {
    setModalDisplay(true)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
        setResize(true)
        setTimeout(() => {
            setResize(false)
        }, 800)
    })
    
    return () => {
        window.removeEventListener('resize', null);
    }
    
}, [])

  // UNCOMMENT TO GENERATE RANDOM DATA TO TEST FORMATTING //

  // const testGenerator = () => {
  //   let testObjectCopy = JSON.parse(JSON.stringify(resumeObject))
  //   generateData(testObjectCopy)
  //   sessionStorage.setItem('resumeData', JSON.stringify(testObjectCopy))
  // }

  // testGenerator()

  return (
    <>
      <div className={modalDisplay ? 'noclick' : ''}>
        <MainNav setLoggedOut={setLoggedOut} mobileNav={mobileNav} setMobileNav={setMobileNav} active={'create'}/>
        <div className="create-container">
          <div className={`create-forms ${zoom ? 'create-forms-zoom' : ''}`}>

          <div className="create-form-container">
            <div className="directions" onClick={() => setStyleBar(!styleBar)}>
              <div className="step">1</div>
              <h4>Select the style of your resume<span className="expand-bar-btn">{styleBar ? 'hide -' : 'open +'}</span></h4>
            </div>
            <StyleSelector resumeData={resumeData} setResumeData={setResumeData} display={styleBar}/>
          </div>
          
          <div className="create-form-container">
            <div className="directions" onClick={() => setTextBar(!textBar)}>
                <div className="step">2</div>
                <h4 id="open-inputs">Enter your information in the text fields below<span className="expand-bar-btn">{textBar ? 'hide -' : 'open +'}</span></h4>   
            </div>

            <form className={`input-form ${textBar ? "" : "height-0"}`} action="text" onSubmit={(e) => e.preventDefault()}>
              <div className="section-selector">
                {Object.keys(inputsObject).map((input) => {
                  return (     
                      <h5 
                        className={`
                          ${input}-tab 
                          ${tab === input ? "active-tab" : "tab"} 
                          ${tabMenu ? "mobile-tab" : "" } 
                          ${tabMenu && tab === input && input !== "header" && input !== "experience" ? "active-menu-tab" : "" }
                          ${!tabMenu && input === "experience" && width <= 500 ? "active-experience-menu-tab" : "" }
                        `} 
                        id={`${input}-tab`}
                        key={`${input}-tab`}
                        onClick={() => handleTabClick(input)}>
                        {inputsObject[input].label}
                        <img className={`${tab === input ? "expand-tabs" : "hidden"} ${tabMenu ? "rotate" : "" }`} src={expandTabs} alt="select input section"></img>
                      </h5>
                  )
                })}
              </div>
              <div className={`section ${textBar ? "" : "height-0"} ${tabMenu ? "hidden" : ""}`}>
                  <InputTab component={inputsObject[tab].component} resumeData={resumeData} setResumeData={setResumeData} duplicated={duplicated} setDuplicated={setDuplicated} />
              </div>
            </form>
          </div>

          <div className="save-resume-container">
            <button className="save-resume" onClick={handleModal}>Save Resume</button> 
            <button className="clear-fields" onClick={clearResume}>Clear All Fields</button>
          </div>
        </div>
        <div className={`create-resume-preview ${zoom ? 'create-resume-preview-zoom' : ''} ${minMargin && !zoom && !resize ? 'min-margin-top' : ''}`}>
            <FinalResume 
                resumeData={resumeData}
                resumeStyle={resumeData.resumeStyle}
                zoom={zoom}
                setZoom={setZoom}
                loading={loading}
                setLoading={setLoading}
                resize={resize}
                setResize={setResize}
              />
        </div>
        </div>
        <SaveModal 
          modalDisplay={modalDisplay} 
          setModalDisplay={setModalDisplay} 
          creatingResume={creatingResume} 
          setCreatingResume={setCreatingResume}
          resumeData={resumeData}
          setResumeData={setResumeData}
          loading={loading}
          resumeTitle={resumeTitle}
          setResumeTitle={setResumeTitle}
          error={error}
          setError={setError}
        />
      </div>
      {
        error ? <ErrorMessage setError={setError} setIsAuth={setIsAuth} /> : null
      }
      <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} setLoggedOut={setLoggedOut}/> 
    </>
  )
}

export default CreateResume;