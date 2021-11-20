"use strict";

module.exports = function compileSass(options) {
	var taskDefinitions = [{
		name: "compileSass",
		options: {
			destDirectories: "destDirectories",
			sassEntries: "sassEntries",
			sassDirectories: "sassDirectories",
			globOptions: options.defaultGlobOptions
		}
	}];

	return taskDefinitions;
};
