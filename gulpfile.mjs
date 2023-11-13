import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import gcmq from 'gulp-group-css-media-queries';
import size from 'gulp-size';
import pug from 'gulp-pug';
import concat from 'gulp-concat';
import minify from 'gulp-minify';
import gulpClean from 'gulp-clean';
import copy from 'gulp-copy';
//import rename from "gulp-rename";

const sassToCSS = () => {
    return src('./src/scss/*.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(size({ title: 'Before: ' }))
        .pipe(csso())
        .pipe(gcmq())
        .pipe(size({ title: 'After: ' }))
        .pipe(dest('./public/css/'));
}

const minifyJS = () => {
    return src('./src/js/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            noSource: false,
            ignoreFiles: ['*.min.js']
        }))
        .pipe(dest('./public/js'))
}

const compilePug = () => {
    return src('./src/html/*.pug')
        .pipe(pug({ pretty: '\t', cache: false }))
        .pipe(dest('./public'));
}

const watcher = () => {
    watch(['./src/scss/*.scss'], sassToCSS);
    watch(['./src/js/*.js'], minifyJS);
    watch(['./src/html/*.pug'], compilePug);
}

const clone = series(
    () => {
        return src('./src/fonts/*')
            .pipe(dest('./public/fonts'))

    },
    () => {
        return src('./src/images/*')
            .pipe(dest('./public/images'))
    }
)

const cleanPublic = () => {
    return src(['./public/'], { read: false, "allowEmpty": true })
        .pipe(gulpClean())
        .pipe(dest('./public'))
}

const build = series(minifyJS, compilePug, sassToCSS, clone);

export {
    sassToCSS as sass,
    minifyJS as minify,
    compilePug as pug,
    watcher,
    build,
    cleanPublic as clean
}