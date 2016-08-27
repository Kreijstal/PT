//Shared with love by bootsy.
var https = require('https'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require('fs'),
    path = require('path'),
    jsdom = require('jsdom');

var proxy = httpProxy.createProxyServer({
    target: 'https://pony.town',
    agent: https.globalAgent,
    headers: {
        host: 'pony.town'
    }
});

var server = http.createServer(function(req, res) {
    console.log(req.url)
    if (req.url === "/script.js") {
        fs.createReadStream(path.join(__dirname, 'script.js')).pipe(res)
    } else if (["/"].indexOf(req.url) > -1) {
        console.log("is this even executed")
        console.log(req.headers.cookie)
        console.log('hm')
        jsdom.env({
            url: "https://pony.town",
            cookie: req.headers.cookie,
            headers: {
                cookie: req.headers.cookie
            },
            done: function(err, window) {
                var document = window.document;
                Array.prototype.map.call(document.getElementsByTagName('script'), function(a) {
                    return a
                }).forEach(function(a) {
                    a.parentNode.removeChild(a)
                });
                document.body.innerHTML += "<script src=\"/js/libraries.js\"></script>    <script src=\"/js/modules.js\"></script>    <script src=\"/js/bootstrap.js\"></script>";
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(jsdom.serializeDocument(document));
                res.end();

            }
        });

    } else if (["/js/libraries.js"].indexOf(req.url) > -1) {
        fs.createReadStream(path.join(__dirname, 'libraries.js')).pipe(res)
    } else if (["/js/modules.js"].indexOf(req.url) > -1) {
        fs.createReadStream(path.join(__dirname, 'modules.js')).pipe(res)
    } else if (["/js/bootstrap.js"].indexOf(req.url) > -1) {
        fs.createReadStream(path.join(__dirname, 'bootstrap.js')).pipe(res)
    } else {
        proxy.web(req, res);
    }
});

server.on('upgrade', function(req, socket, head) {
    proxy.ws(req, socket, head);
});

var port = process.env.PORT || 8000
console.log("listening on port " + port)
server.listen(port);
//hfre:kKk-3yvgr-C0alG0ja-Unk0E-kKK
//cnff:vorglbhpnagthrffguvfz8riravslbhgel