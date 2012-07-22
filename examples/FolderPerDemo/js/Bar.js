/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals define, console */
define(["./Foo"], 
	function (Foo) {
		"use strict";
		
		var Bar = Foo.inherit({
			init: function (str) {
				this.$super(str);
			},
			say: function (override) {
				this.$super();
				console.log("Bar: hello, " + override);
			}
		});
		
		return Bar;
	}
);