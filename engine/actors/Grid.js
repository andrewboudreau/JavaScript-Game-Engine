/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */
<<<<<<< HEAD
define(["engine/Actor"], function (Actor) {
=======
define(["engine/actor"], function (Actor) {
>>>>>>> 4611287be5ddb4fcc9b382818b65ae83ba7a6ab7
	"use strict";
	
	var Grid = Actor.inherit({
		init: function (color, spacing) {
			this.spacing = spacing || 20;
			this.color = color || "#CCC";
		},
		render: function (game) {
			var w, v, 
				ctx = game.screen.context,
				canvas = game.screen.canvas,
				hspacing = this.spacing, 
				vspacing = this.spacing,
				color = this.color;
			
			ctx.save();
			ctx.strokeStyle  = this.color;
			
			for (w = 0; w <= canvas.width; w += hspacing) {
				ctx.beginPath();
				ctx.moveTo(w, 0);
				ctx.lineTo(w, canvas.height);
				ctx.stroke();
			}
			
			for (v = 0; v <= canvas.height; v += vspacing) {
				ctx.beginPath();
				ctx.moveTo(0, v);
				ctx.lineTo(canvas.width, v);
				ctx.stroke();
			}
			ctx.restore();
		}
	});
	
	return Grid;
});
