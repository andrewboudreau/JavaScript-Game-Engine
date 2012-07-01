(function(global) {
	if (!Entity) {
		throw "Class.Entity is not defined and is required.";
	}
	
	function _EntityManager() {
		this.entities = [];
	}
	
	_EntityManager.prototype = {
		
		add: function( entity ) {	
			if ( !(entity instanceof Entity) ) {
				throw "entity must be an instance of Entity";
			}
		
			this.entities.push(entity);
			return entity;
		},
		
		remove: function( entity ) {
			if ( !(entity instanceof Entity) ) {
				throw "entity must be an instance of Entity";
			}
			this.entities.splice(this.entities.indexOf(entity), 1);
		},
		
		clear: function() {
			this.entities.length = 0;
		},
	};
	
	global.EntityManager = new _EntityManager();
}(Game));

