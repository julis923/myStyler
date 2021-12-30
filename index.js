//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');

require('dotenv').config()


//Routes
const buildRoute = require('./routes/build_route');
const loginRoute = require('./routes/login_route');
const registerRoute = require('./routes/register_route');
const userRoute = require('./routes/user_route')
const logoutRoute = require('./routes/logout_route')
const session = require('express-session');


const IN_PROD = process.env.NODE_ENV === 'production';

const app = express();

//Middleware
//CHECK TO MAKE SURE THIS FLIES 
if (IN_PROD) {
    app.use(cors());
} else {
    console.log('not in production')
    app.use(cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'DELETE'],
        credentials: true
    }))
}


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.set('trust proxy', 1)
app.use(session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.AUTH_SEC,
    cookie: {
        maxAge: 6.048e+8,
        httpOnly: true,
        sameSite: true,
        secure: IN_PROD,
    }
}))

//Middleware Routes
app.use('/login-api', loginRoute);
app.use('/register-api', registerRoute);
app.use('/build', buildRoute);
app.use('/user', userRoute);
app.use('/logout', logoutRoute);

app.use('/public', express.static(path.join(__dirname, 'public')))

//Serve static assets when in production
if (process.env.NODE_ENV === 'production') {
    //Set a static folder
    app.use(express.static('client/build'))

    //Will load index.html unless an api route is being hit
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to db')
})

//Server port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`listening at port ${PORT}`)})