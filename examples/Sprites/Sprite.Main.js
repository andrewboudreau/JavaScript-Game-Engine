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
		
		var Frame = function (options) {
			options = $.extend({}, options);
			
			this.x = options.x;
			this.y = options.y;
			this.width = options.width;
			this.height = options.height;
			this.length = options.length || 1000;
		};
		
		var Animation = function (options) {
			options = $.extend(true, {}, defaults, options);
			
			this.init = false;
			this.name = options.name || "anim" + (id++).toString();
			
			this.width = options.width;
			this.height = options.height;
			this.steps = options.steps;
			this.source = options.source;
			
			this.image = new Image();
			this.image.src = options.src || 'character.png';
			this.frames = [];
			this.steps = [];
			this.stepIndex = 0;
			this.playing = options.playing || false;
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
				if (this.playing && this.timeSinceLastFrameChange >= this.currentFrame().length) {
					this.forward();
				}
			},
			
			render: function (game) {
				
				var ctx = game.screen.context;
				var frame = this.currentFrame();
				
				var x, y;
					x = y = 50;
					y = y * 13;
				ctx.drawImage(this.image, 0, y, 50, 50, 200, 200, 50, 50);
				
			},
			
			forward: function () {
				if (this.currentStepIndex >= this.steps.length) {
					this.curentStepIndex = 0;
				} else {
					this.currentStepIndex += 1;
				}
				//console.log('advanced to step index: ' + this.currentStepIndex);
			},
			
			rewind: function () {
				if (this.currentStepIndex <= 0 ) {
					this.curentStepIndex = this.steps.length - 1;
				} else {
					this.currentStepIndex -= 1;
				}
			}
		};
		
		var running = new Animation({
			
		});
		
		//var controller = new GamepadController().init();
		var keyboard = new MouseKeyboardController(Game.singletonInstance.screen).init();
		var anim = new Animation();
		
		Game.singletonInstance
			.add(new Grid())
			.add(anim)
			.run();
		
		var gui = new dat.GUI();
	}
);


