/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require */
require.config({
	paths: {
		"engine": "../../engine",
		"components": "../../engine/components",
		"actors": "../../engine/actors",
		"input": "../../engine/input",
		"lib": "../../lib"
    }
});

// Start the main app logic.
require(["jquery", "engine/Game", "actors/Grid", "actors/Polygon", "actors/Dot", "input/GamepadController"],
	function ($, Game, Grid, Polygon, Dot, GamepadController) {
		"use strict";
		var controller = new GamepadController().init();
		
		var ship = new Dot({x: 0, y: 0, rotation: 0, size: 10, color: "red" });
		
		ship.update = function (duration, inputManager, entityManager) {

			var move = 2;
			var run = 10;
			
			this.rotation += 0.1 * controller.axes(GamepadController.axes.RIGHT_ANALOGUE_HOR);
			
			var multiplier = controller.buttons(GamepadController.buttons.RIGHT_SHOULDER_BOTTOM) ? move : run;
			this.x += Math.floor(multiplier * controller.axes(GamepadController.axes.LEFT_ANALOGUE_HOR));
			this.y += Math.floor(multiplier * controller.axes(GamepadController.axes.LEFT_ANALOGUE_VERT));
			
			Game.singletonInstance.writeText({text: "leftAnalogue - x:" + this.x + " y:" + this.y, x: this.x + this.halfSize, y: this.y});
		};
		
		Game.singletonInstance
			.add(new Grid())
			.add(ship)
			.run();
			
	}
);


