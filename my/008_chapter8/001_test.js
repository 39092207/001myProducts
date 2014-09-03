/**
 * Created by root on 8/27/14.
 */
var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('Hello!');
});

app.listen(3000);
