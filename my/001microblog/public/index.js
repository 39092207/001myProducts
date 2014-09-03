var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
  res.writeHead(200,{'Content':'image/gif'});
  fs.createReadStream('./images/xiaocat.gif').pipe(res);
}).listen(3000);
console.log('程序启动！');
