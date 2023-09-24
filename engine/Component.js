/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(["./Function"], (Function) => {
	/// <summary>
	/// Base managed object of the engine.
	/// </summary>
	"use strict";
	
	let Component = Function.inherit({
		init: () => { },
		render: (game, duration) => {	},
		update: (duration, inputManager, componentManager) => { }
	});
	
	return Component;
});
