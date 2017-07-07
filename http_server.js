var http = require('http');
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


console.log('the server is running on port 3000');