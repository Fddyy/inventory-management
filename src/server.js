const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const app = express();
const client = redis.createClient();

// middleware
app.use(session({
    store: new RedisStore({ client }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views',path.resolve('src/views'));

// Routes
const homeRoute = require('./routes/indexRoute');
const loginRoute = require('./routes/loginRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const barangRoute = require('./routes/barangRoute');
const tambahBrgRoute = require('./routes/tambahBarang');
const editBarangRoute = require('./routes/editBarangRoute');
const transaksiRoute = require('./routes/transaksiRoute');
const logoutRoute = require('./routes/logoutRouter');

app.use('/',homeRoute);
app.use('/',loginRoute);
app.use('/',dashboardRoute);
app.use('/',barangRoute);
app.use('/',tambahBrgRoute);
app.use('/',editBarangRoute);
app.use('/',transaksiRoute)
app.use('/',logoutRoute);

app.listen(process.env.PORT, () => {
    console.log('Server Berjalan!!')
})