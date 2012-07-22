/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require:true */
require.config({
	paths: {
		"engine": "../engine"
    }
});

require(["engine/Component"], function (Component) {

	module("Inheritance");
	
	test("Component", function () {
		ok(Component, "was found");
	});

	test("Component.inherit", function() {
		expect(1);
		ok(Component.inherit, "was found");
	});
	
	test("component is an instance of Object", function() {
		expect(1);
		ok((new Component()) instanceof Object);
	});
	
	test("component is an instance of Function", function() {
		expect(1);
		ok((new Component()) instanceof Function);
	});
	
	module("Properties");
	
	test("Default", function() {
		expect(3);
		var component = new Component();
		ok(component.init, "init method defined");
		ok(component.update, "update method defined");
		ok(component.render, "render method defined");
	});
}); 


