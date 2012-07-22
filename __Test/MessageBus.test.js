module("listeners", {
	teardown: function() {
		MessageBus.listeners.length = 0;
	}
});

test("add listener", function() {
	var listener = {};
	
	MessageBus.subscribe(listener);

	equal(MessageBus.listeners.length, 1, "length increased");
	strictEqual(listener, MessageBus.listeners[0], "listener added");
});

test("add listener twice", function() {
	var listener = {};
	
	MessageBus.subscribe(listener);
	MessageBus.subscribe(listener);

	equal(MessageBus.listeners.length, 1, "only added once");
});

test("remove listener", function() {
	var listener = {};
	
	MessageBus.subscribe(listener);
	MessageBus.unsubscribe(listener);
	equal(MessageBus.listeners.length, 0, "length decreased");
});

test("remove nothing", function() {
	var listener = {};
	
	MessageBus.unsubscribe(listener);
	equal(MessageBus.listeners.length, 0, "still empty");
});

test("remove similar item", function() {
	var listener = {};		
	
	MessageBus.subscribe(listener);
	MessageBus.unsubscribe({});
	
	equal(MessageBus.listeners.length, 1, "still got one");
	strictEqual(MessageBus.listeners[0], listener, "correct listener found.")
});

module("publish", {
	teardown : function() {
		MessageBus.listeners.length = 0;
	}
});

test("publish message", function() {
	var count = 0,
		params = [],
		context = {},
		listener = function() {
			params.push(arguments);
			count +=1;
		};
	
	MessageBus.subscribe(listener);
	MessageBus.publish("foo", context);
	
	equal(count, 1, "publish called");
	equal(params.length, 1, "one params passed");
	strictEqual(params[0][0], "foo", "message foo published");
	strictEqual(params[0][1], context, "message context passed");
});