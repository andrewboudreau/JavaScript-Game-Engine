/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global Entity */
var Polygon = Entity.extend({
	init: function (position, rotation, vertices, update, render) {
		"use strict";
		this._super(position, rotation);
		//110 wide
		//106.5 tall
		
		this.vertices = vertices || [
			113, 283, 
			70, 156, 
			180, 70, 
			290, 156, 
			250, 283
		];
		/* var offset = this.centroid();
		for (var item = 0; item < this.vertices.length - 1; item += 2) {
			this.vertices[item] -= offset[0];
			this.vertices[item] -= offset[1];
		} */
		
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
		ctx.rotate(this.rotation);
		ctx.fillStyle = '#f00';
		
		ctx.beginPath();
		ctx.moveTo(poly[0], poly[1]);
		for (item = 2; item < poly.length - 1; item += 2) {
			ctx.lineTo(poly[item], poly[item + 1]);
		}
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	},
	
	centroid : function () {
		var item,
			poly = this.vertices,
			x = 0, y = 0,
			itr = 0;
		
		for (item = 0; item < poly.length - 1; item += 2) {
			x += poly[item];
			y += poly[item + 1];
			itr += 1;
		}
		
		return [x / itr, y / itr];
	}
});
