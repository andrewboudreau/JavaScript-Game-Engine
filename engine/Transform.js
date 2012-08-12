/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(["./Function", "./CollectionManager", "./Component"], function (Function, CollectionManager, Component) {
	"use strict";
	
	var Transform = Function.inherit({
		init: function (x, y, rotation) {
			
			if (typeof x === 'undefined') {
				x = 0;
			}
			if (typeof y === 'undefined') {
				y = 0;
			}
			if (typeof rotation === 'undefined') {
				rotation = 0;
			}
			
			this.x = x;
			this.y = y;
			this.rotation = rotation;
		},
		position: function () {
			return [this.x, this.y];
		}
	});
	
	return Transform;
});

