const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.get("/", function (req, res) {
    res.send("Hello Dom, how can I assist you today?")
})

app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
})