export default class GamepadController {
    static buttons = {
        FACE_1: 0,
        FACE_2: 1,
        FACE_3: 2,
        FACE_4: 3,
        LEFT_SHOULDER: 4,
        RIGHT_SHOULDER: 5,
        LEFT_SHOULDER_BOTTOM: 6,
        RIGHT_SHOULDER_BOTTOM: 7,
        SELECT: 8,
        START: 9,
        LEFT_ANALOGUE_STICK: 10,
        RIGHT_ANALOGUE_STICK: 11,
        PAD_TOP: 12,
        PAD_BOTTOM: 13,
        PAD_LEFT: 14,
        PAD_RIGHT: 15,
    };

    static axes = {
        LEFT_ANALOGUE_HOR: 0,
        LEFT_ANALOGUE_VERT: 1,
        RIGHT_ANALOGUE_HOR: 2,
        RIGHT_ANALOGUE_VERT: 3,
    };

    constructor() {
        this.thresholds = {
            axes: [0.25, 0.25, 0.25, 0.25],
            buttons: Array(15).fill(0),
        };
        if ('getGamepads' in navigator) {
            window.addEventListener('gamepadconnected', this.onGamepadConnect);
            window.addEventListener('gamepaddisconnected', this.onGamepadDisconnect);
        } else {
            console.log('No gamepad support');
        }
        this.controller = navigator.getGamepads()[0] || this.createEmptyGamepad();
    }

    createEmptyGamepad() {
        return {
            axes: [0, 0, 0, 0],
            buttons: Array(15).fill(0),
        };
    }

    onGamepadConnect = () => {
        console.log('Gamepad connected');
        this.controller = navigator.getGamepads()[0];
    };

    onGamepadDisconnect = () => {
        console.log('Gamepad disconnected');
        this.controller = this.createEmptyGamepad();
    };

    axes(keycode) {
        const value = this.controller.axes[keycode];
        return Math.abs(value) >= this.thresholds.axes[keycode] ? value : 0;
    }

    buttons(keycode) {
        const value = this.controller.buttons[keycode];
        return Math.abs(value) >= this.thresholds.buttons[keycode] ? value : 0;
    }
}
