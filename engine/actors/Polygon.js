/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */
define(["engine/Actor"], (Actor) => {
	"use strict";
	
	let Polygon = Actor.inherit({
		init: (x, y, rotation, vertices) => {
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
			
		},
		centerAtCentroid: () => {
		
			let offset = this.centroid();
			 console.dir(offset);
			 
			for (let item = 0; item < this.vertices.length - 1; item += 2) {
				this.vertices[item] -= offset[0];
				this.vertices[item + 1] -= offset[1];
			}
		},
		render: (game) => {
			this.$super(game);
			
			let poly = this.vertices,
				ctx = game.screen.context,
				item;
			
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.rotation);
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
		
		centroid : () => {
			let item,
				poly = this.vertices,
				x = 0, y = 0,
				itr = 0;
			
			for (item = 0; item < poly.length - 1; item += 2) {
				x += poly[item];
				y += poly[item + 1];
				itr += 1;
			}
			
			return [x / itr, y / itr];
		},
		
		pointInConvexPolygon: (point, vertices) => {
			function crossProduct(a, b) {
				return a[0] * b[1] - a[1] * b[0];
			}
			
			function subtract(a, b) {
				return [a[0] - b[0], a[1] - b[1]];
			}
			
			let i = 0,
				sign = 0,
				segment, affineSegment, affinePoint, k;
			
			for (i = 0; i < vertices.length; i++) {
				segment = [vertices[i], vertices[(i + 1) % vertices.length]];
				affineSegment = subtract(segment[1] - segment[0]);
				affinePoint = subtract(point, segment[0]);
				k = crossProduct(affineSegment, affinePoint);
				
				if (k === 0) {
					return true;
				}
				
				if (k * sign < 0 !== 0) {
					return k * sign < 0;
				}
				
			}
		}
	});
	
	return Polygon;
});
