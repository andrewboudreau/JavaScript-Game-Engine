/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require:true, test:true, ok:true */
require.config({
	paths: {
		"engine": "../engine"
    }
});

require(["engine/Function"], function (Function) {
	"use strict";
	
	var Person = Function.inherit({
		init: function (isDancing) {
			this.dancing = isDancing;
		},
		dance: function () {
			return this.dancing;
		}
	});

	var Ninja = Person.inherit({
		init: function () {
			this.$super(false);
		},
		dance: function () {
			return this.$super();
		},
		swingSword: function () {
			return true;
		}
	});
	
	module("Inheritance");
	
	test("Person is a Object", function () {
		var p = new Person(true);
		ok(p instanceof Object);
	});
	
	test("Person is a Function", function () {
		var p = new Person(true);
		ok(p instanceof Function);
	});
	
	test("Person is a Person", function () {
		var p = new Person(true);
		ok(p instanceof Person);
	});
	
	test("Person can't dance by default", function () {
		var p = new Person();
		ok(!p.dance());
	});
	
	test("Person can dance when taught", function () {
		var p = new Person(true);
		ok(p.dance());
	});
	
	module("Subclass");
	
	test("Ninja is an Object", function () {
		var n = new Ninja();
		ok(n instanceof Object);
	});
	
	test("Ninja is a Function", function () {
		var n = new Ninja();
		ok(n instanceof Person);
	});
	
	test("Ninja is a Person", function () {
		var n = new Ninja();
		ok(n instanceof Person);
	});
	
	test("Ninja is a Ninja", function () {
		var n = new Ninja();
		ok(n instanceof Ninja);
	});
	
	test("Ninja can swing a sword", function () {
		var n = new Ninja();
		ok(n.swingSword());
	});
	
	test("Ninja can't dance", function () {
		var n = new Ninja();
		ok(!n.dance()); 
	});

	test("Ninja can't dance when taught", function () {
		var n = new Ninja(true);
		ok(!n.dance());
	});
	
});