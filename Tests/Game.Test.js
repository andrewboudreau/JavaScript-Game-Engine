
var noop = function() {};

var EntityMock = Entity.extend({
	inited: 0,
	updated: 0,
	rendered: 0,
	init: function(position, rotation){
		this.inited += 1;
		this._super();
	},
	update: function() { 
		this.updated += 1;
		this._super();
	},	
	render: function() {
		this.rendered += 1;
	},
	reset: function() {
		this.inited = 0;
		this.updated = 0;
		this.rendered = 0;
	}
});

module("Game prerequisites");

test("Class defined", function() {
  ok( Class, "a reference to Class.js" );
});

test("Entity Defined", function() {
  ok( Entity, "a reference to Entity.js" );
});


module("Game.gameLoop");

test("clear", 1, function() {
	var count = 0, 
		game = { 
			renderText: noop,
			clear: function() { 
				count += 1;
			}
		};
		
	Game.gameLoop(0, game, {}, { each: noop});
	ok(count, 1, "clear called once");
});

test("entityManager.each", 1, function() {
	var count = 0, 
		entityManager = { 
			each : function () {
				count += 1;
			}
		};
		
	Game.gameLoop(0, {clear: noop, renderText: noop}, {}, entityManager);
	ok(count, 1, "clear called once");
});

test("renderText", 1, function() {
	var count = 0, 
		game = { 
			renderText: function() { 
				count += 1;
			},
			clear: noop
		};
		
	Game.gameLoop(0, game, {}, { each: noop});
	ok(count, 1, "clear called once");
});

test("calls entity update", 1, function() {
	var mock = new EntityMock(),
		entityManager = {
			each: function( func ) {
				func(mock);
			}
		};
	Game.gameLoop(1, {clear: noop, renderText: noop}, {}, entityManager);
	
	equal(mock.updated, 1, "entity updated by game");
});

test("no update when paused", 1, function() {
	var mock = new EntityMock(),
		entityManager = {
			each: function( func ) {
				func(mock);
			}
		};
	Game.gameLoop(1, {clear: noop, renderText: noop, paused: true}, {}, entityManager);
	
	equal(mock.updated, 0, "entity not updated during pause");
});

test("calls entity render", 1, function() {
	var mock = new EntityMock(),
		entityManager = {
			each: function( func ) {
				func(mock);
			}
		};
	Game.gameLoop(1, {clear: noop, renderText: noop}, {}, entityManager);
	
	equal(mock.rendered, 1, "entity rendered by game");
});

test("does not call entity render", 1, function() {
	var mock = new EntityMock(),
		entityManager = {
			each: function( func ) {
				func(mock);
			}
		};
	mock.render = false;
	Game.gameLoop(1, {clear: noop, renderText: noop}, {}, entityManager);
	
	equal(mock.rendered, 0, "entity not rendered during ");
});

test("passes parameters to update", 4, function() {
	var mock = new Entity(),
		game = {clear: noop, renderText: noop},
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
	
	Game.gameLoop(1, game, input, entityManager);
});


module("Game.textBuffer", {
	teardown: function() {
		Game.textBuffer.length = 0;
	}
});

test("add nothing to text buffer", 1, function() {
	equal(Game.textBuffer.length, 0, "text added to buffer");
});

test("defaults", 5, function() {

	Game.writeText("foobar");
	
	equal(Game.textBuffer.length, 1, "text added to buffer");
	equal(Game.textBuffer[0].text, "foobar", "text");
	equal(Game.textBuffer[0].x, 0, "default x");
	equal(Game.textBuffer[0].y, 0, "default y");
	equal(Game.textBuffer[0].font, "bold 12px sans-serif", "default font");
});

test("write with full options", 5, function() {

	Game.writeText({text: "foo, bar", x: 1, y:1, font: "bold 14px"});
	
	equal(Game.textBuffer.length, 1, "text added to buffer");
	equal(Game.textBuffer[0].text, "foo, bar", "text");
	equal(Game.textBuffer[0].x, 1, "x");
	equal(Game.textBuffer[0].y, 1, "y");
	equal(Game.textBuffer[0].font, "bold 14px");
});

test("add text buffer", 1, function() {
	Game.writeText({text: "foo"});
	equal(Game.textBuffer[0].text, "foo", "text added to buffer");
});

test("add multiple text buffer", 2, function() {
	Game.writeText("foo");
	Game.writeText("bar");
	equal(Game.textBuffer[0].text, "foo", "text added to buffer");
	equal(Game.textBuffer[1].text, "bar", "text added to buffer");
});

test("text buffer cleared by renderText", 1, function() {
	Game.writeText("foo");
	Game.renderText();
	equal(Game.textBuffer.length, 0, "buffer cleared by renderText");
});

test("write text buffer", 1, function() {
	
	Game.writeText("foo");
	equal(Game.textBuffer[0].text, "foo", "text added to buffer");
});


module("Game.init", {
	teardown: function() {
		Game.exit = true;
		Game.InputManager.inited = false;
		Game.reset();
  }
});

test("Game inits on run", 1, function() {
	Game.EntityManager = { each: noop };
	Game.InputManager = { init: noop };
	Game.exit = true;
	Game.run();
	ok(Game.initialized, "game initialized");
});

test("Input manager inits on run", 1, function() {
	var count = 0;
	Game.EntityManager = { each: noop };
	Game.InputManager = { init: function() { 
		count += 1;} 
	};
	
	Game.exit = true;
	Game.run();
	equal(count, 1, "input initialized");
});

test("run calls gameLoop", 1, function() {
	var count = 0;
	Game.EntityManager = { each: noop };
	Game.InputManager = { init: noop };
	Game.gameLoop = function() {
		count += 1;
	};
	Game.exit = true;
	Game.run();
	equal(count, 1, "game looped once");
});

