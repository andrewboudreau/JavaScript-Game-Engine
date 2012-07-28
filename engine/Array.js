/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(function () {
	"use strict";
	
	var guard = function (vector) {
		if (typeof vector.length === 'undefined' || vector.length !== 2) {
			throw new Error("2d array expected");
		}
	},
	
	guardScalar = function (scalar) {
		if (isNaN(scalar)) {
			throw new Error("scalar expected");
		}
	},
	
	buildGuardedMethod = function (props) {
		Object.defineProperty(Array.prototype, props.name, {
			value: function (param) {
				props.guardThis(this);
				props.guardParameter(param);
				
				return props.fn.call(this, param);
			},
			writable: false,
			configurable: false
		});
	},
	
	buildScalarMethod = function (name, fn) {
		buildGuardedMethod({
			name: name,
			guardThis: guard,
			guardParameter: guardScalar,
			fn: fn
		});
	},
	
	buildVectorMethod = function (name, fn) {
		buildGuardedMethod({
			name: name,
			guardThis: guard,
			guardParameter: guard,
			fn: fn
		});
	},
	
	buildParameterlessMethod = function (name, fn) {
		buildGuardedMethod({
			name: name,
			guardThis: guard,
			guardParameter: function () { return true; },
			fn: fn
		});
	};
	
	buildVectorMethod("add", function (vector) {
		return [this[0] + vector[0], this[1] + vector[1]];
	});	
	
	buildVectorMethod("subtract", function (vector) {
		return [this[0] - vector[0], this[1] - vector[1]];
	});
	
	buildScalarMethod("multiply", function (scalar) {
		return [this[0] * scalar, this[1] * scalar];
	});
		buildScalarMethod("divide", function (scalar) {
		return [this[0] / scalar, this[1] / scalar];
	});
	
	buildVectorMethod("dot", function (vector) {
		return this[0] * vector[0] + this[1] * vector[1];
	});
	
	buildParameterlessMethod("vectorLengthSquared", function () {
		return [this[0] * this[0] + this[1] * this[1]];
	});
	
	buildParameterlessMethod("vectorLength", function () {
		return Math.sqrt(this.vectorLengthSquared());
	});
	
	buildVectorMethod("normalize", function () {
		return this.divide(this.vectorLength());
	});
	
	buildVectorMethod("distanceSquared", function (vector) {
		return (vector[0] - this[0]) * (vector[0] - this[0]) + (vector[1] - this[1]) *  (vector[1] - this[1]);
	});
	
	buildVectorMethod("distance", function () {
		return this.divide(this.vectorLength());
	});
	
	return Array;
});
