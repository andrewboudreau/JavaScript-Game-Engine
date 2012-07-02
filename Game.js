/*jshint white:false, trailing:false, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50 */
(function(scope) {
	
	function _Game() {	
		this.canvas = document.getElementById("canvas");
		this.context = this.canvas.getContext("2d");
		this.text = [];
	}

	_Game.prototype = {
		canvas: null,
		context: null,
		
		EntityManager: null,
		InputManager: null,
		textBuffer: [],
		
		initialized: false,
		paused: false,
		exit: false,
		
		init: function() {
			Game.InputManager.init();
		},
		
		run: function(duration) {
		/// <summary>
		/// application loop, request animation frame.  
		/// </summary>
		
			if(!Game.initialized) {
				Game.init();
				Game.initialized = true;
			}
			
			Game.gameLoop(duration, Game, Game.InputManager, Game.EntityManager);
			
			if(!Game.exit) {
				requestAnimFrame(Game.run);
			}
		},
		
		gameLoop : function(duration, game, inputManager, entityManager) {
		/// <summary>
		/// Internal game loop, all context passed in externally making this method testable.
		/// </summary>
		
			game.clear();
			
			entityManager.each(function(entity) {
				if( !game.paused ) {
					entity.update(duration, inputManager, entityManager);
				}
				if( entity.render ) {
					entity.render(game);			
				}
			});
			game.renderText();
		},
		
		clear: function() {
			Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
		},
		
		renderText: function(duration, game) {
			var i = 0,
				ctx = Game.context,
				options;
				
			for(i = 0; i < Game.textBuffer.length; i++) {
				options = Game.textBuffer[i];
				ctx.font = options.font;
				ctx.fillText(options.text, options.x, options.y);
			}
			Game.textBuffer.length = 0;
		},
		
		writeText: function(options) {
		///<summary>
		/// Utility function to write text to the canvas.
		/// options { text, x, y, font }
		///<summary>
			if (typeof options === "string") {
				options = { text: options };
			}
			if( !options || !options.text ) {
				return;
			}
			
			Game.textBuffer.push({
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
				segment = [vertices[i], vertices[(i+1)%vertices.length]];
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
		},
		
		reset: function() {
			delete Game;
			scope.Game = new _Game();
		}
		
	};
	
	// Game singleton
	scope.Game = new _Game();
	
}(window));