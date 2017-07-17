/**
 * Created by LittleGpNator on 12/07/2017.
 */
const express = require('express');
var app = require('express')(),
    http = require('http').Server(app),
    fs = require('fs'),
    gpio = require("tinker-gpio");

var lastState="off";
var bodyParser = require('body-parser');

var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : false}));

http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('pinHasBeenSet', function(msg){
        io.emit('pinHasBeenSetTo', msg);
    });
});

app.post('/', function(req, res) {
    setPin();
    res.type('text/plain');
    res.send(""+lastState);
    res.end();
    // sending a response does not pause the function
});

app.get('/getState',function (req, res) {
    res.type('text/plain');
    res.send(""+lastState);
    res.end();
});

function setPin() {
    var tempState;
    if (lastState === "off"){
        setPinTo(1);
        tempState="on";
    }else {
        setPinTo(0);
        tempState="off";
    }
    lastState=tempState;
}

function setPinTo(state) {
    console.log("Pin sett to "+state);
    //only workes if you have gpio-pins on a Asus tinkerboard
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
