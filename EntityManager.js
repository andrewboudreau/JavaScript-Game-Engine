(function(global) {
	if (!Entity) {
		throw "Class.Entity is not defined and is required.";
	}
	
	function _EntityManager() {
		this.entities = [];
	}
	
	_EntityManager.prototype = {
		guard: function(entity) {
			if ( !(entity instanceof Entity) ) {
				throw "entity must be an instance of Entity";
			}	
		},
		
		add: function( entity ) {	
			this.guard(entity);
			
			this.entities.push(entity);
			return entity;
		},
		
		remove: function( entity ) {
			var index = this.entities.indexOf(entity);
			if( index !== -1) {
				this.entities.splice(index, 1);
			}
		},
		
		clear: function() {
			this.entities.length = 0;
		},
		
		indexOf: function( entity ) {
			this.guard(entity);
			
			return this.entities.indexOf( entity );
		}
	};
	
	global.EntityManager = new _EntityManager();
}(Game));

