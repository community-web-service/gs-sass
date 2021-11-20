"use strict";

// @future Simplify this. 
// @future Include comments that explains what each of these does.
// @future Consider using glob-intersection to simplify patterns.
// @future Consider converting this to XML.
module.exports = [{
		// @future Couldn't this including files it shouldn't include?
		name: "sassFiles",
		globSet: [
			"./src/www/sass/*.css",
			"./src/www/sass/*.scss",
			"./src/www/sass/*.sass",
			"./src/www/sass/**/*.css",
			"./src/www/sass/**/*.scss",
			"./src/www/sass/**/*.sass",
			"./src/www/lib/**/*.css",
			"./src/www/lib/**/*.scss",
			"./src/www/lib/**/*.sass",
		]
	}, {
		name: "sassDirectories",
		globSet: [
			"./node_modules/",
			"./src/www/sass/",
			"./src/www/sass/partials/",
			"./src/www/lib/",
		]
	},
	{
		name: "sassEntries",
		globSet: ["./src/www/sass/bundle.scss"]
	},
];
