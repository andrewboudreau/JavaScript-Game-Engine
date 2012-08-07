/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require */
require.config({
	paths: {
		"engine": "../../engine",
		"components": "../../engine/components",
		"actors": "../../engine/actors"
    }
});

// Start the main app logic.
require(["actors/Polygon", "actors/Grid"], 
	function (Polygon, Grid) {
		"use strict";
		
		var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			poly = new Polygon(300, 200),
			grid = new Grid();
			
		grid.render({canvas: canvas, context: context});
		poly.render({canvas: canvas, context: context});
	}
	
	
);
