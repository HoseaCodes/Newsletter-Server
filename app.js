const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
const { json } = require("body-parser");

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

    const url = `https://us7.api.mailchimp.com/3.0/lists/9ee7c7020a`
    const options = {
        method: "POST",
        auth: "hoseacodes:68ea1d888c36612a8dca1afef2802dea-us7"
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

app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
})

//API Key
//68ea1d888c36612a8dca1afef2802dea-us7

//Unique ID or List ID
//9ee7c7020a

// {
//     "account_id": "string",
//     "login_id": "string",
//     "account_name": "string",
//     "email": "string",
//     "first_name": "string",
//     "last_name": "string",
//     "username": "freddie2000",
//     "avatar_url": "string",
//     "role": "string",
//     "member_since": "2010-01-01T23:59:59+00:00",
//     "pricing_plan_type": "monthly",
//     "first_payment": "2010-01-01T23:59:59+00:00",
//     "account_timezone": "string",
//     "account_industry": "string",
//     "contact": {
//       "company": "string",
//       "addr1": "string",
//       "addr2": "string",
//       "city": "string",
//       "state": "string",
//       "zip": "string",
//       "country": "string"
//     },
//     "pro_enabled": true,
//     "last_login": "2019-08-24T14:15:22Z",
//     "total_subscribers": 0,
//     "industry_stats": {
//       "open_rate": 0,
//       "bounce_rate": 0,
//       "click_rate": 0
//     },
//     "_links": [
//       {
//         "rel": "string",
//         "href": "string",
//         "method": "GET",
//         "targetSchema": "string",
//         "schema": "string"
//       }
//     ]
//   }