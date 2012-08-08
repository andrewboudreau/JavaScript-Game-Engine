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
require(["engine/Screen", "actors/Polygon", "actors/Grid"], 
	function (Screen, Polygon, Grid) {
		"use strict";
		
		var screen = new Screen(),
			poly = new Polygon(300, 200),
			grid = new Grid();
			
		grid.render({screen: screen});
		poly.render({screen: screen});
	}
	
	
);
