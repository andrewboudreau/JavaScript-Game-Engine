/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define*/
define(["engine/Function", "engine/Screen", "engine/Component", "engine/CollectionManager", "components/TextManager", "input/MouseKeyboardController", "engine/requestAnimationFrame", "lib/stats"], 
	function (Function, Screen, Component, CollectionManager, TextManager, MouseKeyboardController, requestAnimationFrame) {
		"use strict";
		
		var stats = new Stats();
		
		// Align top-left
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '75%';
		stats.domElement.style.top = '0px';
		stats.setMode(0); // 0: fps, 1: ms
		document.body.appendChild( stats.domElement );
		
		var Game = function (canvas, context) {
			Game.singletonInstance = this.init(canvas, context);	
		};
		
		Game.prototype = {
			init: function (canvas, context) {
				this.animationStartTime = 0;
				
				this.screen = new Screen(canvas, context);
				this.entityManager = new CollectionManager();
				this.textManager = new TextManager(this.screen);
				this.inputManager = new MouseKeyboardController(this.screen).init();
				
				this.initialized = false;
				this.paused = false;
				this.exit = false;
				
				this.entityManager.add(this.textManager);
				return this;
			},
			
			add: function (component) {
				this.entityManager.add(component);
				return this;
			},
			
			run: function (time) {
			/// <summary>
			/// application loop, request animation frame.  
			/// </summary>
				stats.begin();
				if (this.animationStartTime === 0) {
					this.animationStartTime = window.animationStartTime();
				}
				
				var self = Game.singletonInstance,
					dt = time - this.animationStartTime;
				
				this.animationStartTime = time;
				self.gameLoop(dt, self, self.inputManager, self.entityManager);
				
				if (!self.exit) {
					requestAnimationFrame(self.run);
				}
				stats.end();
			},
			
			gameLoop: function (dt, game, inputManager, entityManager) {
			/// <summary>
			/// Internal game loop, all context passed in externally making this method testable.
			/// </summary>
				game.screen.clear();
				
				entityManager.each(function (entity) {
					if (!game.paused) {
						entity.update(dt, inputManager, entityManager);
					}
					if (entity.render) {
						entity.render(game);			
					}
				});
			},
			
			writeText: function (options) {
				///<summary>
				/// Utility function to write text to the canvas.
				/// options { text, x, y, font }
				///<summary>
				this.textManager.writeText(options);
			},
			
			writeLine: function (text) {
				///<summary>
				/// Utility function to write text to the canvas.
				///<summary>
				this.textManager.writeLine(text);
			},
			
			reset: function () {
				this.entityManager.clear();
				this.textManager.clear();
				
				this.initialized = false;
				this.paused = false;
				this.exit = false;
			}
		};
		
		Game.singletonInstance = new Game();
		return Game;
    }
);