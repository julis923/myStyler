const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const Resume = require('../models/resume-model');
const fs = require('fs')
const { validateUpdate, validatePassword } = require('../validation')
const bcrypt = require('bcrypt');
const { getFile, deleteFile } = require('../s3');


router.post('/', (req, res) => {
    res.json(req.body)
})

router.get('/resumes', async (req, res) => {
    const { userId } = req.session;
    const resumeArray = []
    await Resume.find({ user: userId }).exec()
    .then(resumes => {
        resumes.forEach(resume => {
            getFile(resume.thumbnail)
            resumeArray.push(
                {
                    data: resume.data,
                    id: resume._id,
                    user: resume.user,
                    thumbnail: resume.thumbnail,
                }
            )
        })
        res.send(resumeArray)
    })
})

router.post('/delete-resume', async (req, res) => {
    const resId = req.body[0]
    const thumbnailPath = req.body[1]

    Resume.findByIdAndDelete(resId, function(err) {
        if (err) res.status(400).json(err);
    })
    res.json('successfully deleted')
    try {
        fs.unlinkSync(__dirname + '/../public/' + thumbnailPath + '.png')
        console.log('image deleted on server')
        deleteFile(thumbnailPath)
    } catch(err) {
        console.log('deletion error:', err)
    }
})

router.post('/update', async (req, res) => {
    const { userId } = req.session;
    
    const dataName = req.body.dataName;
    const data = req.body.data;

    const {error} = validateUpdate(dataName, data);
    if (error) return res.send({error: `Please provide a valid ${dataName}`});

    if (dataName === "email") {
        const userExists = await User.findOne({email: data}).exec();
        if (userExists !== null) return res.send({error: 'Email is associated with another account'});
    }

    const filter = { _id: userId }
    const update = { [dataName]: data }

    const user = await User.findOneAndUpdate(filter, update, {
        returnOriginal: false
    });
    if (user) {
        res.send({
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400).json('user not found')
    }
})

router.post('/reset-password', async (req, res) => {
    
    const { userId } = req.session;
    const user = await User.findOne({ _id: userId }).exec();

    const validPassword = await bcrypt.compare(req.body[0], user.password)
    if (!validPassword) return res.json({error: 'Current password incorrect, please try again'});

    const {error} = validatePassword(req.body[1]);
    if (error) return res.send({error: 'Password must be at least 6 characters long'})
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body[1], salt);

    const filter = { _id: userId }
    const update = { password: hash }

    const userUpdate = await User.findOneAndUpdate(filter, update, {
        returnOriginal: false
    })
    .catch((err) => {
        console.log(err)
    })

    res.json('password updated');
})

module.exports = router;