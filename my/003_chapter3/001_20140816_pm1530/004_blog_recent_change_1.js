/**
 * Created by hui.m on 2014/8/16.
 */
var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
    getTitle(res);
}).listen(3000,"127.0.0.1");

function getTitle(res){
    if(req.url=='/'){
        fs.readFile('./002_titles.json',function(err,data){
            if(err){
                hadError(err,res);
            }else{
                getTemplate(Json.parse(data.toString()),res);
            }
        });
    }
}

function hadError(err,res){
    console.log(err);
    res.end('server error!');
}

function getTemplate(titles,res){
    fs.readFile('./001_template.html',function(err,data){
        if(err){
            hadError(err,res);
        }else{
            formatHtml(titles,data.toString(),res);
        }
    })
}

function formatHtml(titles,tmpl,res){
    var html = tmpl.replace('%',titles.join('</li><li>'));

    res.writeHead(200,{'Content-type':'text/html'})
    res.end(html);
}