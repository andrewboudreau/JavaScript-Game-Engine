// don't forget we setup a mock Game in the html test since it needs to load before the singleton.
// that's why EntityManager is simply attached to global scope for testing
module("EntityManager prerequisites");

test("Class defined", function() {
  ok( Class, "a reference to Class.js" );
});

test("Entity Defined", function() {
  ok( Entity, "a reference to Entity.js" );
});

test("EntityManager singleton", function() {
  ok( EntityManager, "Hello, EntityManager" );
});

module("Entity Manager", {
  teardown: function() {
    EntityManager.clear();
  }
});

test("clear entities", 1, function() {
	EntityManager.add(new Entity());
	EntityManager.add(new Entity());
	EntityManager.clear();
	
	deepEqual(EntityManager.entities, [], "an empty array");
});

test("add entity", 1, function() {
	EntityManager.add(new Entity());
	equal(EntityManager.entities.length, 1, "an entity was added");
});

test("add non entity", function() {
	raises(function() {
		EntityManager.add({});
	}, "only entities can be added");
});

test("add returns expected entitie", 1, function() {
	var expected = new Entity(),
		actual;
	
	var actual = EntityManager.add(expected);
	strictEqual(actual, expected);
});

test("remove entity", 1, function() {
	var entity = EntityManager.add(new Entity());
	EntityManager.remove(entity);
	equal(EntityManager.entities.length, 0, "entity removed");
});

test("remove non entity", 1, function() {
	var entity = EntityManager.add(new Entity());
	EntityManager.remove({});
	equal(EntityManager.entities.length, 1, "entity not removed");
});

test("remove middle item", 3, function() {
	var i, entity = EntityManager.add(new Entity()),
		entity2 = EntityManager.add(new Entity()),
		entity3 = EntityManager.add(new Entity()),
		entity4 = new Entity();
	
	EntityManager.remove(entity2);
	equal(EntityManager.entities.length, 2, "two items left");
	strictEqual(EntityManager.entities[0], entity, "entity found");
	strictEqual(EntityManager.entities[1], entity3, "entity3 found");
});

test("remove add remove", 2, function() {
	var i, 
		entity = new Entity(),
		entity2 = new Entity(),
		entity3 = new Entity(),
		entity4 = new Entity();
		
	EntityManager.add(entity);
	EntityManager.add(entity2)
	EntityManager.add(entity3)
	
	EntityManager.remove(entity2);
	EntityManager.remove(entity);
	
	EntityManager.add(entity4);
	EntityManager.remove(entity3);
	
	equal(EntityManager.entities.length, 1, "one item left");
	strictEqual(EntityManager.entities[0], entity4, "entity4 found");
});

test("remove non entity", 1, function() {
	var entity = EntityManager.add(new Entity());
	EntityManager.remove({});
	equal(EntityManager.entities.length, 1, "entity not removed");
});

test("empty index of", 1, function() {
	equal(EntityManager.indexOf(new Entity()), -1, "not found");
});

test("index of", 3, function() {
	var entity = EntityManager.add(new Entity),
		entity2 = EntityManager.add(new Entity);
	
	equal(EntityManager.indexOf(entity), 0, "first item");
	equal(EntityManager.indexOf(entity2), 1, "second item");
	equal(EntityManager.indexOf(new Entity()), -1, "not found");
});

test("invalid index of", 1, function() {
	raises(function() {
		EntityManager.add({});
	}, "indexOf only accepts instance of Entity");
});

test("index accessor", 1, function() {
	strictEqual(EntityManager.add(new Entity()), EntityManager.item(0), "I've found myself");
});

test("index accessor out of range high", 1, function() {
	EntityManager.add(new Entity());
	
	raises(function() {
		EntityManager.item(2);
	}, "indexOf out of range");
});

test("index accessor out of range low", 1, function() {
	EntityManager.add(new Entity());
	
	raises(function() {
		EntityManager.item(-1);
	}, "indexOf out of range");
});

test("each none", 1, function() {
	
	var fired = false, 
		fireme = function() {
			fired = true;
		};
	equal(fired, false, "didn't fire the action");
});

test("each one", 1, function() {
	var fired = false, 
		fireme = function() {
			fired = true;
		};
		
	EntityManager.add(new Entity());
	
	EntityManager.each(fireme);	
	equal(fired, true, "fired the action");
});

test("each three", 1, function() {
	var fired = 0, 
		fireme = function() {
			fired += 1;
		};
		
	EntityManager.add(new Entity());
	EntityManager.add(new Entity());
	EntityManager.add(new Entity());
	
	EntityManager.each(fireme);	
	equal(fired, 3, "fired 3 times");
});







