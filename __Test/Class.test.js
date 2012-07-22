var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  },
  dance: function(){
    return this.dancing;
  }
});

var Ninja = Person.extend({
  init: function(){
    this._super( false );
  },
  dance: function(){
    return this._super();
  },
  swingSword: function(){
    return true;
  }
});

test("Person can dance", function() {
	var p = new Person(true);
  ok( p.dance(), "a person should be dancing" );
});

test("Ninja can swing a sword", function() {
	var n = new Ninja();
	ok( !n.dance(), "ninja's don't dance"); 
	ok( n.swingSword(), "ninja's gotta swing the sword");
});

test("Person is a Class", function() {
	var n = new Ninja();
	ok( !n.dance(), "ninja's don't dance"); 
	ok( n.swingSword(), "ninja's gotta swing the sword");
});

test("Person is a Class", function() {
	var p = new Person(true);
	ok( p instanceof Person, "p is a Person");
	ok( p instanceof Class, "Person is a Class");
});

test("Ninja is a Person", function() {
	var n = new Ninja();
	ok(n instanceof Ninja);
	ok(n instanceof Person);
	ok(n instanceof Class);
});
