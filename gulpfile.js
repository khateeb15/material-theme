//
//  Jelly Frontend Framework
//  Developed with love by Mattia Astorino and some awesome peoples
//
//  Licensed under the MIT License
//  https://www.apache.org/licenses/LICENSE-2.0
//  ____________________________________________________________________________

// Compiler settings
// #############################################################################

// Paths settings
var distPath        = './www'; // Your "distribution" folder
var cssPath         = '/css';   // Must be inside distPath
var serverPath      = './www'; // Local server root folder

// Compiler settings
var minifyCSS       = true;
var srcPath         = './src';
var notifyLogo      = './pp.png';
var defaultCSS      = false;

// Browser support for browser-sync
var browser_support = [ 'last 2 versions' ];

// Modules loader
var gulp         = require( 'gulp'),
    browserSync  = require( 'browser-sync'),
    path         = require( 'path' ),
    duration     = require('gulp-duration'),
    notify       = require( 'gulp-notify' );


// LESS Task Compiler
// #############################################################################

// Minify setting override
if ( minifyCSS == true ) { var defaultCSS = false; }
else if ( minifyCSS == false ) { var defaultCSS = true; }

// Compiler
gulp.task('themeBuilder', function() {
    return gulp.src( srcPath + '/main.scss' )

    .pipe( newer( distPath + cssPath ) )

    // Init sassGlob plugin
    .pipe( sassGlob() )

    // Running sass compiler
    .pipe( sass().on('error', sass.logError) )

    // Running autoprefixer and write original file
    .pipe( autoprefixer({ browsers: browser_support }) )
    .pipe( gulpif( defaultCSS, gulp.dest( distPath + cssPath ) ) )

    // Minifing and write min files
    .pipe( gulpif( minifyCSS, rename( {suffix: '.min'} ) ) )
    .pipe( gulpif( minifyCSS, minifycss() ) )
    .pipe( duration('rebuilding files') )
    .pipe( gulp.dest( distPath + cssPath ) )

    // Show notification
    .pipe( notify( {
        title: "ProntoPro Design Test",
        message: "CSS compilato con successo",
        icon: path.join( __dirname, notifyLogo )
    } ) )
});



// Base watcher task
// #############################################################################

gulp.task( 'watch', function() {
    gulp.watch( srcPath + '/**/*.scss', [ 'themeBuilder' ] );
});


// Registered tasks
// #############################################################################

gulp.task( 'default', [ 'themeBuilder', 'watch' ] );
gulp.task( 'build', function( callback ) {
    runSequence( 'clean', 'builder', callback );
});
