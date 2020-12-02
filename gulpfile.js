const { src, dest, parallel, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Browser Sync
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("*.html").on('change', browserSync.reload);
}

// Sass (scss -> css)
function sass(){
    return src('./sass/style.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());
}

// Watch Sass
function watcher(){
    watch('./sass/*.scss', sass);
    watch('./sass/*/*.scss', sass);
}

// Src + Dest
function srcExemple() {
    return src('./img/*.png')
        //return src('./index.html')
        .pipe(dest('./img-v2'));
}



// Export des function()
module.exports = {
    srcExemple,
    sass,
    watcher,
    browser: parallel(browser, watcher)
}