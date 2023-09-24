import Entity from "./Entity";
import Physics from "./Physics";

class Actor extends Entity {
    constructor(x, y, rotation) {
        super(); // Call parent class constructor
        this.physics = new Physics();

        this.physics.position.x = x;
        this.physics.position.y = y;
        this.physics.rotation = rotation; // Fixed typo from 'protation' to 'rotation'
    }

    position() {
        return this.physics.position();
    }
}

export default Actor;
