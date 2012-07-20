define(function () {
	// requestAnim shim layer by Paul Irish
	return (function () {
		"use strict";
		return window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame || 
			function (callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();
});