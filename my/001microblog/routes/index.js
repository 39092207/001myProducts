var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/user/:username',function(req,res,next){
  //res.send('all methods captured');
  next();
});
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/user/:username', function(req, res) {
//  res.render('index', { title:req.params.username });
  //res.send('our username is :'+req.params.username);
  res.render('index',{
    title:title,
    layout:'qianduan'
});
});
router.get('/hello',function(req,res){
  //res.send('The time is '+setInterval(new Date().toString(),1000));
  res.send('The time is '+new Date().toString());
});
module.exports = router;
