/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */
/*global define*/
define(function () {
	"use strict";
	
	var sign = function (number) {
		return (number) ? (number < 0 ? -1 : 1) : 0;
	};
	
	var parseVectorArgumentToArray = function(args) {
		var result = [0, 0];
		
		if (args.length === 2) {
			result[0] = args[0];
			result[1] = args[1];		
		} else if (args.length === 1 && args[0].x && args[0].y) {
			result[0] = args[0].x;
			result[1] = args[0].y;
		} else if (args.length === 1 && args[0][0] && args[0][1]) {
			result[0] = args[0][0];
			result[1] = args[0][1];
		} else {
			throw new "could not parse vector from argument.";
		}
		
		return result;
	};
	
	var vectorPropertyBuilder = function () {
		var defaults = parseVectorArgumentToArray(arguments);
		
		var vector = function () {
				
			if (!arguments.length) {
				return [vector.x, vector.y];
			}
			var v = parseVectorArgumentToArray(arguments);
			vector.x = v[0];
			vector.y = v[1];
			return this;
		};
		
		vector.x = defaults[0] || 0;
		vector.y = defaults[1] || 0;
		
		return vector;
	};
		
	var defaults = {
		rotation: 0,
		drag: 0,
		thresholds: {
			velocity: 10,
			velocitySquared: function () {
				return this.velocity * this.velocity;
			},
			acceleration: 2
		}
	};
	
	var Physics = function (x, y, rotation) {
	
		this.acceleration = vectorPropertyBuilder(0, 0);
		this.drag = vectorPropertyBuilder(defaults.drag, defaults.drag);
		this.force = vectorPropertyBuilder(0, 0);
		this.position = vectorPropertyBuilder(0, 0);
		this.rotation = 0;
		this.velocity = vectorPropertyBuilder(0, 0);
		
		this.thresholds = $.extend(true, {}, defaults.thresholds);
	}
	
	Physics.prototype = {
		applyForce: function () {
			var f = parseVectorArgumentToArray(arguments);
			this.force.x += f[0];
			this.force.y += f[1];
		},
		
		update: function (duration) {
			
			this.velocity.x += this.force.x;
			this.velocity.y += this.force.y;
			this.force(0, 0);
			
			
			if (Math.abs(this.velocity.x) > this.thresholds.velocity) {
				this.velocity.x = sign(this.velocity.x) * this.thresholds.velocity;
			}
			
			if (Math.abs(this.velocity.y) > this.thresholds.velocity) {
				this.velocity.y = sign(this.velocity.y) * this.thresholds.velocity;
			}
			
			this.velocity.x -= sign(this.velocity.x) * this.drag.x;
			this.velocity.y -= sign(this.velocity.y) * this.drag.y;
			
			if (Math.abs(this.velocity.x) <= this.drag.x) {
				this.velocity.x = 0;
			}
			
			if (Math.abs(this.velocity.y) <= this.drag.y) {
				this.velocity.y = 0;
			}
			
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		},
		
		render: function () {
		}
	
	};
	
	return Physics;
});
