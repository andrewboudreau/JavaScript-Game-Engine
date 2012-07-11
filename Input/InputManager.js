/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global Game */

(function (scope) {
	"use strict";
	
	this.pressed = {};
	
	this.left = 37;
	this.up = 38;
	this.right = 39;
	this.down = 40;
	this.buttonOne = 1;
	this.buttonTwo = 2;
	
	this.x = 0;
	this.y = 0;
	
	this.position = function () { 
		return [this.x, this.y];
	};
	
	this.onScreen = false;
	this.wheel = 0;
	this.wheelDelta = function () {
		// wheel has to be reset after it's read.
		var tmp = this.wheel;
		this.wheel = 0; 
		return tmp;
	};
	
	this.init = function () {
		var self = this;
				
		window.addEventListener('keyup', function (event) { 
			self.onKeyup(event); 
		}, false);
		
		window.addEventListener('keydown', function (event) { 
			self.onKeydown(event); 
		}, false);
		
		window.addEventListener('mousemove', function (event) { 
			self.onMousemove(event); 
		}, false);
		
		window.addEventListener('mousewheel', function (event) { 
			self.onMousewheel(event); 
		}, false);
		
		window.addEventListener('mousedown', function (event) { 
			self.onMousedown(event); 
		}, false);
		
		window.addEventListener('mouseup', function (event) { 
			self.onMouseup(event); 
		}, false);
	};
	
	this.findPos = function (obj) {
		var curleft = 0, curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while ((obj = obj.offsetParent) !== null);
			return [ curleft, curtop ];
		}
		return undefined;
	};

	this.isPressed = function (keyCode) {
		return this.pressed[keyCode];
	};

	this.onMousemove = function (event) {
		var pos = this.findPos(Game.canvas);
		this.y = event.pageX - pos[0];
		this.x = event.pageY - pos[1];
	};

	this.onMousewheel = function (event) { 
		var e = window.event || event;
		this.wheel += Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));  
	};

	this.onMousedown = function (event) {
		delete this.pressed[this.leftButton];
	};

	this.onMouseup = function (event) {
		this.pressed[this.leftButton] = true;
	};

	this.onKeydown = function (event) {
		this.pressed[event.keyCode] = true;
	};

	this.onKeyup = function (event) {
		delete this.pressed[event.keyCode];
	};
}(Game));
