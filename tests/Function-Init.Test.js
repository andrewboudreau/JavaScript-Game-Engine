/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require:true, test:true, ok:true */
require.config({
	paths: {
		"engine": "../engine"
    }
});

require(["engine/Function"], function (Function) {
	"use strict";
	var count = 0;
	
	var Foo = Function.inherit({
		init: function () {
			count += 1;
		},
		doWork: function () {
		}
	});
	
	module("init");
	
	test("call init once", 1, function () {
		var instance = new Foo();
		equal(count, 1, "called once");
	});
	
	
});