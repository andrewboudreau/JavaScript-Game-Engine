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
require(["jquery", "engine/Game", "actors/Grid", "actors/Polygon", "actors/Dot", "input/GamepadController", "input/MouseKeyboardController", "engine/Entity", "lib/dat.gui"],
	function ($, Game, Grid, Polygon, Dot, GamepadController, MouseKeyboardController, Entity) {
		"use strict";
		
		var traces = [],
			power = 0, 
			angle = 0,
			game = Game.singletonInstance,
			dot = new Dot({
				position: [game.screen.canvas.width / 2 - 20, 20], 
				gravity: [0, 0.3]
			});
			dot.trace = true;
		
		var controller = new GamepadController().init();
		var keyboard = new MouseKeyboardController(Game.singletonInstance.screen).init();
		
		var OnScreenController = Entity.inherit({
			init: function () {
				this.$super();
				this.container = new Polygon(70, 70, 0 [
					-10, -10,
					10, -10,
					10, 10,
					-10, 10
				]);
				this.key
				this.add(this.container);
			}
		});
		
		var Turret = Entity.inherit({
			init: function () {
				
				this.power = 20;
				this.angle = 1;
				
				this.stand = new Polygon(game.screen.canvas.width / 2, game.screen.canvas.height, 0, [
					0, 0,
					0, -25,
					4, -30,
					16, -30,
					20, -25,
					20, -30,
					20, 0
				]);
				
				this.barrel = new Polygon(game.screen.canvas.width / 2 + 10, game.screen.canvas.height - 25, 0, [
					-5, 0,
					-5, -20,
					5, -20,
					5, 0
				]);
				
				this.launchPosition = [game.screen.canvas.width / 2 + 10 , game.screen.canvas.height - 20];
			},
			render: function (game) {
			
				game.writeText({text: "use spacebar and arrow keys", x: game.screen.canvas.width / 2 - 70, y: 15});
				var ctx = game.screen.context;
				
				this.stand.render(game);
				this.barrel.rotation = this.angle;
				this.barrel.render(game);
			}
		});
	
		var turret = new Turret();
		turret.add({
			update: function () {
				if (keyboard.isPressed(keyboard.left)) {
					turret.angle -= 0.02;
				}
				if (keyboard.isPressed(keyboard.right)) {
					turret.angle += 0.02;
				}
				if (keyboard.isPressed(keyboard.up)) {
					turret.power += 0.2;
				}
				if (keyboard.isPressed(keyboard.down)) {
					turret.power -= 0.2;
				}
				if (keyboard.isPressed(13) || keyboard.isPressed(32)) {
					traces = [];
					dot.physics.velocity(0, 0);
					dot.physics.position(turret.launchPosition);
					
					var explosion = [
						turret.power * Math.sin(turret.angle),
						-turret.power * Math.cos(turret.angle)
					];
					
					dot.physics.applyForce(explosion);
				}
			},
			render: function () {
			}
		});
		
		dot.add({
			update: function (dt) {
				if (dot.physics.position.y + dot.size >= game.screen.canvas.height) {
					dot.physics.position.y = game.screen.canvas.height - dot.halfSize;
					dot.physics.velocity.y = 0;
					if (dot.physics.position.x > game.screen.canvas.width || dot.physics.position.x <= 0) {
						dot.physics.velocity.x = 0;
					}
				}
				if ( Math.abs(dot.physics.velocity.x) > 0 || Math.abs(dot.physics.velocity.y) > 0) {
					traces.push(dot.physics.position.x, dot.physics.position.y);
				}
			},
			render: function (game) {
				var item, ctx = game.screen.context;
				
				if (traces.length && dot.trace) {
					ctx.beginPath();
					ctx.moveTo(traces[0], traces[1]);
					for (item = 2; item < traces.length - 1; item += 2) {
						ctx.lineTo(traces[item], traces[item + 1]);
					}
					ctx.stroke();
				}
			}
		});
		
		game
			.add(new Grid())
			.add(turret)
			.add(dot)
			.add(new OnScreenController())
			.run();
		
		var gui = new dat.GUI();
		gui.add(turret, "power", 1, 50).min(0).max(50).listen();
		
		gui.add(turret, "angle", -2, 2).min(-2).max(2).listen();
		gui.add(dot, "trace");
		
		var guiDrag = gui.addFolder('Gravity');
		guiDrag.add(dot.physics.gravity, 'x', 0, 1);
		guiDrag.add(dot.physics.gravity, 'y', 0, 1);
	}
);


