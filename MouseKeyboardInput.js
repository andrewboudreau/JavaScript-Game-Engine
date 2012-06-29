
MouseKeyboardInput = {
	
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	leftButton: 1,
	rightButton: 2,
	x: 0,
	y: 0,
	position: function() { return [this.x, this.y] },
	wheel: 0,
	wheelDelta: function() {
		var tmp = this.wheel;
		this.wheel = 0; 
		return tmp;
	},
	
	onScreen: false,
	pressed: {},

	init: function() {
		var self = this;
				
		window.addEventListener('keyup', function(event) { 
			self.onKeyup(event); 
		}, false);
		
		window.addEventListener('keydown', function(event) { 
			self.onKeydown(event); 
		}, false);
		
		window.addEventListener('mousemove', function(event) { 
			self.onMousemove(event); 
		}, false);
		
		window.addEventListener('mousewheel', function(event) { 
			self.onMousewheel(event); 
		}, false);
		
		window.addEventListener('mousedown', function(event) { 
			self.onMousedown(event); 
		}, false);
		
		window.addEventListener('mouseup', function(event) { 
			self.onMouseup(event); 
		}, false);
		
	},
	
	findPos: function(obj) {
		var curleft = 0, curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return [ curleft, curtop ];
		}
		return undefined;
	},

	isPressed: function(keyCode) {
		return this.pressed[keyCode];
	},

	onMousemove: function(event) {
		var pos = this.findPos(Game.canvas);
		this.x = event.pageX - pos[0];
		this.y = event.pageY - pos[1];
	},

	onMousewheel : function(event) { 
		var e = window.event || event;
		this.wheel += Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));  
	},

	onMousedown: function(event) {
		delete this.pressed[this.leftButton];
	},

	onMouseup: function(event) {
		this.pressed[this.leftButton] = true;
	},

	onKeydown: function(event) {
		this.pressed[event.keyCode] = true;
	},

	onKeyup: function(event) {
		delete this.pressed[event.keyCode];
	}
	
};
