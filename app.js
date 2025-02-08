require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const { isActiveRoute } = require('./server/helpers/routeHelpers');
const app = express();

let PORT = 8000;

const connectDB = require('./server/config/db');

connectDB();
app.locals.isActiveRoute = isActiveRoute; 

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});