/**
 * Created by root on 8/17/14.
 */
var flow = require('nimble');
var exec = require('child_process').exec;

function downloadNodeVersion(version,destination,callback) {
    var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
    var filePath = destination + '/' + version + '.tgz';
    exec('curl ' + url + '>' + filePath,callback);
}

flow.series([
    function(callback){
        flow.parallel([
            function(callback){
                console.log('downloading Node v0.4.6....');
                downloadNodeVersion('0.4.6','/tem',callback);
            }

        ],callback);
    }
]);