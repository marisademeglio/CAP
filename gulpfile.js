const gulp = require('gulp');
var prettyHtml = require('gulp-pretty-html');
const gulpStylelint = require('gulp-stylelint');

gulp.task('pretty-html', done => {
    gulp.src('docs/**/*.html', { base: './' })
        .pipe(prettyHtml({
            preserve_newlines: false
        }))
        .pipe(gulp.dest('./'));
    done();
});


gulp.task('lint-css', done => {
    gulp.src('src/**/*.css', { base: './' })
        .pipe(gulpStylelint({
            reporters: [
                { formatter: 'string', console: true, fix: true }
            ]
        }));
    done();
});
