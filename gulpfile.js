const gulp = require('gulp')
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const path = {
    "src": "/src/js/**.js"
}

gulp.task('babel', ()=>{
    gulp.src('src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public/js/'))
});