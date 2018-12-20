var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var data = require('./mock/data.json');

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

                    res.end(JSON.stringify(data))

                } else { //文件
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }

        }))
})

gulp.task('default', gulp.series('scss', 'server', 'watch'))