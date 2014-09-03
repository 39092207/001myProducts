/**
 * Created by root on 8/17/14.
 */
var EventEmitter = require('events').EventEmitter;

var channel = new EventEmitter();
channel.on('join',function(){
    console.log('Welcom!')
});

channel.emit('join');