//import express to setup express app.
const express = require('express');

//import dotenv to setup environment variables.
const dotenv = require('dotenv');
//use the environment variable during app setup.
dotenv.config();

//invoke express and assign it to app variable
const app = express();
//use the PORT from .env if not use 3000 as default port and assign it to port variable.
const port = process.env.PORT || 3000;

//using get method to send Hello World as response when '/',route is requested.'/' is also known as endpoint or root url.
app.get('/', (req, res) => {
    res.send("Hello world");
});

//express app is awaiting request at http://localhost:3000 port
app.listen(port,() => {
    console.log(`App listening at http://localhost:${port}`);
})