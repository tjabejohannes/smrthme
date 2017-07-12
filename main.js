var http = require('http'),
    fs = require('fs'),
    gpio = require("tinker-gpio");


//server init
var server = http.createServer(function (request, response) {
    console.log(request.url+"");
    fs.readFile('public/' + request.url, function(err, data) {
        if (!err) {
            var dotoffset = request.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                ? 'text/plain'
                : {
                    '.html' : 'text/html',
                    '.ico' : 'image/x-icon',
                    '.jpg' : 'image/jpeg',
                    '.png' : 'image/png',
                    '.gif' : 'image/gif',
                    '.css' : 'text/css',
                    '.js' : 'text/javascript'
                }[ request.url.substr(dotoffset) ];
            response.setHeader('Content-type' , mimetype);
            response.end(data);
            console.log( request.url, mimetype );
        } else {
            console.log ('file not found: ' + request.url);
            response.writeHead(404, "Not Found");
            response.end();
        }
    });
});

//client server comnuication:



server.listen(3000);

console.log('the server is ready to serve, running on port 3000');


process.on('SIGINT', function () {
	//gpio.destroy();
	console.log('Did pin cleanup on exit');
	process.exit(2);
});