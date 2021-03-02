//Dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Constants
const app = express();
const port = 3000;

require('dotenv').config()


//Mounting Routes
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

//View static files css,js, images, etc. from server
app.use(express.static("public"))
//Parse through html body
app.use(bodyParser.urlencoded({ extended: true }));
//Declared Routes
app.use('/', indexRouter);



app.listen(process.env.PORT || port, function () {
    console.log(`Server is running on port ${port}`)
})

