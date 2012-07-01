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

test("clear entities", function() {
	expect(1)
	EntityManager.add(new Entity());
	EntityManager.add(new Entity());
	EntityManager.clear();
	
	deepEqual(EntityManager.entities, [], "an empty array");
});

test("add entity", function() {
	expect(1);
	EntityManager.add(new Entity());
	equal(EntityManager.entities.length, 1, "an entity was added");
});

test("add non entity", function() {
	raises(function() {
		EntityManager.add({});
	}, "only entities can be added");
});

test("add returns expected entitie", function() {
	var expected = new Entity(),
		actual;
	
	var actual = EntityManager.add(expected);
	strictEqual(actual, expected);
});

test("single remove ", function() {
	var entity = EntityManager.add(new Entity());
	EntityManager.remove(entity);
	equal(EntityManager.entities.length, 0, "entity removed");
});

test("multiple items with remove", function() {
	var i, entity = EntityManager.add(new Entity()),
		entity2 = EntityManager.add(new Entity()),
		entity3 = EntityManager.add(new Entity()),
		entity4 = new Entity();
	
	EntityManager.remove(entity2);
	equal(EntityManager.entities.length, 2, "two items left");
	strictEqual(EntityManager.entities[0], entity, "entity found");
	strictEqual(EntityManager.entities[1], entity3, "entity3 found");
	
	EntityManager.remove(entity);
	equal(EntityManager.entities.length, 1, "one item left");
	strictEqual(EntityManager.entities[0], entity3, "entity3 found");
	
	EntityManager.add(entity4);
	EntityManager.remove(entity3);
	equal(EntityManager.entities.length, 1, "one item left");
	strictEqual(EntityManager.entities[0], entity4, "entity4 found");
	
});
