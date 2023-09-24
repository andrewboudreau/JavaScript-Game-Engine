/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:true */
/*global define*/
define(["jquery", "engine/Function"], 
	($, Function) => {
		"use strict";
		
		let Screen = Function.inherit({
			init: (canvas, context) => {
				let self = this;
				
				this.canvas = canvas || this.createCanvas();
				this.context = context || this.canvas.getContext("2d");
				this.fullscreen();
			},
			
			fullscreen: () => {
				let body = $(document);
				this.width = body.width();
				this.height = body.height();
				
				$(this.canvas).attr({
					height: this.height - 7,
					width: this.width - 2				
				});
			},
			
			createCanvas: () => {				
				return $("<canvas>")
					.width(this.width)
					.height(this.height)
					.appendTo("body")[0];
			},
			
			clear: () => {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}
		});
		
		return Screen;
	}
);