/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */
/*global Class */
define(["Class"], function (Class) {
	/// <summary>
	/// The most basic managed object in the game engine.
	/// </summary>
	"use strict";
	
	return Class.extend({
		init: function (position, rotation) {
			this.position = position || [0, 0];
			this.rotation = rotation || 0;
		},
		update: function () {
			return; 
		}
	});	   
});
