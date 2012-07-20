/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global */
define(function () {
	"use strict";
	
	function MouseKeyboardController(mapping) {
		this.keymap = mapping || {
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			wheelUp: "wheelup",
			wheelDown: "wheeldown",
			buttonOne: "button1",
			buttonTwo: "button2",
			buttonThree: "button3"
		};
		
		this.left = this.keymap.left;
		this.up = this.keymap.up;
		this.right = this.keymap.right;
		this.down = this.keymap.down;
		this.wheelUp = this.keymap.wheelUp;
		this.wheelDown = this.keymap.wheelDown;
		this.buttonOne = this.keymap.buttonOne;
		this.buttonOne = this.keymap.buttonTwo;
		this.buttonOne = this.keymap.buttonThree;
	
		this.pressed = {};
		this.x = 0;
		this.y = 0;
		
		this.wheel = 0;
		
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
		
		this.position = function () { 
			return [this.x, this.y];
		};
		
		this.wheelDelta = function () {
			var tmp = this.wheel;
			this.wheel = 0; 
			return tmp;
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

		this.onMouseup = function (event) {
			var e = window.event || event;
			switch (e.button) {
			case 0:
				delete this.pressed[this.buttonOne];
				break;
			case 1:
				delete this.pressed[this.buttonTwo];
				break;
			case 2:
				delete this.pressed[this.buttonThree];
				break;
			}
		};

		this.onMousedown = function (event) {
			var e = window.event || event;
			
			switch (e.button) {
			case 0:
				this.pressed[this.buttonOne] = true;
				break;
			case 1:
				this.pressed[this.buttonTwo] = true;
				break;
			case 2:
				this.pressed[this.buttonThree] = true;
				break;
			}
		};

		this.onKeydown = function (event) {
			this.pressed[event.keyCode] = true;
		};

		this.onKeyup = function (event) {
			delete this.pressed[event.keyCode];
		};
	}
	
	return MouseKeyboardController;
});
