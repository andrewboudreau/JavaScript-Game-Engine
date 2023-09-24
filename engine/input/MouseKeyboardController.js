export default class MouseKeyboardController {
    constructor(screen, mapping = {}) {
        const defaultKeymap = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            wheelUp: "wheelup",
            wheelDown: "wheeldown",
            buttonOne: "button1",
            buttonTwo: "button2",
            buttonThree: "button3",
        };

        this.keymap = { ...defaultKeymap, ...mapping };
        this.pressed = {};
        this.x = 0;
        this.y = 0;
        this.wheel = 0;
        this.screen = screen;

        window.addEventListener("keyup", this.onKeyup);
        window.addEventListener("keydown", this.onKeydown);
        window.addEventListener("mousemove", this.onMousemove);
        window.addEventListener("mousewheel", this.onMousewheel);
        window.addEventListener("mousedown", this.onMousedown);
        window.addEventListener("mouseup", this.onMouseup);
    }

    onKeyup = (event) => {
        delete this.pressed[event.keyCode];
    };

    onKeydown = (event) => {
        this.pressed[event.keyCode] = true;
    };

    onMousemove = (event) => {
        const element = this.screen.canvas || document.body;
        const [xOffset, yOffset] = this.findPos(element);
        this.x = event.pageX - xOffset;
        this.y = event.pageY - yOffset;
    };

    onMousewheel = (event) => {
        this.wheel += Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
    };

    onMousedown = (event) => {
        this.pressed[this.keymap[`button${event.button + 1}`]] = true;
    };

    onMouseup = (event) => {
        delete this.pressed[this.keymap[`button${event.button + 1}`]];
    };

    position() {
        return [this.x, this.y];
    }

    wheelDelta() {
        const tmp = this.wheel;
        this.wheel = 0;
        return tmp;
    }

    findPos(obj) {
        let curleft = 0,
            curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while ((obj = obj.offsetParent));
            return [curleft, curtop];
        }
        return [0, 0];
    }

    isPressed(keyCode) {
        return this.pressed[keyCode];
    }
}
