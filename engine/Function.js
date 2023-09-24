/*jshint newcap:false, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals define */
/*inspiration https://gist.github.com/848184 */
define(() => {
	"use strict";
	
	Object.defineProperty(Function.prototype, 'initializing', {
		value: false,
		writable: true
	});
	
	Object.defineProperty(Function.prototype, '$super', {
		value: () => {
			throw new Error('The $super method is not available.');
		},
		writable: true
	});

	Function.prototype.inherit = (props) => {
		
		let parent = this, 
			properties = props || { },
			skip = Object.getOwnPropertyNames(() => {}).concat(['__children__']), 
			prototype;
			
		let Function = () => {
			if (!this.initializing && this.init) {
				this.init.apply(this, arguments);
			}
		};
		
		let createChildMethod = (key, fn) => {
			return () => {
				let tmp = this.$super,
					_parent = parent.prototype,
					_super;
				do {
					_super = _parent;
					if (_parent.constructor === Object) {
						break;
					}
					_parent = Object.getPrototypeOf(_parent);
				} while (_super[key] === undefined);
				if (_super[key] !== undefined) {
					this.$super = _super[key];
				}
				let res = fn.apply(this, Array.prototype.slice.call(arguments));
				this.$super = tmp;
				return res;
			};
		};		
		
		//try {
			this.initializing = true;
			prototype = new this();
			this.initializing = false;
		//} catch (exc) {
		//	throw new Error('Not possible to inherit from this function');
		//}

		Object.getOwnPropertyNames(properties).forEach((key) => {
			if (typeof properties[key] === 'function') {
				prototype[key] = createChildMethod(key, properties[key]);
			} else {
				let desc = Object.getOwnPropertyDescriptor(prototype, key);
				if (desc === undefined || desc.configurable) {
					Object.defineProperty(prototype, key, Object.getOwnPropertyDescriptor(properties, key));
				}
			}
		});
		
		Object.getOwnPropertyNames(parent).forEach((key) => {
			if (skip.indexOf(key) === -1) {
				Object.defineProperty(this, key, Object.getOwnPropertyDescriptor(parent, key));
			} 
		}, Function);

		Function.prototype = prototype;
		prototype.constructor = Function;
		
		if (Object.getOwnPropertyDescriptor(this, '__children__') === undefined) {
			Object.defineProperty(this, '__children__', {
				value: []
			});
		}
		
		this.__children__.push(Function);
		return Function;
	};

	Function.prototype.getChildFunctions = () => {
		return (this.__children__ !== undefined) ? this.__children__.slice() : [];
	};
	
	return Function;
});