/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */
/*global define*/
define(["./Entity"], function (Entity) {
	/// <summary>
	/// Actors are components that exists in a scene. They have a position and a rotation.
	/// </summary>
	"use strict";
	
	var Actor = Entity.inherit({
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
		},
	});
	
	return Actor;
});
