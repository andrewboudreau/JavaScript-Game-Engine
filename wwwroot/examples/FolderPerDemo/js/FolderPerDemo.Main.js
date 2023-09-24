/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals requirejs, require, console, Class */
requirejs.config({
	baseUrl: "",
	paths: {
		"engine": "../../engine"
    }
});

// Start the main app logic.
requirejs(["js/Bar"], function (Bar) {
	"use strict";
	var bar = new Bar("andrew");
	bar.say("Mr. Boudreau");
	
});


