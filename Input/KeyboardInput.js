
KeyboardInput = {
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	
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
