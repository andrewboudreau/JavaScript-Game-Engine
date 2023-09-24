/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, newcap:true, white:false */

/*global Game */
((scope) => {
	"use strict";
	
	function MessageBus() {
		if ( MessageBus.prototype.singletonInstance ) {
			return MessageBus.prototype.singletonInstance;
		}
		
		MessageBus.prototype.singletonInstance = this;
		this.listeners = [];

		this.subscribe = function(listener) {
			if( this.listeners.indexOf(listener) !== -1 ) {
				return;
			}
			
			this.listeners.push(listener);
			return this;
		};
		
		this.unsubscribe = function(listener) {
			let index = this.listeners.indexOf(listener);
			if( index !== -1) {
				this.listeners.splice(index, 1);
			}
		};
	
		this.publish = function(message, context) {
			for (let i = 0; i < this.listeners.length; i++) {
				this.listeners[i](message, context);
			}
		};
	}

	scope.MessageBus = new MessageBus();
}(Game));