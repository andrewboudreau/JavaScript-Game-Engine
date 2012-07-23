/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */
define(["engine/Actor"], function (Actor) {
	"use strict";
	
	var Polygon = Actor.inherit({
		init: function (x, y, rotation, vertices, update, render) {
			this.$super(x, y, rotation);
			
			this.scale = 1;
			this.color = "blue";
			
			this.vertices = vertices || [
				113, 283, 
				70, 156, 
				180, 70, 
				290, 156, 
				250, 283
			];
			
			 var offset = this.centroid();
			 console.dir(offset);
			 
			for (var item = 0; item < this.vertices.length - 1; item += 2) {
				//this.vertices[item] -= offset[0];
				//this.vertices[item + 1] -= offset[1];
			}
			if (update) {
				this.update = update;
			}
			
			if (render) {
				this.render = render;
			}
		},
		
		render: function (game) {
			this.$super(game);
			
			var poly = this.vertices,
				ctx = game.context,
				item;
			
			ctx.save();
			//ctx.translate(this.x, this.y);
			//ctx.rotate(this.rotation);
			ctx.fillStyle = this.color;
			ctx.scale(this.scale, this.scale);	
			
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
	
	return Polygon;
});
