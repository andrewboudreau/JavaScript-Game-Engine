/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require:true */
require.config({
	paths: {
		"engine": "../engine"
    }
});

require(["engine/Actor"], function (Actor) {
	
	module("Inheritance");
	
	test("Actor", function () {
		ok(Actor, "was found");
	});

	test("Actor.inherit", function() {
		expect(1);
		ok(Actor.inherit, "was found");
	});
	
	test("actor is an instance of Object", function() {
		expect(1);
		ok((new Actor()) instanceof Object);
	});
	
	test("actor is an instance of Function", function() {
		expect(1);
		ok((new Actor()) instanceof Function);
	});
	
	test("actor is an instance of Component", function() {
		expect(1);
		ok((new Actor()) instanceof Function);
	});
		
	test("actor is an instance of Actor", function() {
		expect(1);
		ok((new Actor()) instanceof Actor);
	});
	
	module("Properties");
	
	test("Default", function() {
		expect(7);
		var component = new Actor();
		
		ok(component.init, "init method defined");
		ok(component.update, "update method defined");
		ok(component.render, "render method defined");
		equal(component.x, 0, "x position defaults to 0");
		equal(component.y, 0, "y position defaults to 0");
		equal(component.rotation, 0, "rotation defaults to 0");
		deepEqual(component.position(), [0, 0], "position defaults to [0, 0]");
	});
	
	test("construct with properties", function() {
		expect(4);
		var component = new Actor(-1, 10, 1);
		
		equal(component.x, -1, "x position set");
		equal(component.y, 10, "y position set");
		equal(component.rotation, 1, "rotation was set");
		deepEqual(component.position(), [-1, 10], "position was set");
	});
	
}); 


