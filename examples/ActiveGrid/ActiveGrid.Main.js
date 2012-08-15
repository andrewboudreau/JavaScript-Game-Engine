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
		
		var leftAnalogue = new Dot({x: 0, y: 0, rotation: 0, size: 10, color: "red" }),
			rightAnalogue = new Dot({x: 0, y: 0, rotation: 0, size: 10, color: "green" }),
			cursor = new Dot({x: 0, y: 0, rotation: 0, size: 10, color: "blue" }),
			outliner = function (vector) {
				return function (game) {
					if (vector === cursor) {
						console.log("found cursor");
					} else if (vector === leftAnalogue) {
						console.log("found leftAnalogue");
					} else {
						console.log("no");
					}
					
					var w, h,
						ctx = game.screen.context,
						canvas = game.screen.canvas,
						x1 = Math.floor(vector.x / 20) * 20, 
						x2 = Math.ceil(vector.x / 20) * 20, 
						y1 = Math.floor(vector.y / 20) * 20,
						y2 = Math.ceil(vector.y / 20) * 20;
						
						ctx.save();
						ctx.strokeStyle  = vector.color;
						
						ctx.beginPath();
						ctx.moveTo(x1, 0);
						ctx.lineTo(x1, canvas.height);
						ctx.moveTo(x2, 0);
						ctx.lineTo(x2, canvas.height);
						ctx.stroke();
						
						ctx.beginPath();
						ctx.moveTo(0, y1);
						ctx.lineTo(canvas.width, y1);
						ctx.moveTo(0, y2);
						ctx.lineTo(canvas.width, y2);
						ctx.stroke();
						
						ctx.restore();
				};
			};
		
		cursor.add({
			update: function () {},
			render: outliner(cursor)
		}); 
		
		leftAnalogue.add({
			update: function () {},
			render: outliner(leftAnalogue)
		});
		
		rightAnalogue.add({
			update: function () {},
			render: outliner(rightAnalogue)
		});
		
		leftAnalogue.update = function (duration, inputManager, entityManager) {

			var move = 2;
			var run = 10;
			
			this.rotation += 0.1 * controller.axes(GamepadController.axes.RIGHT_ANALOGUE_HOR);
			
			var multiplier = controller.buttons(GamepadController.buttons.RIGHT_SHOULDER_BOTTOM) ? move : run;
			this.x += Math.floor(multiplier * controller.axes(GamepadController.axes.LEFT_ANALOGUE_HOR));
			this.y += Math.floor(multiplier * controller.axes(GamepadController.axes.LEFT_ANALOGUE_VERT));
			
			Game.singletonInstance.writeText({text: "leftAnalogue - x:" + this.x + " y:" + this.y, x: this.x + this.halfSize, y: this.y});
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
		
		rightAnalogue.update = function (duration, inputManager, entityManager) {
			var move = 2;
			var run = 10;
			
			this.rotation += 0.1 * controller.axes(GamepadController.axes.RIGHT_ANALOGUE_HOR);
			
			var multiplier = controller.buttons(GamepadController.buttons.RIGHT_SHOULDER_BOTTOM) ? move : run;
			this.x += Math.floor(multiplier * controller.axes(GamepadController.axes.RIGHT_ANALOGUE_HOR));
			this.y += Math.floor(multiplier * controller.axes(GamepadController.axes.RIGHT_ANALOGUE_VERT));
			
			Game.singletonInstance.writeText({text: "leftAnalogue - x:" + this.x + " y:" + this.y, x: this.x + this.halfSize, y: this.y});
		};
		
		Game.singletonInstance
			.add(new Grid())
			.add(cursor)
			.add(leftAnalogue)
			.add(rightAnalogue)
			.run();
			
	}
);


