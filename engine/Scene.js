/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define*/
define(["engine/Function", "engine/Component", "components/CollectionManager", "components/TextManager", "input/MouseKeyboardController", "engine/requestAnimationFrame"], 
	(Function, Component, CollectionManager, TextManager, MouseKeyboardController, requestAnimationFrame) => {
		"use strict";
		
		let Game = (canvas, context) => {
			Game.singletonInstance = this.init(canvas, context);	
		};
		
		Game.prototype = {
			init: (canvas, context) => {
			
				this.canvas = canvas || document.getElementById("canvas");
				this.context = canvas || this.canvas.getContext("2d");
				
				this.entityManager = new CollectionManager(Component);
				this.textManager = new TextManager(this.context);
				this.inputManager = new MouseKeyboardController().init(this.canvas);
				
				this.initialized = false;
				this.paused = false;
				this.exit = false;
				
				this.entityManager.add(this.textManager);
				return this;
			},
			
			add: (component) => {
				this.entityManager.add(component);
				return this;
			},
			
			run: (duration) => {
			/// <summary>
			/// application loop, request animation frame.  
			/// </summary>
				let self = Game.singletonInstance;
				self.gameLoop(duration, self, self.inputManager, self.entityManager);
				
				if (!self.exit) {
					requestAnimationFrame(self.run);
				}
			},
			
			gameLoop: (duration, game, inputManager, entityManager) => {
			/// <summary>
			/// Internal game loop, all context passed in externally making this method testable.
			/// </summary>
				game.clear();
				
				entityManager.each((entity) => {
					if (!game.paused) {
						entity.update(duration, inputManager, entityManager);
					}
					if (entity.render) {
						entity.render(game, duration);			
					}
				});
			},
			
			clear: () => {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			},
			
			writeText: (options) => {
				///<summary>
				/// Utility function to write text to the canvas.
				/// options { text, x, y, font }
				///<summary>
				this.textManager.writeText(options);
			},
			
			writeLine: (text) => {
				///<summary>
				/// Utility function to write text to the canvas.
				///<summary>
				this.textManager.writeLine(text);
			},
			
			reset: () => {
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

import Function from "engine/Function"; {
	
	let Scene = Function.inherits({
		init: function() {
			this.entities
		},
		
		start: function() {
		},
		
		pause: function() {
		},
		
		stop: function() {
		}
			
	});
	
	return Scene
	
});

