/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define */
define(["engine/CollectionManager"], function (CollectionManager) {
	"use strict";
	
	var TextManager = CollectionManager.inherit({
		init: function () {
			this.$super();
			
			this.xOffset = 0;
			this.yOffset = 0;
			this.padding = 3;
			this.lineHeight = 10;
		},
		
		render: function (game, duration) {
			var ctx = game.screen.context;
			
			this.each(function (item) {
				ctx.font = item.font;
				ctx.fillText(item.text, item.x, item.y);
			});
			
			this.clear();
		},
		
		update: function () {
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
			
			this.items.push({
				text : options.text,
				x : options.x || this.padding,
				y : options.y || this.padding + this.lineHeight,
				font : options.font || "normal 12px sans-serif"
			});
		},
		
		writeLine: function (text) {
			this.yOffset += this.lineHeight + this.padding;
			this.items.push({
				text : text,
				x : this.padding + this.xOffset,
				y : this.yOffset,
				font : "normal 12px sans-serif"
			});
		},
		
		clear: function () {
			this.$super();
			this.xOffset = 0;
			this.yOffset = 0;
		}
		
	});
	
	return TextManager;
});
