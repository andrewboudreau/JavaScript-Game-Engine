/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require:true */
require.config({
	paths: {
		"engine": "../engine",
		"qunit": "../lib/qunit"
    }
});

require(["engine/Array", "qunit/addons/close-enough/qunit-close-enough"], function (Array) {
	module("operations");
	
	test("Array has add", 1, function () {
		ok([].add);
	});
	
	test("add vector", 1, function () {
		var a = [1, 1],
			b = [1, 1];
		
		deepEqual(a.add(b), [2, 2]);
	});
	
	test("add anonymous", 3, function () {
		deepEqual([1, 2].add([2, 1]), [3, 3]);
		deepEqual([-1, 0].add([3, -1]), [2, -1]);
		deepEqual([-2, -3].add([-2, -3]), [-4, -6]);
	});
	
	test("add throws on invalid parameter length", 1, function () {
		throws(
			function() {
				[1, 1].add([1]);
			}
		);
	});
	
	test("add throws on invalid parameter type", 1, function () {
		throws(
			function() {
				[1, 1].add(a);
			}
		);
	});
	
	test("add throws on invalid source", 1, function () {
		var a = [1],
			b = [1, 1];
			
		throws(
			function() {
				a.add(b);
			}
		);
	});
	
	test("subtract vector", 1, function () {
		var a = [1, 1],
			b = [1, 1];
		
		deepEqual(a.subtract(b), [0, 0]);
	});
	
	test("subtact anonymous", 3, function () {
		deepEqual([1, 2].subtract([2, 1]), [-1, 1]);
		deepEqual([-1, 0].subtract([3, -1]), [-4, 1]);
		deepEqual([-2, -3].subtract([-2, -3]), [0, 0]);
	});
	
	test("multiply vector", 1, function () {
		var a = [1, 1];
		
		deepEqual(a.multiply(3), [3, 3]);
	});
	
	test("multiply anonymous", 3, function () {
		deepEqual([1, 2].multiply(2), [2, 4]);
		deepEqual([-1, 0].multiply(-1), [1, 0]);
		deepEqual([-2, -3].multiply(-2), [4, 6]);
	});
	
	test("multiply fractions", 6, function () {
		var result;
		result = [1.1, 2.3].multiply(3.4);
		QUnit.close(result[0], 3.74, 0.1);
		QUnit.close(result[1], 7.82, 0.1);
		
		result = [-2.6, 0.1].multiply(0);
		equal(result[0], 0);
		equal(result[1], 0);
		
		result = [-2.40, -3.31].multiply(-2.20);
		QUnit.close(result[0], 5.28, 0.01);
		QUnit.close(result[1], 7.28, 0.01);
	});
	
}); 


