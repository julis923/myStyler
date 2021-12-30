const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy(err => {
        res.clearCookie('sid')
        res.json({auth: false, user: {name: null, email: null}})
    })
})

module.exports = router;