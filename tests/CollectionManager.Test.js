/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require, test, equal, strictEqual, ok, raises, deepEqual */
require.config({
	paths: {
		"engine": "../engine",
		"components": "../engine/components"
    }
});

require(["engine/Component", "components/CollectionManager"], function (Component, CollectionManager) {
	"use strict";
	
	module("Inheritance");
	
	test("CollectionManager", 1, function () {
		ok(CollectionManager, "was found");
	});

	test("CollectionManager.inherit", 1, function () {
		ok(CollectionManager.inherit, "was found");
	});
	
	test("CollectionManager is an instance of Component", 1, function () {
		ok((new CollectionManager()) instanceof Component);
	});
	
	module("Properties");
	
	test("Default", 1, function () {
		var collectionManager = new CollectionManager();
		equal(collectionManager.items.length, 0);
	});
	
	module("Managing items");
	
	test("clear", 1, function () {
		var collectionManager = new CollectionManager(Component);
		
		collectionManager.add(new Component());
		collectionManager.add(new Component());
		collectionManager.clear();
	
		deepEqual(collectionManager.items, [], "provides an empty array");
	});

	test("add entity", 1, function () {
		var collectionManager = new CollectionManager(Component);
		collectionManager.add(new Component());
		equal(collectionManager.items.length, 1, "managing an item");
	});

	test("add unsupported type", function () {
		var collectionManager = new CollectionManager(Component);
		
		raises(function () {
			collectionManager.add({});
		}, "throws error");
	});
	
	test("add hetergenous types", function () {
		var collectionManager = new CollectionManager(),
			component = new Component(),
			obj = {};
		
		collectionManager
			.add(component)
			.add(obj);
			
		equal(collectionManager.items.length, 2, "working fine");
		
		strictEqual(collectionManager.item(0), component, "component added");
		strictEqual(collectionManager.item(1), obj, "object added");
	});
	
	test("add method returns", 1, function () {
		var collectionManager = new CollectionManager(Component),
			actual;
		
		actual = collectionManager.add(new Component());
		strictEqual(actual, collectionManager, "CollectionManager");
	});
	
	test("remove", 1, function () {
		var component = new Component(),
			collectionManager = new CollectionManager(Component);

		collectionManager.add(component);
		collectionManager.remove(component);
		equal(collectionManager.items.length, 0, "removed component");
	});

	test("remove unsupported type", 1, function () {
		var component = new Component(),
			collectionManager = new CollectionManager(Component);

		collectionManager.add(component);
		collectionManager.remove({});
		equal(collectionManager.items.length, 1, "no items removed");
	});

	test("remove middle item", 3, function () {
		var collectionManager = new CollectionManager(Component),
			component = new Component(),
			component2 = new Component(),
			component3 = new Component(),
			component4 = new Component();
		
		collectionManager
			.add(component)
			.add(component2)
			.add(component3);
		
		collectionManager.remove(component2);
		equal(collectionManager.items.length, 2, "two items left");
		strictEqual(collectionManager.item(0), component, "component found");
		strictEqual(collectionManager.item(1), component3, "component3 found");
	});

	test("remove add remove", 2, function () {
		var collectionManager = new CollectionManager(Component),
			component = new Component(),
			component2 = new Component(),
			component3 = new Component(),
			component4 = new Component();
			
		collectionManager.add(component);
		collectionManager.add(component2);
		collectionManager.add(component3);
		
		collectionManager.remove(component2);
		collectionManager.remove(component);
		
		collectionManager.add(component4);
		collectionManager.remove(component3);
		
		equal(collectionManager.items.length, 1, "one item left");
		strictEqual(collectionManager.item(0), component4, "component4 found");
	});

	test("remove non entity", 1, function () {
		var collectionManager = new CollectionManager(Component);
		collectionManager.add(new Component());
		collectionManager.remove({});
		
		equal(collectionManager.items.length, 1, "entity not removed");
	});

	test("empty index of", 1, function () {
		var collectionManager = new CollectionManager(Component);
		equal(collectionManager.indexOf(new Component()), -1, "not found");
	});

	test("index of", 3, function ()  {
		var collectionManager = new CollectionManager(Component);
		var component = new Component(),
			component2 = new Component();
		
		collectionManager.add(component);
		collectionManager.add(component2);
		
		equal(collectionManager.indexOf(component), 0, "first item");
		equal(collectionManager.indexOf(component2), 1, "second item");
		equal(collectionManager.indexOf(new Component()), -1, "not found");
	});

	test("index accessor", 1, function ()  {
		var collectionManager = new CollectionManager(Component),
			component = new Component();
		
		collectionManager.add(component);
		strictEqual(component, collectionManager.item(0), "I've found myself");
	});

	test("index accessor out of range high", 1, function ()  {
		var collectionManager = new CollectionManager(Component).add(new Component());
		
		raises(function ()  {
			collectionManager.item(2);
		}, "indexOf out of range");
	});

	test("index accessor out of range low", 1, function ()  {
		var collectionManager = new CollectionManager(Component).add(new Component());
		
		raises(function ()  {
			collectionManager.item(-1);
		}, "indexOf out of range");
	});

	test("each none", 1, function ()  {
		
		var fired = false, 
			fireme = function ()  {
				fired = true;
			};
		equal(fired, false, "didn't fire the action");
	});

	test("each one", 2, function ()  {
		var collectionManager = new CollectionManager();
		
		var fired = 0, 
			stub = {
				fireme: function ()  {
					fired += 1;
				}
			};
			
		collectionManager.add(stub);
		collectionManager.each(function (s) {
			s.fireme();
			strictEqual(s, stub, "gets passed in");
		});	
		
		equal(fired, 1, "fired the action");
	});

	test("each off three", 6, function ()  {
		var collectionManager = new CollectionManager();
		
		
		var fired = [0, 0, 0], 
			passedIn = [],
			stub = {
				fireme: function ()  {
					fired[0] += 1;
				}
			},
			stub2 = {
				fireme: function ()  {
					fired[1] += 1;
				}
			},
			stub3 = {
				fireme: function ()  {
					fired[2] += 1;
				}
			};
			
		collectionManager.add(stub);
		collectionManager.add(stub2);
		
		collectionManager.each(function (s) {
			s.fireme();
			passedIn.push(s);
		});	
		
		equal(fired[0], 1, "stub fired");
		equal(fired[1], 1, "stub2 fired");
		equal(fired[2], 0, "stub3 did not fire");
		
		strictEqual(passedIn[0], stub, "passed in stub");
		strictEqual(passedIn[1], stub2, "passed in stub2");
		equal(passedIn.length, 2, "two items iterated over");
		
	});
});

