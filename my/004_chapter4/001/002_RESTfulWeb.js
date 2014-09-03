/*
POST:像代办事项中添加代办
GET:显示当前事项列表，或者显示某一项的详情
DELETE:从代办事项清单中移除事项
PUT:修改已有事项
 */
var http = require('http');
var url= require('url');
var color = require('colors');
var items = [];

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf-8');
            req.on('data',function(chunck){
                item +=chunck;
            });
            req.on('end',function(){
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
//            items.forEach(function(item,i){
//                res.write(i + ') ' + item +'\n');
//            });
            var body = items.map(function(item ,i){
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-Length',Buffer.byteLength(body));
            res.setHeader('Content-type','text/plain');
            res.end(body);
            break;
        case 'DELETE':
            var path = url.parse(res.url).pathname;
            var i = parseInt(path.slice(1),10);
            if(isNaN(i)){
                res.statusCode = 400;
                res.end('Invalid item id');
            }else if(!item[i]){
                res.statusCode = 404;
                res.end('Item not found');
            }else{
                items.splice(i,1);
                res.end('OK\n');
            }
            break;
        case 'PUT':
            var param = url.parse(res.url,true).query.item;
            var i = parseInt(path.slice(1),10);
            if(isNaN(i)){
                res.statusCode = 400;
                res.end('Invalid item id');
            }else if(!item[i]){
                res.statusCode = 404;
                res.end('Item not found');
            }else{
                items[i]=param;
                res.end('OK\n');
            }
            break;
        default:
            res.end('bad request');
            break;
    }
});

server.listen(3000, function () {
    console.log('开始运行服务器！哈哈哈哈哈哈哈哈哈'.rainbow);
});