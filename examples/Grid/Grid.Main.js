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
require(["actors/Grid"], function (Grid) {
	"use strict";
	var canvas = document.getElementById("canvas"),
		context	= canvas.getContext("2d"),
		grid = new Grid("orange", 20);
	
	grid.render({ 
		canvas: canvas, 
		context: context
	});
	
});
