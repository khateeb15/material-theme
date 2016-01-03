//
//  Jelly Frontend Framework
//  Developed with love by Mattia Astorino and some awesome peoples
//
//  Licensed under the MIT License
//  https://www.apache.org/licenses/LICENSE-2.0
//  ____________________________________________________________________________

// Compiler settings
// #############################################################################

// Compiler settings
var srcPath         = './src';
var notifyLogo      = './icon.png';


// Modules loader
var gulp        = require( 'gulp'),
    path        = require( 'path' ),
    duration    = require('gulp-duration'),
    gutil       = require('gulp-util'),
    clean       = require('gulp-clean'),
    runSequence = require( 'run-sequence' ),
    concat_json = require("gulp-concat-json"),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat-json2js'),
    wrap        = require('gulp-wrap'),
    notify      = require( 'gulp-notify' );


// Theme builder
// #############################################################################




gulp.task('themeBuilder', function () {
  gulp.src('./src/**.json')
 .pipe(concat())
 .pipe(wrap('[\r\n <%= contents %> \r\n]'))
 .pipe( rename({ extname: ".sublime-theme" }) )
 .pipe(gulp.dest('./'))
 .pipe( notify({
    title: "Material Theme compiled",
    message: "Material Theme compiled",
    icon: path.join( __dirname, notifyLogo )
  }))
})



// cleaner
gulp.task( 'build-clean', function () {
    return gulp.src( './test.txt', {read: false} )
    .pipe( clean( ) );
});


// Base watcher task
// #############################################################################

gulp.task( 'watch', function() {
    gulp.watch( srcPath + '/**/*.json', [ 'builder' ] );
});


// Registered tasks
// #############################################################################

/*gulp.task( 'default', [ 'clean', 'themeBuilder', 'watch' ] );*/
gulp.task( 'default', function( callback ) {
  runSequence( 'build-clean', 'themeBuilder', 'watch', callback );
});

gulp.task( 'builder', function( callback ) {
  runSequence( 'build-clean', 'themeBuilder', callback );
});
