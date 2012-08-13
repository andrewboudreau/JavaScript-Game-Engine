/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require, test, equal, strictEqual, ok, raises, deepEqual */

require.config({
	paths: {
		"engine": "../engine",
		"components": "../engine/components",
		"actors": "../engine/actors",
		"input": "../engine/input",
		"lib": "../lib"
    }
});

require(["engine/Function", "engine/Component", "engine/Actor", "engine/Game"], 
function (Function, Component, Actor, Game) {
	"use strict";
	
	var noop = function() {},
		ActorSpy = Actor.inherit({
			inited: 0,
			updated: 0,
			rendered: 0,
			init: function (x, y, rotation){
				this.$super(x, y, rotation);
				this.inited += 1;
			},
			update: function () { 
				this.$super();
				this.updated += 1;
			},	
			render: function () {
				this.$super();
				this.rendered += 1;
			},
			reset: function () {
				this.inited = 0;
				this.updated = 0;
				this.rendered = 0;
			}
		}),
		GameSpy = Function.inherit({
			init: function() {
			},
			screen: {
				clear: function () {
				}
			}
		});

	module("Game.gameLoop");

	test("clear", 1, function () {
		var game = new Game(),
			count = 0;
			
		game.screen.clear = function () {
			count += 1;
		};
			
		game.gameLoop(0, game, {}, {each: noop});
		equal(count, 1, "clear called once");
	});

	test("entityManager.each", 1, function () {
		var game = new Game(),
			count = 0, 
			entityManager = { 
				each : function () {
					count += 1;
				}
			};
			
		game.gameLoop(0, {screen: {clear: noop}}, {}, entityManager);
		ok(count, 1, "clear called once");
	});

	test("calls entity update", 1, function () {
		var game = new Game(),
			mock = new ActorSpy(),
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
			
		game.gameLoop(1, {screen: {clear: noop}}, {}, entityManager);
		equal(mock.updated, 1, "entity updated by game");
	});

	test("no update when paused", 1, function () {
		var game = new Game(),
			mock = new ActorSpy(),
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
			
		game.paused = true;
		game.gameLoop(1, game, {}, entityManager);
		
		equal(mock.updated, 0, "entity not updated during pause");
	});

	test("calls entity render", 1, function () {
		var game = new Game(),
			mock = new ActorSpy(),
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
			
		game.gameLoop(1, game, {}, entityManager);
		
		equal(mock.rendered, 1, "entity rendered by game");
	});

	test("does not call entity render", 1, function () {
		var game = new Game(),
			mock = new ActorSpy(),
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
		mock.render = false;
		game.gameLoop(1, game, {}, entityManager);
		
		equal(mock.rendered, 0, "entity not rendered during ");
	});

	test("passes parameters to update", 4, function () {
		var game = new Game(),
			mock = new ActorSpy(),
			input = {},
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
		mock.update = function () {
			equal(arguments.length, 3, "arguments passed to update");
			equal(arguments[0], 1, "1 duration");
			strictEqual(arguments[1], input, "input");
			strictEqual(arguments[2], entityManager, "entitymanager");
		}
		
		game.gameLoop(1, game, input, entityManager);
	});

	test("reset clears", 5, function () {
		var game = new Game(),
			textManager = {
				clearCount: 0,
				clear: function () {
					this.clearCount += 1;
				},
			},
			entityManager = {
				clearCount: 0,
				clear: function () {
					this.clearCount += 1;
				},
			};
			
		game.exit = true;
		game.initialized = true;
		game.paused = true;
		game.textManager = textManager;
		game.entityManager = entityManager;
		
		game.reset();
		
		equal(game.exit, false, "exit was reset");
		equal(game.paused, false, "paused was reset");
		equal(game.initialized, false, "initialized was reset");
		equal(textManager.clearCount, 1, "textManager cleared once");
		equal(entityManager.clearCount, 1, "textManager cleared once");
	});

	module("gameLoop");

	test("run calls gameLoop", 1, function () {
		var count = 0,
			game = Game.singletonInstance;
		
		game.canvas = {width:0, height:0};
		game.entityManager = {each: noop, clear:noop};
		game.inputManager = { };
		
		game.gameLoop = function () {
			count += 1;
		};
		game.exit = true;
		game.run();
		equal(count, 1, "game looped once");
	});

	module("singleton");
	
	test("you don't need to call new", function () {
		var game1 = Game.singletonInstance;
		var game2 = Game.singletonInstance;
		ok(game1 === game2);
	});
	
	test("multiple calls to new Game() don't return the same instance", function () {
		var game1 = new Game();
		var game2 = new Game();
		ok(game1 !== game2);
	});
	
	test("singleton instance doesn't change upon calling new", function () {
		var game1 = new Game().singletonInstance;
		var game2 = new Game().singletonInstance;
		ok(game1 === game2);
	});
});
