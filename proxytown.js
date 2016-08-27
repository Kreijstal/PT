//Shared with love by bootsy.
var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs'),
    path = require('path');

var proxy = httpProxy.createProxyServer({
  target: {
    host: 'https://pony.town/',
    port: 443
  }
});

var server = http.createServer(function(req, res) {
  console.log(req.url)
  if (req.url === "/script.js") {
    fs.createReadStream(path.join(__dirname, 'script.js')).pipe(res)
  } else if (["/"].indexOf(req.url) > -1) {
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
  } else {
    proxy.web(req, res);
  }
});

server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

console.log("listening on port 8000")
server.listen(8000);
