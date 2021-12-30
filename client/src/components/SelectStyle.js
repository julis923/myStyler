import React, { useEffect } from 'react';
import resumeStyle0 from '../assets/resumes/0.png'
import resumeStyle1 from '../assets/resumes/1.png'
import resumeStyle2 from '../assets/resumes/2.png'
import resumeStyle3 from '../assets/resumes/3.png'
import resumeStyle4 from '../assets/resumes/4.png'
import resumeStyle5 from '../assets/resumes/5.png'
import resumeStyle6 from '../assets/resumes/6.png'
import resumeStyle7 from '../assets/resumes/7.png'
import resumeStyle8 from '../assets/resumes/8.png'
import resumeStyle9 from '../assets/resumes/9.png'
import resumeStyle10 from '../assets/resumes/10.png'
import resumeStyle11 from '../assets/resumes/11.png'
import resumeStyle12 from '../assets/resumes/12.png'
import resumeStyle13 from '../assets/resumes/13.png'
import resumeStyle14 from '../assets/resumes/14.png'


const StyleSelector = ({resumeData, setResumeData, display}) => {

    const styles = [
        {name: 'Classic Black', img: resumeStyle0}, 
        {name: 'Classic Gold', img: resumeStyle1},
        {name: 'Classic Teal', img: resumeStyle2}, 
        {name: 'Colorblock Burgundy', img: resumeStyle3}, 
        {name: 'Colorblock Steel', img: resumeStyle4}, 
        {name: 'Colorblock Olive', img: resumeStyle5}, 
        {name: 'Streamline Olive', img: resumeStyle6}, 
        {name: 'Streamline Burgundy', img: resumeStyle7}, 
        {name: 'Streamline Steel', img: resumeStyle8}, 
        {name: 'Accent Mauve', img: resumeStyle9}, 
        {name: 'Accent Navy', img: resumeStyle10}, 
        {name: 'Accent Gold', img: resumeStyle11},
        {name: 'Statement Black', img: resumeStyle12},
        {name: 'Statement Gold', img: resumeStyle13},
        {name: 'Statement Teal', img: resumeStyle14},
    ]

    let session = sessionStorage.getItem('resumeData')
    let sessionData = JSON.parse(session)

    
   const handleStyleUpdate = (style) => {
       setResumeData({...resumeData, resumeStyle: style })
   }

   useEffect(() => {
    setResumeData({...resumeData, resumeStyle: sessionData !== null ? sessionData.resumeStyle : '0' })
   }, [])

    return (
        <div className={`styles-container ${display ? "" : "height-0"}`}>
            {Object.keys(styles).map((key) => {
                return (
                    <div key={`style-${key}`} className={`${resumeData.resumeStyle === key ? 'selected-style' : 'unselected-style'} style-option`} onClick={() => handleStyleUpdate(key)}>
                        <img src={styles[key].img} alt={`resume ${styles[key].name}`}/>
                        <p>{styles[key].name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default StyleSelector;