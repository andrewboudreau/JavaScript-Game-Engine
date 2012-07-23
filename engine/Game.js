/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */
define(["engine/Function", "engine/Component", "components/CollectionManager", "components/TextManager", "input/MouseKeyboardController", "engine/requestAnimationFrame"], 
	function (Function, Component, CollectionManager, TextManager, MouseKeyboardController, requestAnimationFrame) {
		"use strict";
		
		var Game = Function.inherit({
			singletonInstance: null,
			init: function (canvas, context, autostart) {
				Game.singletonInstance = this;
				
				this.canvas = canvas || document.getElementById("canvas");
				this.context = canvas || this.canvas.getContext("2d");
				this.autoStart = autostart ? true : false;
				
				this.entityManager = new CollectionManager(Component);
				this.textManager = new TextManager(this.context);
				this.inputManager = new MouseKeyboardController();
				
				this.initialized = false;
				this.paused = false;
				this.exit = false;
				
				this.entityManager.add(this.textManager);
			},
			
			add: function (component) {
				this.entityManager.add(component);
			},
			
			run: function (duration) {
			/// <summary>
			/// application loop, request animation frame.  
			/// </summary>
				var self = Game.singletonInstance;
				
				self.gameLoop(duration, self, self.inputManager, self.entityManager);
				
				if (!self.exit) {
					requestAnimationFrame(self.run);
				}
			},
			
			gameLoop: function (duration, game, inputManager, entityManager) {
			/// <summary>
			/// Internal game loop, all context passed in externally making this method testable.
			/// </summary>
				game.clear();
				
				entityManager.each(function (entity) {
					if (!game.paused) {
						entity.update(duration, inputManager, entityManager);
					}
					if (entity.render) {
						entity.render(game, duration);			
					}
				});
			},
			
			clear: function () {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
			
			pointInConvexPolygon: function (point, vertices) {
				function crossProduct(a, b) {
					return a[0] * b[1] - a[1] * b[0];
				}
				
				function subtract(a, b) {
					return [a[0] - b[0], a[1] - b[1]];
				}
				
				var i = 0,
					sign = 0,
					segment, affineSegment, affinePoint, k;
				
				for (i = 0; i < vertices.length; i++) {
					segment = [vertices[i], vertices[(i + 1) % vertices.length]];
					affineSegment = subtract(segment[1] - segment[0]);
					affinePoint = subtract(point, segment[0]);
					k = crossProduct(affineSegment, affinePoint);
					
					if (k === 0) {
						return true;
					}
					
					if (k * sign < 0 !== 0) {
						return k * sign < 0;
					}
					
				}
			},
			
			reset: function () {
				this.entityManager.clear();
				this.textManager.clear();
				
				this.initialized = false;
				this.paused = false;
				this.exit = false;
			}
		});
		
		return Game;	
    }
);