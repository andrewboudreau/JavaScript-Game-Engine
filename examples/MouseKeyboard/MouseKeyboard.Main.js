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
require(["jquery", "engine/Game", "actors/Grid", "actors/Polygon", "actors/Dot"],
	function ($, Game, Grid, Polygon, Dot) {
		"use strict";

		var keyboard = new Dot({x: 0, y: 0, rotation: 0, size: 10, color: "red" }),
			cursor = new Dot({x: 0, y: 0, rotation: 0, size: 10, color: "blue" });
		
		keyboard.update = function (duration, inputManager, entityManager) {
			this.rotation -= 0.02;
			
			if (inputManager.isPressed(inputManager.left)) {
				this.x -= 1;
			}
			
			if (inputManager.isPressed(inputManager.right)) {
				this.x += 1;
			}
			
			if (inputManager.isPressed(inputManager.up)) {
				this.y -= 1;
			}
			
			if (inputManager.isPressed(inputManager.down)) {
				this.y += 1;
			}
			
			Game.singletonInstance.writeText({text: "keyboard - x:" + this.x + " y:" + this.y, x: this.x + this.halfSize, y: this.y});
		};
		
		cursor.update = function (duration, inputManager, entityManager) {
			this.rotation += 0.02;
			
			if (inputManager.isPressed(inputManager.buttonOne)) {
				this.color = "pink";
			} else if (inputManager.isPressed(inputManager.buttonTwo)) {
				this.color = "green";
			} else if (inputManager.isPressed(inputManager.buttonThree)) {
				this.color = "brown";
			} else {
				this.color = "blue";
			}
			
			this.scale += inputManager.wheelDelta() * 0.2;
			
			this.x = inputManager.x;
			this.y = inputManager.y;
			
			var wheelDelta = inputManager.wheelDelta();
			if (wheelDelta != 0) {
				this.size += wheelDelta;
			}
			
			Game.singletonInstance.writeText({text: "cursor - x:" + this.x + " y:" + this.y, x: this.x + this.halfSize, y: this.y});
		};
		
		Game.singletonInstance
			.add(new Grid())
			.add(cursor)
			.add(keyboard)
			.run();
			
	}
);


