
export default class Screen {
    constructor(canvas, context) {
        this.canvas = canvas || this.createCanvas();
        this.context = context || this.canvas.getContext("2d");
        this.fullscreen();
    }

    fullscreen() {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        this.canvas.setAttribute("width", this.width - 2);
        this.canvas.setAttribute("height", this.height - 6);
    }

    createCanvas() {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        return canvas;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
