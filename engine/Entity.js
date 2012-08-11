/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(["./Function", "./components/CollectionManager", "./Component"], function (Function, CollectionManager, Component) {
	"use strict";
	
	var Entity = Function.inherit({
		init: function () {
			this.components = new CollectionManager(Component, "components");
			
		},
		add: function (component) {
			this.components.add(component);
		},
		
		render: function (game, duration) {	},
		update: function (duration, inputManager, componentManager) { }
	});
	
	return Entity;
});
