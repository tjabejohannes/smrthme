/**
 * Created by LittleGpNator on 12/07/2017.
 */
const express = require('express');
const app = express();
var http = require('http'),
    fs = require('fs'),
    gpio = require("tinker-gpio");

var lastState=0;
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


app.use(bodyParser.urlencoded({extended : false}));

app.post('/', function(req, res) {
    //console.log(JSON.stringify(req.body));
    //res.sendStatus(200);

    res.type('text/plain');
    res.send("Pin set to "+lastState);
    res.end();
    // sending a response does not pause the function
    set();
});

function set() {
    var tempState;
    if (lastState === 0){
        setPinTo(1);
        tempState=1;
    }else {
        setPinTo(0);
        tempState=0;
    }
    lastState=tempState;
}

function setPinTo(state) {
    console.log("Pin sett to "+state);
    /*if (state === 1 || state === 0) {
        gpio.open(7, "output", function (err) {		// Open pin 7 for output
            gpio.write(7, state, function () {		// Set pin 7 to ether heigh or low
                gpio.close(7);				        // Close pin 7
            });
        })
    } else {
        console.log("Unhallowed state parameter");
    }*/
}
