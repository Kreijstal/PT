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
        proxy.web(req, res);
      /*  jsdom.env({
            url: "https://pony.town",
            cookie: req.headers.cookie,
            headers: {
                cookie: req.headers.cookie
            },
            done: function(err, window) {
                var document = window.document;
                var scripts="";
                Array.prototype.map.call(document.getElementsByTagName('script'), function(a) {
                    return a
                }).forEach(function(a) {
                    scripts+=a.outerHTML
                    a.parentNode.removeChild(a)
                });
                document.body.innerHTML += "<!--"+scripts.replace(/--/g,"-/-")+"--><script src=\"/js/libraries.js\"></script>    <script src=\"/js/modules.js\"></script>    <script src=\"/js/bootstrap.js\"></script>";
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(jsdom.serializeDocument(document));
                res.end();

            }
        });*/

    } else if (["/js/libraries.js"].indexOf(req.url) > -1) {
        fs.createReadStream(path.join(__dirname, 'libraries.js')).pipe(res)
    }else if (["/scripts/bootstrap-48355.js"].indexOf(req.url) > -1) {//there was no other way
		console.log("bootstrap requested");
        res.writeHead(200, {
                    'Content-Type': 'text/javascript'
                });
        res.write("document.write(\"<script src=\\\"\/js\/libraries.js\\\"><\/script>    <script src=\\\"\/js\/modules.js\\\"><\/script>    <script src=\\\"\/js\/bootstrap.js\\\"><\/script>\");");
        res.end();
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
// connect.sid=s%3AKmabPlucxDy1U0okZpBdC0ih9tGIBeZ3.xs5vj1tZ8XKuN5fkZsQbHE8Qgj%2F%2Bfr5sA5iu3wwwy3w
