
test("Entity", function() {
  ok( Entity, "Hello, Entity" );
});

test("Defaults", function() {
	expect(2);
	var entity = new Entity();
	deepEqual(entity.position, [0, 0], "0,0 position");
	equal(entity.rotation, 0, "0 rotation");
});

test("Entity is Class", function() {
	expect(1);
	ok((new Entity()) instanceof Class);
});
