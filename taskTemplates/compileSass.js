"use strict";

module.exports = function compileSass(globSetGetter, options) {
	var gulp = require("gulp");
	var gulpSass = require("gulp-sass");
	var nodeSass = require('node-sass');
	var rename = require("gulp-rename");
	var autoprefixer = require("gulp-autoprefixer");
	var sourcemaps = require("gulp-sourcemaps");
	var log = require("fancy-log");
	var multiDest = require("gulp-multi-dest");
	var concatCss = require('gulp-concat-css');

	var sass = gulpSass(nodeSass);
	
	var globOptions = options.globOptions;
	
	var sassEntries = options.sassEntries;
	var sassDirectories = options.sassDirectories;
	var destDirectories = options.destDirectories;
	
	var taskFunction = function () {
		
		var sassEntriesGlobSet = globSetGetter.getGlobSet(sassEntries);
		var sassDirectoriesGlobSet = globSetGetter.getGlobSet(sassDirectories);
		var destDirectoriesGlobSet = globSetGetter.getGlobSet(destDirectories);
		
		return gulp.src(sassEntriesGlobSet, globOptions)
			.pipe(sourcemaps.init({
				loadMaps: true
			}))
			.pipe(sass({
				includePaths: sassDirectoriesGlobSet,
				// @future Don't hard-code settings.
				errLogToConsole: true
			}))
			.on("error", log)
			// @future Don't use inline functions in pipes.
			.pipe(rename(function(path){path.dirname = "/css/"}))
			// @future Don't hard-code settings.
			.pipe(autoprefixer({
				cascade: false,
				remove: false
			}))
			.pipe(concatCss(
			"css/bundle.css",
			{
				rebaseUrls: false,
				includePaths: sassDirectoriesGlobSet,
			}
			))
			.pipe(sourcemaps.write("./"))
			.pipe(multiDest(destDirectoriesGlobSet));
	};
	
	return taskFunction;
};
