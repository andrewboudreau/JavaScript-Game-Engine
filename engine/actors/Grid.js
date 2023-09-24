/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */

define(["engine/Actor"], (Actor) => {
	"use strict";
	
	let Grid = Actor.inherit({
		init: (color, spacing) => {
			this.$super();
			this.spacing = spacing || 20;
			this.color = color || "#CCC";
		},
		render: (game, duration) => {
			let w, v, 
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
			this.$super(game, duration);
		}
	});
	
	return Grid;
});
