/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require*/
require.config({
	baseUrl: "",
	paths: {
		"engine": "../../engine",
		"actors": "../../engine/actors"
    }
});

// Start the main app logic.
require(["engine/Screen", "actors/Grid"], function (Screen, Grid) {
	"use strict";
	var screen = new Screen(),
		grid = new Grid("orange", 20);
	
	grid.render({ screen: screen });
	
});
