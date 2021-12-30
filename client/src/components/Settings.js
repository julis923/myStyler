//Hooks and Helper Functions
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Components
import MainNav from './MainNav';
import MobileNav from './MobileNav';

//Assets
import editIcon from '../assets/edit-icon.png'

const Settings = ({ user, setUser, setLoggedOut, mobileNav, setMobileNav }) => {

    const [editingName, setEditingName] = useState(false)
    const [editingEmail, setEditingEmail] = useState(false)
    const [editingPassword, setEditingPassword] = useState(false)
    const [name, setName] = useState(user.name)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [nameError, setNameError] = useState(null)
    const [nameSuccess, setNameSuccess] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [emailError, setEmailError] = useState(null)
    const [emailSuccess, setEmailSuccess] = useState(false)
    const [passwordError, setPasswordError] = useState(null)
    const [passwordSuccess, setPasswordSuccess] = useState(false)

    const handleUserUpdate = (updateData) => {
        let update;
        if (updateData === "name") {
            update = name;
            if (update === user.name) {
                setNameError('Please update name before submitting')
                return;
            }
        } else {
            update = email;
            if (update === user.email) {
                setEmailError('Please update email before submitting')
                return;
            }
        }
        // axios.post('http://localhost:4000/user/update', {
        //     dataName: updateData,
        //     data: update,
        // })
        axios.post('https://mystyler.herokuapp.com/user/update', {
            dataName: updateData,
            data: update,
        })
        .then((res) => {
            if (!res.data.error) {
                setUser({
                    name: res.data.name,
                    email: res.data.email
                })
                if (updateData === "name") {
                    setEditingName(false)
                    setNameSuccess(true)
                } else {
                    setEditingEmail(false)
                    setEmailSuccess(true)
                    
                }
            } else {
                if (updateData === "name") {
                    setNameError(res.data.error)
                } else {
                    setEmailError(res.data.error)
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handlePasswordUpdate = () => {
        setPasswordError(null)
        if (currentPassword === newPassword) {
            setPasswordError('Please update password before submitting')
            return;
        }
        //axios.post('http://localhost:4000/user/reset-password', [currentPassword, newPassword])
        axios.post('https://mystyler.herokuapp.com/user/reset-password', [currentPassword, newPassword])
        .then(res => {
            console.log(res)
            if (res.data.error) {
                setPasswordError(res.data.error)
            } else {
                setPasswordSuccess(true)
                setEditingPassword(false)
            }
        })
    }

    useEffect(() => {
    }, [user])
    

    return (
        <>
            <MainNav setLoggedOut={setLoggedOut} mobileNav={mobileNav} setMobileNav={setMobileNav} active={'account'} /> 
            <div className="settings-body">
                <h3>Account Settings</h3>
                <div className="settings-section">
                    <div className="setting">
                        <h4>Name</h4>
                        <img src={editIcon} alt="edit icon" onClick={() => setEditingName(true)}/>
                    </div>
                    <p className={editingName? "hidden" : ""}>{user.name}</p>
                    <div className={editingName ? "edit-input" : "hidden"}>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        <button className="save-button" onClick={() => handleUserUpdate('name')}>Save</button>
                        <button className="cancel-button" onClick={() => {setEditingName(false); setNameError(null)}}>Cancel</button>
                    </div>
                    {nameError && editingName ? <p className="update-error">{nameError}</p> : null }
                    {nameSuccess ? <p className="update-success">Name successfully updated!</p> : null }
                </div>
                <div className="settings-section">
                    <div className="setting">
                        <h4>Email</h4>
                        <img src={editIcon} alt="edit icon" onClick={() => setEditingEmail(true)}/>
                    </div>
                    <p className={editingEmail? "hidden" : ""}>{user.email}</p>
                    <div className={editingEmail ? "edit-input" : "hidden"}>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button className="save-button" onClick={() => handleUserUpdate('email')}>Save</button>
                        <button className="cancel-button" onClick={() => {setEditingEmail(false); setEmailError(null)}}>Cancel</button>
                    </div>
                    {emailError && editingEmail ? <p className="update-error">{emailError}</p> : null }
                    {emailSuccess ? <p className="update-success">Email successfully updated!</p> : null }
                    
                </div>
                <div className="settings-section">
                    <div className="setting">
                        <h4>Password</h4>
                        <img src={editIcon} alt="edit icon" onClick={() => setEditingPassword(true)}/>
                    </div>
                    <p className={editingPassword ? "hidden" : ""}>To reset your password, click <button className="reset-password" onClick={() => setEditingPassword(true)}>here</button>.</p>
                    <form className={editingPassword ? "" : "hidden"} autoComplete="off" method="post" action="/form">
                        <div className="reset-step">
                            <label htmlFor="enterPass">Enter your current password</label>
                            <input type="password" value={currentPassword} label="enterPass" autoComplete="off" onChange={(e) => setCurrentPassword(e.target.value)}/>
                        </div>
                        <div className="reset-step">
                            <label htmlFor="newPass">Enter your new password</label>
                            <input type="password" label="newPass" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        </div>
                        <div>
                            <button className="save-button reset-button" onClick={(e) => {e.preventDefault(); handlePasswordUpdate()}}>Reset Password</button>
                            <button className="cancel-button password-cancel-button" onClick={(e) => {e.preventDefault(); setEditingPassword(false); setPasswordError(null)}}>Cancel</button>
                        </div>
                        {passwordError ? <p className="update-error">{passwordError}</p> : null}
                    </form>
                    {passwordSuccess ? <p className="update-success">Password successfully updated</p> : null}
                </div>
                <div className="contact-section">
                    <h3>Questions?</h3>
                    <p>To get in touch with any questions, issues, or special requests, please contact me at juliswanson@gmail.com. Cheers!</p>
                    <br/>
                    <p style={{fontStyle: "italic"}}>Created with React, Node.js/Express, MongoDB, AWS S3, and Sass.</p>
                </div>
            </div> 
            <MobileNav mobileNav={mobileNav} setMobileNav={setMobileNav} setLoggedOut={setLoggedOut}/>  
        </>
    )
}

export default Settings;