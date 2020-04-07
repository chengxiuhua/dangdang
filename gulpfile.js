const gulp = require('gulp');
const html = require('gulp-minify-html');
const css = require('gulp-minify-css');
const js = require('gulp-uglify');
const babel = require('gulp-babel');
const babel_core = require('babel-core');
const preset = require('babel-preset-es2015');

//监听
const watch = require('gulp-watch');

//编译sass
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');//引入生成map文件的包
const plugins = require('gulp-load-plugins')();//返回的是一个函数体。需要再次执行。

//压缩图片
const imagemin = require('gulp-imagemin');

/* ******************************************************************************** */

//1.复制文件
gulp.task('copysrc',()=>{
    return gulp.src('src/html/*.html')
                .pipe(gulp.dest('dist/html/'));
})
//已将所有的html文件复制到线上dist文件夹中

//2.html文件压缩
gulp.task('uglifyhtml',()=>{
    return gulp.src('src/html/*.html')
                .pipe(html())
                .pipe(gulp.dest('dist/html/'));
})

//3.压缩css文件
gulp.task('uglifycss',()=>{
    return gulp.src('src/css/*.css')
                .pipe(css())
                .pipe(gulp.dest('dist/css/'));
})

//4.压缩js文件
gulp.task('uglifyjs',()=>{
    return gulp.src('src/script/*.js')
                .pipe(js())
                .pipe(gulp.dest('dist/script/'));
})

//5.ES6转ES5
gulp.task('transformjs',()=>{
    return gulp.src('src/script/*.js')
                .pipe(babel(
                    {
                        presets:['es2015']
                    }
                ))
                .pipe(js())
                .pipe(gulp.dest('dist/script/'));
})

//6.监听
gulp.task('default',()=>{
    watch(['src/html/*.html','src/css/*.css','src/script/*.js','src/sass/*.scss'],gulp.parallel('uglifyhtml', 'uglifycss', 'transformjs','conpilesass'))
})

//7.编译sass
gulp.task('compilesass', () => {
    return gulp.src('src/sass/*.scss')
        //初始化gulp-sourcemaps插件
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        }))
        //通过sourcemaps,生成.map文件
        .pipe(plugins.sourcemaps.write('.'))
   
        .pipe(gulp.dest('dist/sass/'));
});
//找不到gulp-sass，卸载重装gulp-sass解决

//8.压缩图片
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(imagemin())//执行压缩
        .pipe(gulp.dest('dist/img/'));
});

