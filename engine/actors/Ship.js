import Actor from './Actor';
import Physics from './Physics';

export default class Ship extends Actor {
    constructor(options) {
        super(options.x, options.y, options.rotation);

        this.size = options.size;
        this.color = options.color;
        this.halfSize = this.size / 2;
        this.physics = new Physics();
    }

    update(dt) {
        super.update(dt);
        this.physics.update(dt);
    }

    render(game) {
        const ctx = game.screen.context;

        ctx.save();
        ctx.translate(this.physics.position.x, this.physics.position.y);
        ctx.rotate(this.physics.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.halfSize, -this.halfSize, this.size, this.size);

        // line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -20);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.restore();
    }
}
