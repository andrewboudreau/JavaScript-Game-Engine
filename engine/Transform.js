import Vector from "./Vector";

export default class Transform {
    constructor(x = 0, y = 0, rotation = 0) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }

    position() {
        return new Vector(this.x, this.y);
    }
}