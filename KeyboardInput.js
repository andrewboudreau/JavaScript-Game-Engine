
KeyboardInput = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	
	pressed: {},

	init: function() {
		var self = this;
		window.addEventListener('keyup', function(event) { 
			self.onKeyup(event); 
		}, false);
		
		window.addEventListener('keydown', function(event) { 
			self.onKeydown(event); 
		}, false);
		
	},
	
	isPressed: function(keyCode) {
		return this.pressed[keyCode];
	},

	onKeydown: function(event) {
		this.pressed[event.keyCode] = true;
	},

	onKeyup: function(event) {
		delete this.pressed[event.keyCode];
	}
};
