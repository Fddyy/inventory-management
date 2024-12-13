const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const MySQLStore = require('express-mysql-session')(session);
const connection = require('./config/db')
const cors = require('cors')

const app = express();
const sessionStore = new MySQLStore({}, connection);
const corsOptions = {
    origin: 'https://inventory-management-delta-pink.vercel.app/',
    credentials: true,
  };

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views',path.resolve('src/views'));
app.use(cors(corsOptions))

app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
    }
}));

app.use((req, res, next) => {
    console.log('Cookies diterima:', req.cookies); // Pastikan connect.sid ada
    console.log('Session di server:', req.session); // Pastikan session terisi
    next();
});

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