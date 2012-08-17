/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*global define*/
define(["engine/requestAnimationFrame"], function (requestAnimationFrame) {
	"use strict";
	var gamepad = {};
	
	function GamepadController(mapping) {
		
		this.thresholds = {
			axes: [0.25, 0.25, 0.25, 0.25],
			buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		};
		
		this.init = function () { 
			var self = this,
				gamepadSupportAvailable = !!navigator.webkitGetGamepads 
					|| !!navigator.webkitGamepads 
					|| (navigator.userAgent.indexOf('Firefox/') != -1);

			if (gamepadSupportAvailable) {
				// Firefox supports the connect/disconnect event, so we attach event handlers to those.
				window.addEventListener('MozGamepadConnected', self.onGamepadConnect, false);
				window.addEventListener('MozGamepadDisconnected', self.onGamepadDisconnect, false);
			} else {
				console.log("no gamepad support");
			}
			if (navigator.webkitGamepads) {
				this.controller = navigator.webkitGamepads[0] || {
						axes: [0, 0, 0, 0],
						buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					};
			} else {
				this.controller = {
					axes: [0, 0, 0, 0],
					buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				};
			}
			return this;
		};
		
		this.onGamepadConnect = function () {
			var arg = arguments;
			console.log("gamepad connected");
			this.controller =  navigator.webkitGamepads[0];	
		};
		
		this.onGamepadDisconnect = function () {
			var arg = arguments;
			console.log("gamepad disconnected");
			this.controller = {
				axes: [0, 0, 0, 0],
				buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			};
		};
		
		this.axes = function (keycode) {
			if (Math.abs(this.controller.axes[keycode]) >= this.thresholds.axes[keycode]) {
				return this.controller.axes[keycode];
			}
			return 0;
		};
		
		this.buttons = function (keycode) {
			if (Math.abs(this.controller.buttons[keycode]) >= this.thresholds.buttons[keycode]) {
				return this.controller.buttons[keycode];
			}
			return 0;
		};
	}
	
	GamepadController.buttons = {
		FACE_1: 0, // Face (main) buttons
		FACE_2: 1,
		FACE_3: 2,
		FACE_4: 3,
		LEFT_SHOULDER: 4, // Top shoulder buttons
		RIGHT_SHOULDER: 5,
		LEFT_SHOULDER_BOTTOM: 6, // Bottom shoulder buttons
		RIGHT_SHOULDER_BOTTOM: 7,
		SELECT: 8,
		START: 9,
		LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
		RIGHT_ANALOGUE_STICK: 11,
		PAD_TOP: 12, // Directional (discrete) pad
		PAD_BOTTOM: 13,
		PAD_LEFT: 14,
		PAD_RIGHT: 15
	};

	GamepadController.axes = {
		LEFT_ANALOGUE_HOR: 0,
		LEFT_ANALOGUE_VERT: 1,
		RIGHT_ANALOGUE_HOR: 2,
		RIGHT_ANALOGUE_VERT: 3
	};
	
	return GamepadController;
});
