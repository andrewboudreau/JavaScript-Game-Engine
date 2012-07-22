/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require*/
require.config({
	baseUrl: "",
	paths: {
		"engine": "../../engine"
    }
});

// Start the main app logic.
require(["engine/Actor"], function (Actor) {
	"use strict";
	var context = document.getElementById("canvas").getContext("2d");
	
	// define a dot actor
	var Dot = Actor.inherit({
		init: function (options) {
			this.$super(options.x, options.y, options.rotation);
			this.size = options.size;
			this.halfSize = this.size / 2;
		},
		render: function (game) {			
			var ctx = game.context;
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.rotation);
			ctx.fillStyle = "orange";  
			ctx.fillRect(-this.halfSize, -this.halfSize, this.size, this.size);  
			ctx.restore();		
		}
	});
	
	// create a dot instance
	var dot = new Dot({
		x: 50,
		y: 50,
		rotation: 30,
		size: 40
	});
	
	// render the dot
	dot.render({context: context});
});
