/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */
/*global define*/
define(["./Entity", "./Physics"], function (Entity, Physics) {
	/// <summary>
	/// Actors are components that exists in a scene. They have a position and a rotation.
	/// </summary>
	"use strict";
	
	var Actor = Entity.inherit({
		init: function (x, y, rotation) {
			this.physics = new Physics();
			
			this.physics.position.x = x;
			this.physics.position.y = y;
			this.physics.protation = rotation;
		},
		position: function () {
			return this.physics.position();
		}
	});
	
	return Actor;
});
