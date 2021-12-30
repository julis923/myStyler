const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const { validateRegistration } = require('../validation')


router.post('/', async (req, res) => {
    
    //Validate that all data meets requirements 
    const {error} = validateRegistration(req.body);
    if (error) return res.send({error: error.details[0].message})

    //Check if user already in database
    const userExists = await User.findOne({email: req.body.email}).exec();
    if (userExists !== null) return res.send({error: 'Email is associated with another account'});

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt);
    
    //Create new User for database
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    })

    //Save user to database or catch error
    try{
        const savedUser = await newUser.save()
        req.session.userId = savedUser._id
        res.json({auth: true, admin: false, user: {name: savedUser.name, email: savedUser.email}})
    } catch(err) {
        res.status(400).json(err)
    }  
})

module.exports = router;