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
require(["jquery", "engine/Game", "actors/Grid", "actors/Polygon", "actors/Dot", "input/GamepadController", "input/MouseKeyboardController", "actors/Ship"],
	function ($, Game, Grid, Polygon, Dot, GamepadController, MouseKeyboardController, Ship) {
		"use strict";
		
		var controller = new GamepadController().init();
		var keyboard = new MouseKeyboardController(Game.singletonInstance.screen).init();
		
		var ship = new Ship({x: 0, y: 0, rotation: 0, size: 10, color: "red" });
		
		ship.add({
			update: function (duration, inputManager, entityManager) {
				
				ship.physics.rotation += 0.1 * controller.axes(GamepadController.axes.RIGHT_ANALOGUE_HOR);
				
				ship.physics.velocity.x += controller.axes(GamepadController.axes.LEFT_ANALOGUE_HOR);
				ship.physics.velocity.y += controller.axes(GamepadController.axes.LEFT_ANALOGUE_VERT);
				
				if (keyboard.isPressed(keyboard.left)) {
					ship.physics.velocity.x -= 0.2;
				}
				if (keyboard.isPressed(keyboard.right)) {
					ship.physics.velocity.x += 0.2;
				}
				
				if (keyboard.isPressed(keyboard.up)) {
					ship.physics.velocity.y -= 0.2;
				}
				if (keyboard.isPressed(keyboard.down)) {
					ship.physics.velocity.y += 0.2;
				}
				
				if (ship.physics.position.x > Game.singletonInstance.screen.canvas.width) {
					ship.physics.position.x = 0;
				} else if (ship.physics.position.x < 0) {
					ship.physics.position.x = Game.singletonInstance.screen.canvas.width;
				}
				
				if (ship.physics.position.y > Game.singletonInstance.screen.canvas.height) {
					ship.physics.position.y = 0;
				} else if (ship.physics.position.y < 0) {
					ship.physics.position.y = Game.singletonInstance.screen.canvas.height;
				}
				
				if (controller.buttons(GamepadController.buttons.FACE_1)) {
					ship.physics.velocity.x = 0;
					ship.physics.velocity.y = 0;
				}
			},
			render: function () { }
		});
		
		Game.singletonInstance
			.add(new Grid())
			.add(ship)
			.run();
			
	}
);


