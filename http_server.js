var http = require('http');

var gpio = require("tinker-gpio");

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello ' + req.connection.remoteAddress + '!');
  // Client address in request -----^
});

server.on('connection', function(sock) {
  console.log('Client connected from ' + sock.remoteAddress);
  // Client address at time of connection ----^
});
server.listen(3000);


console.log('the server is ready to serve, running on port 3000');

	//gpio.read(16, function(err, value) {
	//	if(err) throw err;
	//	console.log(value);	// The current state of the pin 
	//});


// catch ctrl+c event and exit normally

process.on('SIGINT', function () {
	//gpio.destroy();
	console.log('Did pin cleanup on exit');
	process.exit(2);
});