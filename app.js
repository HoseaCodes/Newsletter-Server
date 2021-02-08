const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");

require('dotenv').config()

const app = express();
const port = 3000;

//View static files css,js, images, etc. from server
app.use(express.static("public"))
//Parse through html body
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)

    const url = `https://us7.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}`
    const options = {
        method: "POST",
        auth: `hoseacodes:${process.env.MAILCHIMP_APIKEY}`
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/successful.html");
        } else {
            res.sendFile(__dirname + "/failed.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end()
})

app.post("/failure", function (req, res) {
    res.redirect("/")
})

app.listen(process.env.PORT || port, function () {
    console.log(`Server is running on port ${port}`)
})

