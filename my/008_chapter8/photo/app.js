
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , photos = require('./routes/photos');

var app = express();
console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV||'development');
console.log(process.env.NODE_ENV||'production');
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('photos',__dirname + '/public/photos');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
    app.set('photos','mounted-volume/photos');
});

app.get('/', photos.photolist);
app.get('/users', user.list);
app.get('/upload',photos.form);
debugger;
app.get("/photo/:name/:id/download",photos.download(app.get('photos')));
app.post('/upload', photos.submit(app.get('photos')));

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


