//the most basic managed object in the game engine.
var Entity = Class.extend({
  init: function(position, rotation){
    this.position = position || [0, 0];
		this.rotation = rotation || 0;
	},
	update: function() { 
		return; 
	}	
});
