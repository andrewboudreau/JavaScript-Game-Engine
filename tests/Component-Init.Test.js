/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require:true, test:true, ok:true */
require.config({
	paths: {
		"engine": "../engine"
    }
});

require(["engine/Component"], function (Component) {
	"use strict";
	var baseInitCount = 0, 
		subclassInitCount = 0,
		subclassDoWorkCount = 0,
		baseDoWorkCount = 0,
		baseOnlyCount = 0,
		subclassOnlyCount = 0;
	
	var Base = Component.inherit({
		init: function () {
			this.$super();
			baseInitCount += 1;
		},
		doWork: function () {
			baseDoWorkCount += 1;
		},
		baseOnly: function () {
			baseOnlyCount += 1;
		}
	});
	
	var Subclass = Base.inherit({
		init: function () {
			this.$super();
			subclassInitCount += 1;
		},
		doWork: function () {
			this.$super();
			subclassDoWorkCount += 1;
		},
		subclassOnly: function () {
			subclassOnlyCount += 1;
		}
	});
	
	module("init counting", {
		setup: function () {
			baseInitCount = 0;
			subclassInitCount = 0;
			subclassDoWorkCount = 0;
			baseDoWorkCount = 0;
			baseOnlyCount = 0;
			subclassOnlyCount = 0;
		}
	});
	
	test("call init once", 2, function () {
		var instance = new Base();
		equal(baseInitCount, 1, "base.init called once");
		equal(subclassInitCount, 0, "subclass.init not called");
	});
	
	test("call init once with subclass", 2, function () {
		var instance = new Subclass();
		equal(baseInitCount, 1, "base.init called once");
		equal(subclassInitCount, 1, "subclass.init called once");
	});
	
	test("baseOnly", function () {
		var instance = new Subclass();
		instance.baseOnly();
		
		equal(baseInitCount, 1, "base.init called once");
		equal(subclassInitCount, 1, "subclass.init called once");
		equal(baseOnlyCount, 1, "base.baseonly called once");
		equal(subclassOnlyCount, 0, "subclass.subclassOnly not called");
	});
	
	test("doWork", function () {
		var instance = new Subclass();
		instance.doWork();
		
		equal(baseDoWorkCount, 1, "base.doWork called once");
		equal(subclassDoWorkCount, 1, "subclass.doWork called once");
		
		equal(baseOnlyCount, 0, "base.baseonly not called");
		equal(subclassOnlyCount, 0, "subclass.subclassOnly not called");
		
	});
});