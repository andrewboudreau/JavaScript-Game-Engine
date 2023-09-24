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
require(["jquery", "engine/Game", "actors/Grid", "actors/Polygon", "actors/Dot", "input/GamepadController", "input/MouseKeyboardController", "actors/Ship", "lib/dat.gui"],
	function ($, Game, Grid, Polygon, Dot, GamepadController, MouseKeyboardController, Ship) {
		"use strict";
		
		var controller = new GamepadController().init();
		var keyboard = new MouseKeyboardController(Game.singletonInstance.screen).init();
		
		var ship = new Ship({x: 0, y: 0, rotation: 0, size: 10, color: "red" });
		ship.physics.drag(0.05, 0.05);
		
		var gui = new dat.GUI();
		gui.add(ship.physics, "mag").listen();
		gui.add(ship.physics, "dt").listen();
		
		var guiDrag = gui.addFolder('Drag');
		guiDrag.add(ship.physics.drag, 'x', 0, 0.20);
		guiDrag.add(ship.physics.drag, 'y', 0, 0.20);
		
		var guiThresholds = gui.addFolder('Thresholds');
		guiThresholds.add(ship.physics.thresholds, 'velocity').min(0).step(1);
		
  
		ship.add({
			update: function (duration, inputManager, entityManager) {
				
				ship.physics.rotation += 0.1 * controller.axes(GamepadController.axes.RIGHT_ANALOGUE_HOR);
				
				ship.physics.applyForce(controller.axes(GamepadController.axes.LEFT_ANALOGUE_HOR), controller.axes(GamepadController.axes.LEFT_ANALOGUE_VERT));
				
				if (keyboard.isPressed(keyboard.left)) {
					ship.physics.rotation -= 0.02;
				}
				if (keyboard.isPressed(keyboard.right)) {
					ship.physics.rotation += 0.02;
				}
				
				if (keyboard.isPressed(keyboard.up)) {
					var f = 0.2;
					var x = Math.sin(ship.physics.rotation);
					var y = Math.cos(ship.physics.rotation);
					ship.physics.applyForce(x * f, -y * f);
				}
				if (keyboard.isPressed(keyboard.down)) {
					var f = -0.2;
					var x = Math.sin(ship.physics.rotation);
					var y = Math.cos(ship.physics.rotation);
					ship.physics.applyForce(x * f, -y * f);
				}
				
				if (ship.physics.position.x > Game.singletonInstance.screen.canvas.width) {
					ship.physics.position.x = 0;
				} else if (ship.physics.position.x < 0) {
					ship.physics.position.x = Game.singletonInstance.screen.canvas.width;
				}
				
				if (ship.physics.position.y > Game.singletonInstance.screen.canvas.height) {
					ship.physics.position.y = Game.singletonInstance.screen.canvas.height - ship.halfSize;
					ship.physics.velocity.y = 0;
				} else if (ship.physics.position.y < 0) {
					ship.physics.position.y = Game.singletonInstance.screen.canvas.height;
				}
				
				if (controller.buttons(GamepadController.buttons.FACE_1)) {
					ship.physics.velocity.x = 0;
					ship.physics.velocity.y = 0;
				}
				Game.singletonInstance.writeText("Use the arrow keys or a gamepad.");
			},
			render: function () { }
		});
		
		
		Game.singletonInstance
			.add(new Grid())
			.add(ship)
			.run();
			
	}
);


