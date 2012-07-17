/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global Entity */
var Grid = Entity.extend({
	init: function (spacing) {
		"use strict";
		this.spacing = spacing || 20;
	},
	update: function (duration, inputManager, entityManager) {
		"use strict";
	},
	render: function (game) {
		"use strict";
		var w, v, 
			ctx = game.context,
			hspacing = this.spacing, 
			vspacing = this.spacing;
		
		ctx.save();
		for (w = 0; w <= game.canvas.width; w += hspacing) {
			ctx.beginPath();
			ctx.moveTo(w, 0);
			ctx.lineTo(w, game.canvas.height);
			ctx.stroke();
		}
		
		for (v = 0; v <= game.canvas.height; v += vspacing) {
			ctx.beginPath();
			ctx.moveTo(0, v);
			ctx.lineTo(game.canvas.width, v);
			ctx.stroke();
		}
		ctx.restore();
	}
});
