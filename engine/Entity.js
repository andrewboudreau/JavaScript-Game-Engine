/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(["./Function", "./CollectionManager", "./Component"], 
function (Function, CollectionManager, Component) {
	"use strict";
	
	var Entity = Function.inherit({
		init: function () {
			this.components = new CollectionManager(Object, "components");
		},
		
		add: function (component) {
			this.components.add(component);
		},
		
		update: function (duration, inputManager, componentManager) { 
			var self = this;
			this.components.each(function () {
				this.update.call(self, duration, inputManager, componentManager);
			});
		},
		
		render: function (game, duration) {	
			var self = this;
			this.components.each(function () {
				this.render.call(self, game, duration);
			});
		}
	});
	
	return Entity;
});
