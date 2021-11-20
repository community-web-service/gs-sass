/**
 * @fileoverview Exports module:GsSass.
 * @copyright Robert Gaines 2020
 * @license Apache-2.0
 * @author Robert Gaines <rob@communitywebservice.com>
 */
 
"use strict";

/**
 * Gulp Swallower plugin for SASS.
 * @module {Function} GsSass
 * @requires module:GulpSwallower
 * @requires module:GsDhtml
 * @implements {module:GulpSwallower.SwallowerPlugin}
 * @param {GulpSwallower} gulpSwallower Gulp Swallower.
 * @param {object} [templateOptions] Default Swallower task template options.
 * @future Lint all all modules
 * @future Beautify all modules
 * @future Consider postcss-import
 * @future Consider postcss-preset-env
 * @future Consider cssnano
 * @future Consider gulp-clean-css
 * @future Consider postcss-sass
 * @future Consider input/output formats (index|main|bundle) -> (index|main|bundle)
 * @future Consider running CSS transformations through a method on gs-dhtml.
 * @future Consistent variable and file names. i.e. globSet instead of globs.
 * @future .gitignore is not always working.
 * @future dotFolders excluded by .gitignore are being copied.
 * @future Consider stream-combiner;
 * @future Consider gulp-wrap
 * @future Consider gulp-declare
 * @future Consider gulp-filter
 * @future Change var names to the following pattern: fileType + "Files" | Directories + Src | Dest
 * @future Convert ES5 classes to ES6 classes.
 */

module.exports = function GsSass(gulpSwallower, templateOptions) {

	var _this = {}; // Private scope.

	_this.gulpSwallower = gulpSwallower;
	_this.templateOptions = typeof templateOptions !== "undefined" ? templateOptions : {};
	_this.namedGlobs = [];

	/**
	 * Run the plugin. Usually called internally by Gulp Swallower.
	 * @method run
	 */

	this.run = function run() {
		_this.loadSettings();
		_this.loadGlobSets();
		_this.addCompileSassToGulp();
		_this.addBuildToGulp();
	};

	/**
	 * Get plugin ID.
	 * @method getId
	 * @returns {string} plugin ID.
	 */

	this.getId = function () {
		return "gs-sass";
	};

	/**
	 * Get plugin requirements.
	 * @method getRequirements
	 * @returns {string} plugin ID.
	 */

	this.getRequirements = function () {
		return ["gs-dhtml"];
	};

	_this.loadSettings = function loadSettings() {
		var defaultTemplateOptions = require("./defaultSettings.js");
		
		// @future Ensure that other gs modules are doing this properly.
		var templateOptions = _this.templateOptions;

		_this.templateOptions = Object.assign(defaultTemplateOptions, templateOptions);

		_this.templateOptions.defaultGlobOptions.base = _this.templateOptions.sassBase;
	}.bind(this);

	_this.loadGlobSets = function loadGlobSets() {
		_this.namedGlobs = require("./namedGlobs.js");

		_this.gulpSwallower.extendNamedGlobSets(_this.namedGlobs);
	}.bind(this);

	_this.addCompileSassToGulp = function addCompileSassToGulp() {
		var taskTemplate = require("./taskTemplates/compileSass.js");
		var taskDefinitions = require("./taskDefinitions/compileSass.js");
		var taskDefinitionOptions = _this.templateOptions;
		
		_this.gulpSwallower.defineTasks(taskTemplate, taskDefinitions, taskDefinitionOptions);
	}.bind(this);

	_this.addBuildToGulp = function addBuildToGulp() {
		_this.gulpSwallower.extendTaskSet("buildParallel", "parallel", "compileSass");
	}.bind(this);

};
