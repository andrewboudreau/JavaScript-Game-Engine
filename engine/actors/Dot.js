/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */
define(["engine/Entity", "engine/Physics"], (Entity, Physics) => {
	"use strict";
	
	let Dot = Entity.inherit({
		
		init: (options) => {
			this.$super();
			this.size = options.size || 10;
			this.color = options.color;
			this.halfSize = this.size / 2;
			this.physics = new Physics(options);
		},
		
		render: (game) => {			
			this.$super(game);
			let ctx = game.screen.context;
			
			ctx.save();
			ctx.translate(this.physics.position.x, this.physics.position.y);
			ctx.rotate(this.physics.rotation);
			ctx.fillStyle = this.color;  
			ctx.fillRect(-this.halfSize, -this.halfSize, this.size, this.size);  
			ctx.restore();		
		},
		update: function(dt) {
			this.$super(dt);
			this.physics.update(dt);
		}
	});
	
	return Dot;
});