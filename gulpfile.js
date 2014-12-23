var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    factor = require('factor-bundle'),
    fs = require("fs"),
    _ = require("underscore"),
    files = _.filter(fs.readdirSync("public"), function(item){
        return item.match(/.*\.js$/i);
    });

gulp.task('default', ['browserify'], function() {

});
gulp.task('browserify', function(){
    var b = browserify({
        entries: _.map(files, function(item){
            return __dirname + "/public/" +item;
        }),
        debug: true
    });

    b.plugin(factor, {
        // File output order must match entry order
        o: _.map(files, function(item){
            return __dirname + "/public/bundle/" +item;
        })
    });
    b.bundle()
        .pipe(source('common.js'))
        .pipe(gulp.dest('public/bundle/'));

});
