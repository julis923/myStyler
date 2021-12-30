const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const { validateLogin } = require('../validation')

router.post('/', async (req, res) => {

    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    const user = await User.findOne({email: req.body.email}).exec();

    if (user === null) {
        return res.json({auth: false, admin: false, message: 'email not found'});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.json({auth: false, admin: false, message: 'wrong username/password'});

    if (user) {
        req.session.userId = user._id
        if (user._id === '61b6b45790baac570b14d195') {
            console.log('puppeteer admin')
            return res.json({auth: true, admin: true, user: {name: user.name, email: user.email}})
        }
        return res.json({auth: true, admin: false, user: {name: user.name, email: user.email}})
    } else {
        return res.json({auth: false, admin: false, message: 'user not authenticated!'})
    }
})

router.get('/', async (req, res) => {
    const { userId } = req.session;
    try {
        const user = await User.findOne({_id: userId}).exec();
        if (user) {
            if (userId === '61b6b45790baac570b14d195') {
                res.json({auth: true, admin: true, user: {name: user.name, email: user.email}})
            } else {
                res.json({auth: true, admin: false, user: {name: user.name, email: user.email}})
            }
        } else {
            res.json({auth: false, admin: false, message: 'user not authenticated'})
        }
    }catch(err) {
        console.log(err)
    }
})

module.exports = router;