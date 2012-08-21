/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */
/*global define*/
define(function () {
	"use strict";
	
	var sign = function (number) {
		return (number) ? (number < 0 ? -1 : 1) : 0;
	};
	
	var parseVectorArgumentToArray = function(args) {
		if (args.length === 2) {
			return [args[0], args[1]];		
		} else if (args.length === 1 && args[0].x && args[0].y) {
			return [args[0].x, args[0].y];
		} else if (args.length === 1 && args[0][0] && args[0][1]) {
			return [args[0][0], args[0][1]];
		}
		throw new "could not parse vector from argument.";
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
			acceleration: 2
		}
	};
	
	var Physics = function (x, y, rotation) {
		var self = this;
		
		this.mag = 0;
		this.animationStartTime = 0;
		this.timeDelta = 0;
		this.rotation = 0;
		
		// vector based properties
		$(['acceleration', 'drag', 'force', 'position', 'velocity']).each(function () {
			self[this] = vectorPropertyBuilder(0, 0);
		});
		
		this.thresholds = $.extend(true, {}, defaults.thresholds);
	}
	
	Physics.prototype = {
		applyForce: function () {
			var f = parseVectorArgumentToArray(arguments);
			this.acceleration.x += f[0];
			this.acceleration.y += f[1];
		},
		
		update: function (dt) {
			this.timeDelta = dt;
			this.mag = Math.pow(this.velocity.x + this.acceleration.x, 2) + Math.pow(this.velocity.y + this.force.y, 2);
			
			// forces
			this.acceleration.y += 1;
			this.velocity.x += this.acceleration.x;
			this.velocity.y += this.acceleration.y;
			this.acceleration(0, 0);
			
			// drag
			this.velocity.x -= sign(this.velocity.x) * this.drag.x;
			this.velocity.y -= sign(this.velocity.y) * this.drag.y;
			
			if (Math.abs(this.velocity.x) <= this.drag.x) {
				this.velocity.x = 0;
			}
			
			if (Math.abs(this.velocity.y) <= this.drag.y) {
				this.velocity.y = 0;
			}
			
			// movement
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		},
		
		render: function () {
		}
	
	};
	
	return Physics;
});
