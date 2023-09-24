/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(() => {
	"use strict";
	
	let guard = (vector) => {
		if (typeof vector.length === 'undefined' || vector.length !== 2) {
			throw new Error("2d array expected");
		}
	},
	
	guardScalar = (scalar) => {
		if (isNaN(scalar)) {
			throw new Error("scalar expected");
		}
	},
	
	defineArrayProperty = (props) => {
		Object.defineProperty(Array.prototype, props.name, {
			value: (param) => {
				props.guardThis(this);
				props.guardParameter(param);
				
				return props.fn.call(this, param);
			},
			writable: false,
			configurable: false
		});
	},
	
	defineScalarFunction = (name, fn) => {
		defineArrayProperty({
			name: name,
			guardThis: guard,
			guardParameter: guardScalar,
			fn: fn
		});
	},
	
	defineVectorFunction = (name, fn) => {
		defineArrayProperty({
			name: name,
			guardThis: guard,
			guardParameter: guard,
			fn: fn
		});
	},
	
	defineParameterlessFunction = (name, fn) => {
		defineArrayProperty({
			name: name,
			guardThis: guard,
			guardParameter: () => { return true; },
			fn: fn
		});
	};
	
	defineVectorFunction("add", (vector) => {
		return [this[0] + vector[0], this[1] + vector[1]];
	});	
	
	defineVectorFunction("subtract", (vector) => {
		return [this[0] - vector[0], this[1] - vector[1]];
	});
	
	defineScalarFunction("multiply", (scalar) => {
		return [this[0] * scalar, this[1] * scalar];
	});
	
	defineScalarFunction("divide", (scalar) => {
		return [this[0] / scalar, this[1] / scalar];
	});
	
	defineVectorFunction("dot", (vector) => {
		return this[0] * vector[0] + this[1] * vector[1];
	});
	
	defineParameterlessFunction("vectorLengthSquared", () => {
		return [this[0] * this[0] + this[1] * this[1]];
	});
	
	defineParameterlessFunction("vectorLength", () => {
		return Math.sqrt(this.vectorLengthSquared());
	});
	
	defineVectorFunction("normalize", () => {
		return this.divide(this.vectorLength());
	});
	
	defineVectorFunction("distanceSquared", (vector) => {
		return (vector[0] - this[0]) * (vector[0] - this[0]) + (vector[1] - this[1]) *  (vector[1] - this[1]);
	});
	
	defineVectorFunction("distance", () => {
		return this.divide(this.vectorLength());
	});
	
	return Array;
});
