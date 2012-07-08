(function(scope){
var _MessageBus = function() {
	this.listeners = [];
};

_MessageBus.prototype = {
	subscribe: function(listener) {
		if( MessageBus.listeners.indexOf(listener) !== -1 ) {
			return;
		}
		
		MessageBus.listeners.push(listener);
		return MessageBus;
	},
	unsubscribe: function(listener) {
		var index = MessageBus.listeners.indexOf(listener);
		if( index !== -1) {
			MessageBus.listeners.splice(index, 1);
		}
	},
	publish: function(message, context) {
		for (var i = 0; i < MessageBus.listeners.length; i++) {
			MessageBus.listeners[i](message, context);
		}
	}
};

scope.MessageBus = new _MessageBus();
}(Game));