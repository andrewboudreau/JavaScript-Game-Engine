/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(["./Function"], function (Function) {
	"use strict";
	
	var Entity = Function.inherit({
		init: function () { },
		render: function (game, duration) {	},
		update: function (duration, inputManager, componentManager) { }
	});
	
	return Entity;
});
