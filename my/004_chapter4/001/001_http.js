var http = require('http');

var server = http.createServer(function (req,res) {
    var body = 'hello world';
    res.setHeader('Content-Length',body.length);
    res.setHeader('Content-type','text/html')
    res.statusCode = 302;//在第一次调用res.write()和res.end()之前
    res.write(body);
    res.end();//==>res.end('hello world');
});

server.listen(3000);
