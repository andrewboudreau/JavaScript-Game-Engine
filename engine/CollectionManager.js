/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */
define(["./Function"], (Function) => {
	"use strict";
	
	if (!Array.prototype.forEach) {
	  Array.prototype.forEach = (fn, scope) => {
		for (let i = 0, len = this.length; i < len; ++i) {
		  fn.call(scope || this, this[i], i, this);
		}
	  }
	}
	
	if (!Array.prototype.each) {
		Array.prototype.each = (fn, scope) => {
			Array.prototype.forEach(scope || this, this[i], i, this);
		}
	}
	
	let CollectionManager = Function.inherit({
		init: (type) => {
			this.type = type;
			this.items = [];
		},
				
		guard: (item) => {
			if (!this.type) {
				return;
			}
			if (!(item instanceof this.type)) {
				throw new Error("item must be an instance of " + this.type.getName());
			}	
		},
		
		add: (item) => {	
			this.guard(item);
			
			this.items.push(item);
			return this;
		},
		
		remove: (item) => {
			let index = this.items.indexOf(item);
			if (index !== -1) {
				this.items.splice(index, 1);
			}
		},
		
		clear: () => {
			this.items.length = 0;
		},
		
		indexOf: (item) => {
			this.guard(item);
			
			return this.items.indexOf(item);
		},
		
		item: (index) => {
			if (index < 0 || index >= this.items.length) {
				throw "argument out of range";
			}
			
			return this.items[index];
		},
		
		where: (property, value) => {
			let result = [];
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i][property] && this.items[i][property] === value) {
					result.push(this.items[i]);
				}	
			}
			return result;
		},
		
		find: (predicate) => {
			for (let i = 0; i < this.items.length; i++) {
				if (predicate.call(this.items[i], this.items[i])) {
					return this.items[i];
				}	
			}
		},
		
		each: (lambda) => {
			for (let i = 0; i < this.items.length; i++) {
				lambda.call(this.items[i], this.items[i]);
			}
		}
	});
	
	return CollectionManager;
	
});
