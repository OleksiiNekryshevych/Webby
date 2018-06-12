var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	less		= require('gulp-less'),
    concatCSS   = require('gulp-concat-css'),
    autoprefixer= require('gulp-autoprefixer'),
    cleanCSS    = require('gulp-clean-css'),
    clean       = require('gulp-clean'),
    notify      = require('gulp-notify'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'), //не использовал
	path		= require('path'); //for less

// local server 
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

//less  (less в css)
gulp.task('less', function(){
	return gulp.src('app/less/*.less')
		.pipe(plumber())
		.pipe(less({
      	paths: [path.join(__dirname, 'less', 'includes')]
    	}))
    	.pipe(gulp.dest('./app/css/'))
    	.pipe(browserSync.stream());
});

// удаление файла "style.min.css" перед минификацией
gulp.task('cleanCssMin', function(){
	return gulp.src('app/css/style.min.css')
		.pipe(clean());
});

//css (минификация файлов css)
gulp.task('css', ['cleanCssMin', 'less'], function(){
    return gulp.src('app/css/*.css')
	    .pipe(plumber())
	    .pipe(autoprefixer({
	        browsers: ['last 2 versions']
	    })) 
	    .pipe(concatCSS('style.min.css')) 
	    .pipe(cleanCSS())
	    .pipe(gulp.dest('app/css'))
	    .pipe(browserSync.stream())
	    .pipe(notify('Css done'));
});

// watch (отслеживаем изменения файлов)  
gulp.task('watch', ['css', 'server'], function() {
    gulp.watch('app/less/**/*.less', ['less'])
    gulp.watch('app/css/**/*.css', ['css']) 
    gulp.watch('app/js/**/*.js', browserSync.reload)
    gulp.watch('app/**/*.html', browserSync.reload);
});

// альтернатиный запуск по-умолчанию.
gulp.task('default', ['watch']);

// clean (удаление файлов в директории "dist" перед сборкой)
gulp.task('cleanDist', function(){
    return gulp.src('dist/**/*.*', {read: false})
        .pipe(clean());
});

// build  (сборка всего проэкта в директорию "dist")    
gulp.task('build', ['cleanDist', 'less', 'css'], function(){
    var  buildCSS = gulp.src('app/css/style.min.css')
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJS = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));

    var buildHtnl = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))

    var buildImg = gulp.src('app/img/*.*')
    .pipe(gulp.dest('dist/img'))

    .pipe(notify('Builded'));
});