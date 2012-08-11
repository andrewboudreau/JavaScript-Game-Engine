/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */
define(["./Function"], function (Function) {
	"use strict";
	
	var CollectionManager = Function.inherit({
		init: function (type) {
			this.type = type;
			this.items = [];
		},
				
		guard: function (item) {
			if (!this.type) {
				return;
			}
			if (!(item instanceof this.type)) {
				throw new Error("item must be an instance of " + this.type.getName());
			}	
		},
		
		add: function (item) {	
			this.guard(item);
			
			this.items.push(item);
			return this;
		},
		
		remove: function (item) {
			var index = this.items.indexOf(item);
			if (index !== -1) {
				this.items.splice(index, 1);
			}
		},
		
		clear: function () {
			this.items.length = 0;
		},
		
		indexOf: function (item) {
			this.guard(item);
			
			return this.items.indexOf(item);
		},
		
		item: function (index) {
			if (index < 0 || index >= this.items.length) {
				throw "argument out of range";
			}
			
			return this.items[index];
		},
	
		each: function (lambda) {
			for (var i = 0; i < this.items.length; i++) {
				lambda.call(this.items[i], this.items[i]);
			}
		}
	});
	
	return CollectionManager;
	
});
