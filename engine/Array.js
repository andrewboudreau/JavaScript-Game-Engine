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
	
	defineArrayProperty = function (props) {
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
	
	defineScalarFunction = function (name, fn) {
		defineArrayProperty({
			name: name,
			guardThis: guard,
			guardParameter: guardScalar,
			fn: fn
		});
	},
	
	defineVectorFunction = function (name, fn) {
		defineArrayProperty({
			name: name,
			guardThis: guard,
			guardParameter: guard,
			fn: fn
		});
	},
	
	defineParameterlessFunction = function (name, fn) {
		defineArrayProperty({
			name: name,
			guardThis: guard,
			guardParameter: function () { return true; },
			fn: fn
		});
	};
	
	defineVectorFunction("add", function (vector) {
		return [this[0] + vector[0], this[1] + vector[1]];
	});	
	
	defineVectorFunction("subtract", function (vector) {
		return [this[0] - vector[0], this[1] - vector[1]];
	});
	
	defineScalarFunction("multiply", function (scalar) {
		return [this[0] * scalar, this[1] * scalar];
	});
		defineScalarFunction("divide", function (scalar) {
		return [this[0] / scalar, this[1] / scalar];
	});
	
	defineVectorFunction("dot", function (vector) {
		return this[0] * vector[0] + this[1] * vector[1];
	});
	
	defineParameterlessFunction("vectorLengthSquared", function () {
		return [this[0] * this[0] + this[1] * this[1]];
	});
	
	defineParameterlessFunction("vectorLength", function () {
		return Math.sqrt(this.vectorLengthSquared());
	});
	
	defineVectorFunction("normalize", function () {
		return this.divide(this.vectorLength());
	});
	
	defineVectorFunction("distanceSquared", function (vector) {
		return (vector[0] - this[0]) * (vector[0] - this[0]) + (vector[1] - this[1]) *  (vector[1] - this[1]);
	});
	
	defineVectorFunction("distance", function () {
		return this.divide(this.vectorLength());
	});
	
	return Array;
});
