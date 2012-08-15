/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */
/*global define*/
define(function () {
	"use strict";
	
	var sign = function (number) {
		return (number) ? (number < 0 ? -1 : 1) : 0;
	};
	
	var vectorPropertyBuilder = function () {
		var vector = function () {
			if (arguments.length === 2) {
				vector.x = arguments[0];
				vector.y = arguments[1];
				
			} else if (arguments.length === 1 && arguments[0] instanceof Array) {
				vector.x = arguments[0][0];
				vector.y = arguments[0][1];
				
			} else if (arguments.length === 1 && arguments[0] instanceof Object) {
				vector.x = arguments[0].x;
				vector.y = arguments[0].y;	
				
			} else if (arguments.length === 0) {
				return [vector.x, vector.y];
			}
			return this;
		};
		vector.x = 0;
		vector.y = 0;
		
		return vector;
	};
		
	var defaults = {
		rotation: 0,
		drag: 0.005,
		thresholds: {
			velocity: 10,
			acceleration: 2
		}
	};
	
	var Physics = function (x, y, rotation) {
	
		this.position = vectorPropertyBuilder();
		this.velocity = vectorPropertyBuilder();
		this.acceleration = vectorPropertyBuilder();
		this.drag = vectorPropertyBuilder();
		
		this.rotation = 0;
		
		this.thresholds = {
			velocity: 10,
			acceleration: 2
		};
	}
	
	Physics.prototype = {
		update: function (duration) {
		
			if (Math.abs(this.velocity.x) <= this.thresholds.velocity) {
				this.velocity.x += this.acceleration.x;
				this.velocity.y += this.acceleration.y;
			}
			
			this.velocity.x += sign(this.velocity.x) * this.drag.x;
			this.velocity.y += sign(this.velocity.x) * this.drag.y;
			
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		},
		
		render: function () {
		}
	
	};
	
	return Physics;
});
