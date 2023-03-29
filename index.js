// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.route('/api/:date?').get((req, res) => {

    //Get the user input
    const input = req.params.date;
    // console.log(input);

    //Check whether user gave any input. If not, return current date.
    if (input === undefined) {
        const utc = new Date().toUTCString();
        const unix = Date.parse(utc);
        res.json({"unix": unix, "utc": utc});
    }

    //Parse the input into a Date object
    let parsedDate = '';

    //Detect a unix timestamp

    //Count the number of decimal points in the input
    const numDecimals = input.match(/\./g);
    const numAddOperator = input.match(/\+/g);
    const numSubOperator = input.match(/-/g);
    const regex = /[^0-9\+-\.]/g;
    const condition1 = (numDecimals === null ? true : numDecimals.length === 1 ? true : false);
    const condition2 = (numAddOperator === null ? true : (numAddOperator.length === 1 && input[0] === '+') ? true : false);
    const condition3 = (numSubOperator === null ? true : (numSubOperator.length === 1 && input[0] === '-') ? true : false);

    if (condition1 && condition2 && condition3 && !regex.test(input)) {
        parsedDate = new Date(parseInt(input));
    } else {
        parsedDate = new Date(input);
    }

    //Catch the invalid date
    if (parsedDate.toString() === "Invalid Date") {
        res.json({"error": "Invalid Date"});
    }

    //Serve JSON with correct unix timestamp and utc date.
    const utcDate = parsedDate.toUTCString();
    const unixTime = Date.parse(utcDate);
    res.json({"unix": unixTime, "utc": utcDate});
});
