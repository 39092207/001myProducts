/**
 * Created by hui.m on 2014/8/16.
 */
var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
    if(req.url=='/'){
        fs.readFile('./002_titles.json',function(err,data){
            if(err){
                console.log(err);
                res.end('json file read error!');
            }else{
                var titles = JSON.parse(data.toString());
                console.log(titles)
                fs.readFile('./001_template.html',function(err,data){
                    if(err){
                        console.log(err);
                        res.end('html file read error!');
                    }else{
                        var tmpl = data.toString();
                        var html = tmpl.replace('%',titles.join('</li><li>'));

                        res.writeHead(200,{'Content-type':'text/html'})
                        res.end(html);
                    }
                })
            }
        })
    }
}).listen(3000,"127.0.0.1");