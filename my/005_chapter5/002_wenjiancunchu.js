var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join(' ');
var file = path.join(process.cwd(),'/.tasks');

switch (command){
    case 'list':
        listTask(file);
        break;
    case 'add':
        addTask(file,taskDescription);
        break;
    default :
        console.log('Usage: ' + process.argv[0] + ' list|add[taskDescription]');
}

function loadOrInitializeTaskArray(file,callbask) {
    
}


