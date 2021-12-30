const express = require('express');
const router = express.Router();
let puppeteer = require("puppeteer")
const Resume = require('../models/resume-model');
const path = require('path');
const fs = require('fs');
const { uploadFile } = require('../s3');





router.post('/', async (req, res) => {
    //Save request body (resume data object) as a variable
    const resumeData = req.body;

    //Launch puppeteer and log in using master login
    try {
        const browser = await puppeteer.launch({ 
            headless: true,
            'args' : [
                '--no-sandbox',
            ]
        });
        const page = await browser.newPage();
        await page.goto('https://mystyler.herokuapp.com/login', {waitUntil: 'networkidle0'});
        await page.type('#username', process.env.PDF_USER)
        await page.type('#password', process.env.PDF_PASS)
        await page.click('#submit')
        await page.waitForNavigation();
        
        const setStorage = await page.evaluate((resumeData) => {
            sessionStorage.removeItem('resumeData')
            sessionStorage.setItem('resumeData', JSON.stringify(resumeData));
        }, resumeData);

        //Navigate to protected PDF url
        await page.goto('https://mystyler.herokuapp.com/pdf');
                    
        //Configure browser to optimize pdf and make sure the h1-finalized class is in the DOM (it's added to classlist when h1 is finished resizing)
        await page.setViewport({width: 816, height: 1056})
        console.log('viewport set')
        await page.waitForSelector('.h1-finalized')
        await page.waitForSelector('.p-finalized')
        console.log('h1 finalized')

        //Puppeteer API creates the screenshot. When received, send back to the front end
        await page.screenshot({ path: path.join(__dirname + `/../images/${resumeData.resumeThumbnail}.png`) })
        
        uploadFile(path.join(__dirname + `/../images/${resumeData.resumeThumbnail}.png`), resumeData.resumeThumbnail)

        // //Puppeteer API creates the pdf. When received, send back to the front end
        const pdf = await page.pdf({ format: 'letter', pageRanges: '1' })
        .then(pdf => {
            res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
            res.send(pdf)
        })
        .catch(err => {
            res.send(err)
        })
        
        fs.unlinkSync(__dirname + `/../images/${resumeData.resumeThumbnail}.png`)

        await browser.close()

    } catch(err) {
        console.log(err)
        res.status(400).send(err)
    }    
});

router.post('/save', async (req, res) => {

    const resumeData = req.body;

    if (!resumeData.resumeTitle) {
        resumeData.resumeTitle = 'Untitled'
    }

    const { userId } = req.session;
    console.log(userId)

    if (!userId) return res.status(400).json('user not authenticated')

    const date = Date.now();

    //SEND DATA TO MONGODB

    const newResume = new Resume({
        data: resumeData,
        user: userId,
        thumbnail: `${userId}-${date}`
    })

    try{
        const savedResume = await newResume.save()
        savedResume.data.resumeId = savedResume._id;
        savedResume.data.resumeThumbnail = savedResume.thumbnail;
        console.log('saving resume')
        res.json(savedResume)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    } 

})


module.exports = router;