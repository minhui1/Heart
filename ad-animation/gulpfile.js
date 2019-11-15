// 获取 gulp
var gulp = require('gulp');
// 获取 minify-css 模块（用于压缩 CSS）
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssimport = require('gulp-cssimport');
var webserver = require('gulp-webserver');

// 压缩 css 文件
// 在命令行使用 gulp css 启动此任务
gulp.task('css', function () {
    // 1. 找到文件
    gulp.src(['css/main.css'])
        // 2. 压缩文件
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('css'))
});

gulp.task('main', function () {
    // 1. 找到文件
    gulp.src(['css/main.css'])
        // 2. 压缩文件
        .pipe(cssimport({}))
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('css'))
});

//合并
gulp.task('concat', function () {
    //- 创建一个名为 concat 的 task                               
    gulp.src(['css/*.css'])
        //- 需要处理的css文件，放到一个字符串数组里,//- 合并后的文件名
        .pipe(concat('main.min.css'))
        //- 压缩处理成一行
        .pipe(minifyCSS())
        //- 输出文件本地
        .pipe(gulp.dest('css'));
});
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 css 任务
    gulp.watch('css/*.css', ['css'])
});
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function () {
    // 1. 找到文件
    gulp.src('js/*.js')
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('js'))
})

// 启动web服务器
gulp.task('webserver', function () {
    gulp.src('./') // 服务器目录（./代表根目录）
        .pipe(webserver({
            port: 8080, //端口
            host: '10.222.138.28', //域名
            liveload: true, //实时刷新代码。不用f5刷新
            open: true,
            directoryListing: {
                path: './',
                enable: true,
            }
        }))
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 css 任务和 auto 任务
gulp.task('default', ['concat', 'script', 'webserver', 'auto'], function () {
    console.log("合并压缩完成！")
})