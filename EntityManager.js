(function(scope) {
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
			EntityManager.guard(entity);
			
			EntityManager.entities.push(entity);
			return entity;
		},
		
		remove: function( entity ) {
			var index = EntityManager.entities.indexOf(entity);
			if( index !== -1) {
				EntityManager.entities.splice(index, 1);
			}
		},
		
		clear: function() {
			EntityManager.entities.length = 0;
		},
		
		indexOf: function( entity ) {
			EntityManager.guard(entity);
			
			return EntityManager.entities.indexOf( entity );
		},
		
		item: function(index) {
			if(index < 0 || index >= this.entities.length) {
				throw "argument out of range";
			}
			
			return EntityManager.entities[index];
		},
	
		each: function(action) {
			for(var i = 0; i < EntityManager.entities.length; i++) {
				action.apply(Game, EntityManager.entities[i]);
			}
		}
	};
	
	scope.EntityManager = new _EntityManager();
}(Game));

