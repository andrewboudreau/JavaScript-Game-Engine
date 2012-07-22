/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals define, console */

define(["engine/Function"], 
	function (Function) {
		"use strict";
		
		var Foo = Function.inherit({
			init: function (name) {
				this.name = name;
			},
			say: function () {
				if (this.name) {
					console.log("Foo says: Hello, " + this.name);
				} else {
					console.log("Foo says: Hello, dev!");
				}
			}
		});
		
		return Foo;
	}
);