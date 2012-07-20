/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global Entity */
define("engine/Entity", function () {
	"use strict";
	
	return Entity.extend({
		init: function (ctx) {
			this.textBuffer = [];
			this.context = ctx;
		},
		
		render: function (game, duration) {
			var i = 0,
				ctx = this.context || game.context,
				options;	
			for (i = 0; i < this.textBuffer.length; i++) {
				options = this.textBuffer[i];
				ctx.font = options.font;
				ctx.fillText(options.text, options.x, options.y);
			}
			this.textBuffer.length = 0;
		},
		
		writeText: function (options) {
		///<summary>
		/// Utility function to write text to the canvas.
		/// options { text, x, y, font }
		///<summary>
			if (typeof options === "string") {
				options = { text: options };
			}
			if (!options || !options.text) {
				return;
			}
			
			this.textBuffer.push({
				text : options.text,
				x : options.x || 0,
				y : options.y || 0,
				font : options.font || "bold 12px sans-serif"
			});
		},
		
		clear: function() {
			this.textBuffer.length = 0;
		}
	});
});