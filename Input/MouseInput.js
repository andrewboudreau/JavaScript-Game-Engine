
MouseInput = {
	LeftButton: 1,
	RightButton: 2,
	x: 0,
	y: 0,
	onScreen: false,
	
	pressed: {},

	init: function() {
		var self = this;
		window.addEventListener('mousemove', function(event) { 
			self.onMousemove(event); 
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
	}

	isPressed: function(keyCode) {
		return this.pressed[keyCode];
	},

	onMousemove: function(event) {
		var pos = findPos(Game.canvas);
    this.x = event.pageX - pos[0];
    this.y = event.pageY - pos[1];
	},

	onMousedown: function(event) {
		delete this.pressed[this.LeftButton];
	}
	
	onMouseup: function(event) {
		delete this.pressed[this.LeftButton];
	}

};
