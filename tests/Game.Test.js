/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require, test, equal, strictEqual, ok, raises, deepEqual */

require.config({
	paths: {
		"engine": "../engine",
		"components": "../engine/components",
		"actors": "../engine/actors",
		"input": "../engine/input"
    }
});


require(["engine/Component", "engine/Actor", "engine/Game"], function (Component, Actor, Game) {
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
		});

	module("Game.gameLoop");

	test("clear", 1, function () {
		var game = new Game(),
			count = 0, 
			gameSpy = { 
				renderText: noop,
				clear: function() { 
					count += 1;
				}
			};
			
		game.gameLoop(0, gameSpy, {}, { each: noop});
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
			
		game.gameLoop(0, {clear: noop, renderText: noop}, {}, entityManager);
		ok(count, 1, "clear called once");
	});

	test("calls entity update", 1, function() {
		var game = new Game(),
			mock = new ActorSpy(),
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
			
		game.gameLoop(1, {clear: noop}, {}, entityManager);
		equal(mock.updated, 1, "entity updated by game");
	});

	test("no update when paused", 1, function() {
		var game = new Game(),
			mock = new ActorSpy(),
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
		
		game.gameLoop(1, {clear: noop, renderText: noop, paused: true}, {}, entityManager);
		
		equal(mock.updated, 0, "entity not updated during pause");
	});

	test("calls entity render", 1, function() {
		var game = new Game(),
			mock = new ActorSpy(),
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
		game.gameLoop(1, {clear: noop, renderText: noop}, {}, entityManager);
		
		equal(mock.rendered, 1, "entity rendered by game");
	});

	test("does not call entity render", 1, function() {
		var game = new Game(),
			mock = new ActorSpy(),
			entityManager = {
				each: function( func ) {
					func(mock);
				}
			};
		mock.render = false;
		game.gameLoop(1, {clear: noop, renderText: noop}, {}, entityManager);
		
		equal(mock.rendered, 0, "entity not rendered during ");
	});

	test("passes parameters to update", 4, function() {
		var game = new Game(),
			mock = new ActorSpy(),
			gameSpy = {clear: noop, renderText: noop},
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
		
		game.gameLoop(1, gameSpy, input, entityManager);
	});

	test("reset clears exit", 4, function() {
		var game = new Game(),
			actorSpy = new ActorSpy(),
			gameSpy = {clear: noop, renderText: noop},
			input = {},
			entityManager = {
				each: function( func ) {
					func(actorSpy);
				}
			};
		game.exit = true;
		game.gameLoop(1, gameSpy, input, entityManager);
	});


	module("Game.init", {
		teardown: function() {
			Game.exit = true;
			Game.InputManager.inited = false;
			Game.reset();
	  }
	});

	test("Game inits on run", 1, function() {
		Game.EntityManager = { each: noop, clear:noop };
		Game.InputManager = { init: noop };
		Game.exit = true;
		Game.run();
		ok(Game.initialized, "game initialized");
	});

	test("Input manager inits on run", 1, function() {
		var count = 0;
		Game.EntityManager = { each: noop, clear: noop };
		Game.InputManager = { init: function() { 
			count += 1;} 
		};
		
		Game.exit = true;
		Game.run();
		equal(count, 1, "input initialized");
	});

	test("run calls gameLoop", 1, function() {
		var count = 0;
		Game.EntityManager = { each: noop, clear:noop };
		Game.InputManager = { init: noop };
		Game.gameLoop = function() {
			count += 1;
		};
		Game.exit = true;
		Game.run();
		equal(count, 1, "game looped once");
	});

});
