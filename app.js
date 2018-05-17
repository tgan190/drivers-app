const express = require('express');
const routes = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// string_a.localeCompare(string_b);

mongoose.Promise = global.Promise;
// if (process.env.NODE_ENV != 'test') {

const env_A = process.env.NODE_ENV.trim();

if (env_A === "test") {
    console.log('confirmed TEST environment');
} else {
    mongoose.connect('mongodb://localhost/muber');
    console.log('connecting to prod/dev db');
}

// mongoose.connection
// .once('open', () => {
    
// })
// .on('error', err => {
//         console.warn('Warning', err);
// })

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
    console.log(err);
    console.log('err.message: ',err.message);
    res.send({error: 'err.message'});

});

module.exports = app;