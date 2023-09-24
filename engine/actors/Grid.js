import Actor from "../Actor";

class Grid extends Actor {
    constructor(color, spacing) {
        super(); // Calling the parent class constructor
        this.spacing = spacing || 20;
        this.color = color || "#CCC";
    }

    render(game, duration) {
        const ctx = game.screen.context;
        const canvas = game.screen.canvas;
        const hspacing = this.spacing;
        const vspacing = this.spacing;
        const color = this.color;

        ctx.save();
        ctx.strokeStyle = this.color;

        for (let w = 0; w <= canvas.width; w += hspacing) {
            ctx.beginPath();
            ctx.moveTo(w, 0);
            ctx.lineTo(w, canvas.height);
            ctx.stroke();
        }

        for (let v = 0; v <= canvas.height; v += vspacing) {
            ctx.beginPath();
            ctx.moveTo(0, v);
            ctx.lineTo(canvas.width, v);
            ctx.stroke();
        }

        ctx.restore();
        super.render(game, duration); // Calling the parent class render method
    }
}

export default Grid;
