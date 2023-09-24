/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require */
require.config({
	paths: {
		"engine": "../../engine",
		"components": "../../engine/components",
		"actors": "../../engine/actors",
		"input": "../../engine/input"
    }
});

// Start the main app logic.
require(["jquery", "engine/Game", "actors/Grid", "actors/Polygon"],
	function ($, Game, Grid, Polygon) {
		"use strict";
		
		var polyupdate = function () {
			this.rotation += 0.02;
		};
		
		var game = new Game();
		game.add(new Polygon(240, 200, 0, false, polyupdate));
		game.add(new Grid());
		game.run();
	}
);


