/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */

/*global Class */

/// <summary>
/// The most basic managed object in the game engine.
/// </summary>
var Entity = Class.extend({
	init: function (position, rotation) {
		"use strict";
		this.position = position || [0, 0];
		this.rotation = rotation || 0;
	},
	update: function () { 
		"use strict";
		return; 
	}	
});
