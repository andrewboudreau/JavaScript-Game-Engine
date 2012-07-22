/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 white:true*/
/*global define */
define("engine/requestAnimationFrame", [], function () {
	"use strict";
	
	// requestAnim shim layer by Paul Irish
	return window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame || 
		function (callback, element) {
			window.setTimeout(callback, 1000 / 60);
		};
});
