import Actor from "../Actor";

export default class Polygon extends Actor {
    constructor(x, y, rotation, vertices) {
        super(x, y, rotation); // Calling the parent class constructor

        this.scale = 1;
        this.color = "blue";
        this.vertices = vertices || [
            113, 283,
            70, 156,
            180, 70,
            290, 156,
            250, 283
        ];
    }

    centerAtCentroid() {
        const offset = this.centroid();
        for (let item = 0; item < this.vertices.length - 1; item += 2) {
            this.vertices[item] -= offset[0];
            this.vertices[item + 1] -= offset[1];
        }
    }

    render(game) {
        super.render(game); // Call the parent class render method

        const ctx = game.screen.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.scale(this.scale, this.scale);

        ctx.beginPath();
        ctx.moveTo(this.vertices[0], this.vertices[1]);
        for (let item = 2; item < this.vertices.length - 1; item += 2) {
            ctx.lineTo(this.vertices[item], this.vertices[item + 1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    centroid() {
        let x = 0, y = 0, itr = 0;
        for (let item = 0; item < this.vertices.length - 1; item += 2) {
            x += this.vertices[item];
            y += this.vertices[item + 1];
            itr++;
        }
        return [x / itr, y / itr];
    }

    pointInConvexPolygon(point, vertices) {
        const crossProduct = (a, b) => a[0] * b[1] - a[1] * b[0];
        const subtract = (a, b) => [a[0] - b[0], a[1] - b[1]];

        let sign = 0;
        for (let i = 0; i < vertices.length; i++) {
            const segment = [vertices[i], vertices[(i + 1) % vertices.length]];
            const affineSegment = subtract(segment[1], segment[0]);
            const affinePoint = subtract(point, segment[0]);
            const k = crossProduct(affineSegment, affinePoint);

            if (k === 0) return true;
            if (k * sign < 0) return false;
            if (sign === 0) sign = k;
        }
        return true;
    }
}
