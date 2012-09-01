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
require(["engine/Game", "actors/Grid", "input/MouseKeyboardController", "engine/Entity", "engine/Physics", "lib/dat.gui"],
	function (Game, Grid, MouseKeyboardController, Entity, Physics) {
		"use strict";
		
		var id = 0,
			defaults = {
			};
		
		var Frame = function (x, y, width, height, options) {
			options = $.extend({}, options);
			
			if (arguments.length === 1) {
				options = $.extend({}, x);
			} 
			else if (arguments.length === 2) {
				options = $.extend({}, {x:x, y:y, width:x, height:y});
			}
			else if (arguments.length === 4) {
				options = $.extend({}, {x:x, y:y, width:width, height:height});
			}
			else if (arguments.length === 5) {
				options = $.extend({}, {x:x, y:y, width:width, height:height});
			}
			
			this.x = options.x;
			this.y = options.y;
			this.width = options.width;
			this.height = options.height;
			this.delay = options.delay || 120;
		};
		
		var Animation = function (options) {
			options = $.extend(true, {}, defaults, options);
			
			this.init = false;
			this.name = options.name || "anim" + (id++).toString();
			
			this.steps = options.steps;
			this.playing = options.playing || false;
			
			this.image = new Image();
			this.image.src = options.src || 'character.png';
			this.frames = options.frames;
			for(var i = 0; i <= this.frames.length - 1; i++) {
				this.frames[i].scale = options.scale || 1;
			}
			
			this.currentStepIndex = 0;
			this.timeSinceLastFrameChange = 0;
		};
		
		Animation.prototype = {
			play: function () {
				this.playing = true;
			},
			
			stop: function () {
				this.currentStepIndex = 0;
				this.playing = false;
			},
			
			currentFrame: function () {
				return this.frames[this.steps[this.currentStepIndex]];
			},
			
			update: function (dt) {
				var frame = this.currentFrame();
				
				this.timeSinceLastFrameChange += dt;
				if (this.playing && this.timeSinceLastFrameChange >= frame.delay) {
					this.forward();
					this.timeSinceLastFrameChange = 0;
				}
			},
			
			render: function (game) {
				
				var ctx = game.screen.context;
				var frame = this.currentFrame();
				var x = 100, y = 100;

				//ctx.fillRect(x, y, frame.width, frame.height);
				ctx.drawImage(this.image, frame.x, frame.y, frame.width, frame.height, x, y, frame.width * frame.scale, frame.height * frame.scale);
			},
			
			forward: function () {
				if (this.currentStepIndex >= this.steps.length - 1) {
					this.currentStepIndex = 0;
					console.log('reset step index');
				} else {
					this.currentStepIndex += 1;
				}
				//console.log('advanced to step index: ' + this.currentStepIndex);
			},
			
			rewind: function () {
				if (this.currentStepIndex < 0 ) {
					this.curentStepIndex = this.steps.length - 1;
				} else {
					this.currentStepIndex -= 1;
				}
			}
		};
		
		var s = 48, 
			yOffset = 12 * (s + 1);
		
		var running = new Animation({
			scale: 3,			
			frames: [ 
				new Frame(s * 0, yOffset, s, s),
				new Frame(s * 1, yOffset, s, s),
				new Frame(s * 2, yOffset, s, s),
				new Frame(s * 3, yOffset, s, s),
				new Frame(s * 4, yOffset, s, s),
				new Frame(s * 5, yOffset, s, s)
			],
			steps: [0, 1, 2, 3, 4, 5]
			
		});
		
		var walkingYOffset = 11 * (s + 1);
		var walking = new Animation({
			scale: 3,
			frames: [ 
				new Frame(s * 0, walkingYOffset, s, s),
				new Frame(s * 1, walkingYOffset, s, s),
				new Frame(s * 2, walkingYOffset, s, s),
				new Frame(s * 3, walkingYOffset, s, s),
				new Frame(s * 4, walkingYOffset, s, s),
				new Frame(s * 5, walkingYOffset, s, s),
				new Frame(s * 6, walkingYOffset, s, s)
			],
			steps: [0, 1, 2, 3, 4, 5, 6]
		});
		
		
		//var controller = new GamepadController().init();
		var keyboard = new MouseKeyboardController(Game.singletonInstance.screen).init();
		
		Game.singletonInstance
			.add(new Grid())
			.add(running)
			.run();
		
		var gui = new dat.GUI();
		gui.add(running.frames[0], 'x').listen();
		gui.add(running.frames[0], 'y').listen();
		
		gui.add(running.frames[0], 'width').listen();
		gui.add(running.frames[0], 'height').listen();
		gui.add(running, 'play');
		
	}
);


