var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var list = require('./mock/list.json');

var url = require('url');
var fs = require('fs');
var path = require('path');

gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            //拦截
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname)
                    //接口
                if (pathname === '/api/list') {
                    var type = url.parse(req.url, true).query.type;
                    var arr = list.filter(function(item) {
                        return item.type == type
                    });
                    res.end(JSON.stringify({ code: 1, data: arr }))

                } else if (pathname === '/api/type') {
                    var typeArr = [];
                    list.forEach(function(item) {
                        typeArr.push(item.type)
                    })
                    res.end(JSON.stringify({ code: 1, data: typeArr }))

                } else if (pathname === '/api/detail') {
                    var type = url.parse(req.url, true).query.type;
                    var id = url.parse(req.url, true).query.id;

                    var arr = list.filter(function(item) {
                        return item.type == type
                    })
                    console.log(arr)
                    var target = arr[0].list.filter(function(item) {
                        return item.id == id
                    })
                    console.log(target)
                    res.end(JSON.stringify({ code: 1, data: target[0] }))
                } else { //文件
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }

        }))
})

gulp.task('default', gulp.series('scss', 'server', 'watch'))