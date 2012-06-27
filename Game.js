// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame    || 
					window.oRequestAnimationFrame      || 
					window.msRequestAnimationFrame     || 
					function(/* function */ callback, /* DOMElement */ element){
						window.setTimeout(callback, 1000 / 60);
					};
})();

function _Game() {	
	this.canvas = document.getElementById("canvas");
	this.context = this.canvas.getContext("2d");
	this.entities = [];
}

_Game.prototype = {
	canvas: null,
	context: null,
	entities: [],
	renderable: [],
	stop: false,
	
	input : null,
	
	init: function() {
		if (Game.input && Game.input.init) {
			Game.input.init();	
		}
	},
	
	run: function(duration) {
		if(Game.init) {
			Game.init();
			delete Game.init;
		}
		Game.clear();
		
		if( !Game.stop ) {
			Game.update(duration);
		}
		
		Game.render();
		requestAnimFrame(Game.run);
	},
	
	addEntity: function(entity) {
		Game.entities.push(entity);
		if(entity.render) {
			Game.renderable.push(entity);
		}
	},
	
	render: function() {
		for(var i = 0; i < Game.renderable.length; i++) {
			Game.renderable[i].render(Game);
		}
	},
	
	update: function(duration) {
		for(var i = 0; i < Game.entities.length; i++) {
			Game.entities[i].update(duration, Game.input, Game.entities);
		}
	},
	
	clear: function() {
		Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
	}
};

// game singleton
Game = new _Game();
