import Entity from "../Entity";
import Physics from "../Physics";

class Dot extends Entity {
    constructor(options) {
        super(); // Calling the parent class constructor
        this.size = options.size || 10;
        this.color = options.color;
        this.halfSize = this.size / 2;
        this.physics = new Physics(options);
    }

    render(game) {
        super.render(game); // Calling the parent class render method
        const ctx = game.screen.context;

        ctx.save();
        ctx.translate(this.physics.position.x, this.physics.position.y);
        ctx.rotate(this.physics.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.halfSize, -this.halfSize, this.size, this.size);
        ctx.restore();
    }

    update(dt) {
        super.update(dt); // Calling the parent class update method
        this.physics.update(dt);
    }
}

export default Dot;
