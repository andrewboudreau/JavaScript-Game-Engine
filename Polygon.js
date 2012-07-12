/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global Entity */
var Polygon = Entity.extend({
	init: function (position, rotation, vertices, update, render) {
		"use strict";
		this._super(position, rotation);
		
		this.vertices = vertices || [ 5,5, 100,50, 50,100, 10,90 ]; 
		if (update) {
			this.update = update;
		}
		
		if (render) {
			this.render = render;
		}
	},
	update: function (duration, inputManager, entityManager) {
		"use strict";
		return; 
	},	
	render: function (game) {
		"use strict";
		var poly = this.vertices,
			ctx = game.context,
			item;
		
		ctx.save();	
		ctx.translate(this.position[0], this.position[1]);
		ctx.fillStyle = '#f00';
		ctx.beginPath();
		ctx.moveTo(poly[0], poly[1]);
		for (item = 2; item < poly.length - 1; item += 2) {
			ctx.lineTo(poly[item], poly[item + 1]);
		}
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
});
