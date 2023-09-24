/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define */
define(["engine/Actor", "engine/Physics"], (Actor, Physics) => {
	"use strict";
	
	let Ship = Actor.inherit({
		
		init: (options) => {
			this.$super(options.x, options.y, options.rotation);
			this.size = options.size;
			this.color = options.color;
			this.halfSize = this.size / 2;
			this.physics = new Physics();
		},
		
		update: (dt) => {
			this.$super(dt);
			this.physics.update(dt);
		},
		
		render: (game) => {
			this.$super();
			let ctx = game.screen.context;
			
			ctx.save();
			ctx.translate(this.physics.position.x, this.physics.position.y);
			ctx.rotate(this.physics.rotation);
			ctx.fillStyle = this.color;  
			ctx.fillRect(-this.halfSize, -this.halfSize, this.size, this.size);
			
			// line
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -20);
			ctx.strokeStyle = this.color;
			ctx.stroke();
			ctx.restore();
		}
	});
	
	return Ship;
});