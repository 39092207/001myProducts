/**
 * Created by root on 8/27/14.
 */
var connect = require('connect');
/*
 1. 测试directory()中间件
*/
var app = connect()
        .use(connect.directory('public'))
        .use(connect.static('public'));
/*
 2. 目录导航directory
 */
var app = connect()
    .use('/files',connect.directory('public',{icons: true,hidden: true}))
    .use('/files',connect.static('public',{hidden: true}));

app.listen(3000);
