var gpio = require("tinker-gpio");

//var times = 30;
//var i = 0;
//while (i<times) {


//On
gpio.open(7, "output", function(err) {		// Open pin 7 for output 
    gpio.write(7, 1, function() {		// Set pin 7 high (1) 
        gpio.close(7);				// Close pin 7 
    });
});


//Off
//gpio.open(7, "output", function(err) {	// Open pin 7 for output 
//    gpio.write(7, 0, function() {		// Set pin 7 low (0) 
//        gpio.close(7);			// Close pin 7 
//    });
//});

//i++;
//}

