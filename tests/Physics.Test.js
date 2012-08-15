/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require, test, equal, strictEqual, ok, raises, deepEqual */
require.config({
	paths: {
		"engine": "../engine",
		"components": "../engine/components",
		"actors": "../engine/actors"
    }
});

require(["engine/Physics"], function (Physics) {
	"use strict";
	
	module("position");
	
	test("position is a function", 1, function () {	
		var p = new Physics();
		ok(p.position instanceof Function);
	});
	
	test("position default", 4, function () {	
		var p = new Physics();
		equal(p.position()[0], 0);
		equal(p.position()[0], 0);
		
		equal(p.position.x, 0);
		equal(p.position.y, 0);
	});
	
	test("set position 2 arguments", 2, function () {	
		var p = new Physics();
		p.position(2, -4);
		equal(p.position()[0], 2);
		equal(p.position()[1], -4);
	});
	
	test("set position with array", 2, function () {	
		var p = new Physics();
		p.position([-4, 154]);
		equal(p.position.x, -4);
		equal(p.position.y, 154);
	});
	
	test("set position with object", 2, function () {	
		var p = new Physics();
		p.position({x: -1002, y:1337});
		equal(p.position.x, -1002);
		equal(p.position.y, 1337);
	});
	
	test("setting position returns physics", 1, function () {	
		var p = new Physics();
		var result = p.position(0, 0);
		ok(p === result);
	});
	
	test("access position property directly", 2, function () {	
		var p = new Physics();
		var result = p.position(10, 40);
		equal(p.position.x, 10);
		equal(p.position.y, 40);
	});
	
	test("position values are in sync", 2, function () {	
		var p = new Physics();
		var result = p.position(2, 5);
		ok(p.position()[0] === p.position.x);
		ok(p.position()[1] === p.position.y);
	});
	
	module("velocity");
	
	test("velocity is a function", 1, function () {	
		var p = new Physics();
		ok(p.velocity instanceof Function);
	});
	
	test("velocity default", 4, function () {	
		var p = new Physics();
		equal(p.velocity()[0], 0);
		equal(p.velocity()[0], 0);
		
		equal(p.velocity.x, 0);
		equal(p.velocity.y, 0);
	});
	
	test("set velocity 2 arguments", 2, function () {	
		var p = new Physics();
		p.velocity(2, -4);
		equal(p.velocity()[0], 2);
		equal(p.velocity()[1], -4);
	});
	
	test("set velocity with array", 2, function () {	
		var p = new Physics();
		p.velocity([-4, 154]);
		equal(p.velocity.x, -4);
		equal(p.velocity.y, 154);
	});
	
	test("set velocity with object", 2, function () {	
		var p = new Physics();
		p.velocity({x: -1002, y:1337});
		equal(p.velocity.x, -1002);
		equal(p.velocity.y, 1337);
	});
	
	test("setting velocity returns physics", 1, function () {	
		var p = new Physics();
		var result = p.velocity(0, 0);
		ok(p === result);
	});
	
	test("access velocity property directly", 2, function () {	
		var p = new Physics();
		var result = p.velocity(10, 40);
		equal(p.velocity.x, 10);
		equal(p.velocity.y, 40);
	});
	
	module("acceleration");
	
	test("acceleration is a function", 1, function () {	
		var p = new Physics();
		ok(p.acceleration instanceof Function);
	});
	
	test("acceleration default", 4, function () {	
		var p = new Physics();
		equal(p.acceleration()[0], 0);
		equal(p.acceleration()[0], 0);
		
		equal(p.acceleration.x, 0);
		equal(p.acceleration.y, 0);
	});
	
	test("set acceleration 2 arguments", 2, function () {	
		var p = new Physics();
		p.acceleration(2, -4);
		equal(p.acceleration()[0], 2);
		equal(p.acceleration()[1], -4);
	});
	
	test("set acceleration with array", 2, function () {	
		var p = new Physics();
		p.acceleration([-4, 154]);
		equal(p.acceleration.x, -4);
		equal(p.acceleration.y, 154);
	});
	
	test("set acceleration with object", 2, function () {	
		var p = new Physics();
		p.acceleration({x: -1002, y:1337});
		equal(p.acceleration.x, -1002);
		equal(p.acceleration.y, 1337);
	});
	
	test("setting acceleration returns physics", 1, function () {	
		var p = new Physics();
		var result = p.acceleration(0, 0);
		ok(p === result);
	});

	test("access acceleration property directly", 2, function () {	
		var p = new Physics();
		var result = p.acceleration(10, 40);
		equal(p.acceleration.x, 10);
		equal(p.acceleration.y, 40);
	});
	
	module("update");
	
	test("position updates from velocity", 2, function () {	
		var p = new Physics();
		p.velocity(1, 0);
		p.update();
		
		equal(p.position.x, 1);
		equal(p.position.y, 0);
		
	});
	
	
});


