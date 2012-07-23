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
require(["jquery", "engine/Game", "components/Grid", "actors/Polygon", "actors/Dot"],
	function ($, Game, Grid, Polygon, Dot) {
		"use strict";
		
		var polyupdate = function () {
			this.rotation += 0.01;
		};
		var cursor = new Dot({x: 0, y: 0, rotation: 0, size: 10});
		
		cursor.update = function (duration, inputManager, entityManager) {
				this.x = inputManager.x;
				this.y = inputManager.y;
				var wheelDelta = inputManager.wheelDelta();
				if (wheelDelta != 0) {
					this.size += wheelDelta;
				}
		};
		
		new Game()
			.add(new Grid())
			.add(cursor)
			.run();
	}
);


