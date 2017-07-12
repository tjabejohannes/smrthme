var gpio = require("tinker-gpio");
var lastState;

function setPin(state) {
    console.log(state);
    //if (state === 1 || state === 0) {
    //    gpio.open(7, "output", function (err) {		// Open pin 7 for output
    //        gpio.write(7, state, function () {		// Set pin 7 to ether heigh or low
    //            gpio.close(7);				        // Close pin 7
    //        });
    //    })
    //} else {
    //    console.log("Unhallowed state parameter");
    //}
    lastState = state;
}

function pinExit() {
    gpio.open(7, "output", function (err) {
        gpio.write(7, 0, function () {
            gpio.close(7);
        });
    })
}