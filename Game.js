/*jshint white:false, trailing:false, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */

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
	this.entities = [];
	this.context = this.canvas.getContext("2d");
	this.text = [];
}

_Game.prototype = {
	canvas: null,
	context: null,
	input : null,
	initialized: false,
	pause: false,
		
	entities: [],
	renderable: [],
	text: [],
	
	init: function() {
		Game.input.init();	
	},
	
	run: function(duration) {
		if(!Game.initialized) {
			Game.init();
			Game.initialized = true;
		}
		Game.clear();
		
		if( !Game.pause ) {
			Game.update(duration);
		}
		
		Game.render();
		Game.renderText();
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
	},
	
	renderText: function() {
		var i = 0,
			ctx = Game.context,
			options;
			
		for(i = 0; i < Game.text.length; i++) {
			options = Game.text[i];
			ctx.font = options.font;
			ctx.fillText(options.text, options.x, options.y);
		}
		Game.text.length = 0;
	},
	
	writeText: function(options) {
	///<summary>
	/// Utility function to write text to the canvas.
	/// options { text, x, y, font }
	///<summary>
		if( !options || !options.text ) {
			return;
		}
		
		Game.text.push({
			text : options.text,
			x : options.x || 0,
			y : options.y || 0,
			font : options.font || "bold 12px sans-serif"
		});
	},
	
	pointInConvexPolygon: function(point, vertices) {
		function crossProduct(a, b) {
			return a[0]*b[1]-a[1]*b[0];
		}
		
		function subtract(a, b) {
			return [a[0]-b[0], a[1]-b[1]];
		}
		
		var i = 0,
			sign = 0,
			segment, affineSegment, affinePoint, k;
		
		for( i = 0; i < vertices.length; i++ ) {
			segment = [vertices[n], vertices[(n+1)%vertices.length]];
			affineSegment = subtract(segment[1] - segment[0]);
			affinePoint = subtract(point, segment[0]);
			k = crossProduct(affineSegment, affinePoint);
			
			if( k === 0 ) {
				return true;
			}
			
			if( k * sign < 0 !== 0 ) {
				return k * sign < 0;
			}
			
		}
	}
	
};

// game singleton
Game = new _Game();
