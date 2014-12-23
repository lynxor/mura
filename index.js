var express = require("express"),
    bodyParser = require('body-parser'),
    path = require("path"),
    multer = require('multer'),
    mongojs = require("mongojs"),
    _ = require("underscore"),
    async = require("async"),
    Village = require("./server/village").Village,
    Users = require("./server/users").Users,
    app = express(),
    db = mongojs("mura", ['user', 'village']);



app.set('views', 'views');
app.set('view engine', 'jade');

app.use("/public", express.static('public'));
app.use(bodyParser.json());
app.use(multer());




Village(app, db);
Users(app, db);

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
