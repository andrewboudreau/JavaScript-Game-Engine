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
			this.components.each(function (component) {
				this.update.call(component, duration, inputManager, componentManager);
			});
		},
		
		render: function (game, duration) {	
			this.components.each(function (component) {
				this.render.call(component, game, duration);
			});
		}
	});
	
	return Entity;
});
