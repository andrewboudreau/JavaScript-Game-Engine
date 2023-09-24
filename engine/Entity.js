/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(["./Function", "./CollectionManager", "./Component"], 
(Function, CollectionManager, Component) => {
	"use strict";
	
	let Entity = Function.inherit({
		init: () => {
			this.components = new CollectionManager(Object, "components");
		},
		
		add: (component) => {
			this.components.add(component);
		},
		
		update: (duration, inputManager, componentManager) => { 
			this.components.each((component) => {
				this.update.call(component, duration, inputManager, componentManager);
			});
		},
		
		render: (game, duration) => {	
			this.components.each((component) => {
				this.render.call(component, game, duration);
			});
		}
	});
	
	return Entity;
});
