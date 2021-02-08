const express = require("express");
const router = express.Router();
const https = require("https")

router.get("/", function (req, res) {
    res.render("signup")
})

router.post("/", function (req, res) {
    console.log(req.body)
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
        console.log(response.statusCode)
        console.log(response.statusMessage)
        if (response.statusCode === 200) {
            // res.sendFile(__dirname + "successful.html");
            res.render("successful");
        } else {
            // res.sendFile(__dirname + "failed.html");
            res.render("failed");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end()
})

router.post("/failure", function (req, res) {
    res.redirect("/")
})

module.exports = router;