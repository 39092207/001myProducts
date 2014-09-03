/**
 * Created by root on 8/27/14.
 */
var photos = [];
var Photo = require('../model/Photo');
var path = require('path');
var fs = require('fs');
var express = require('express');
var join = path.join;
photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/logos/js-black.svg'
});

exports.photolist = function (req, res, next) {
    Photo.find({}, function (err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });

};

exports.form = function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};

exports.submit = function (dir) {
    return function (req, res, next) {
        var img = req.files.photo.image;
        var name = req.files.photo.name || img.name;//不懂？？？？？？
        var path = join(dir, img.name);

        fs.rename(img.path, path, function (err) {
            if (err)return next(err);

            Photo.create({
                name: name,
                path: img.name
            }, function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        })
    }
};
exports.download = function (dir) {
    debugger;
    return function (req, res, next) {
        var id = req.params.id;
        console.log("********************************");
        console.dir(req.params);
        Photo.findById(id,function(err,photo){
           if(err)return next(err);
           var path = join(dir,photo.path);
//            res.sendfile(path);
            res.download(path,photo.name);
        });
    }
};
