import Vector from "./Vector";

const parseVectorArgumentToArray = (args) => {
    if (args.length === 2) {
        return [args[0], args[1]];
    } else if (args.length === 1 && typeof args[0].x !== 'undefined' && typeof args[0].y !== 'undefined') {
        return [args[0].x, args[0].y];
    } else if (args.length === 1 && typeof args[0][0] !== 'undefined' && typeof args[0][1] !== 'undefined') {
        return [args[0][0], args[0][1]];
    }
    throw "Could not parse vector from argument." + args;
};

class Physics {
    constructor(opt = {}) {
        this.mass = opt.mass || 1;
        this.rotation = opt.rotation || 0;
        this.position = opt.position ? new Vector(...opt.position) : new Vector();
        this.velocity = opt.velocity ? new Vector(...opt.velocity) : new Vector();
        this.drag = opt.drag ? new Vector(opt.drag, opt.drag) : new Vector();
        this.gravity = opt.gravity ? new Vector(...opt.gravity) : new Vector();

        this.thresholds = {
            velocity: 10,
            acceleration: 2,
            ...opt.thresholds
        };

        this.acceleration = new Vector();
        this.force = new Vector();
        this.mag = 0;
        this.dt = 0;
        this.animationStartTime = 0;
    }

    applyForce(...args) {
        const f = parseVectorArgumentToArray(args);
        this.acceleration.x += f[0] / 1000.0;
        this.acceleration.y += f[1] / 1000.0;
    }

    update(dt) {
        this.dt = dt;

        if (this.rotation > (2 * Math.PI) || this.rotation < (-2 * Math.PI)) {
            this.rotation = 0;
        }

        this.applyForce(this.gravity);
        this.velocity.x += this.acceleration.x * dt;
        this.velocity.y += this.acceleration.y * dt;

        this.position.x += dt * this.velocity.x + 0.5 * this.acceleration.x * dt * dt;
        this.position.y += dt * this.velocity.y + 0.5 * this.acceleration.y * dt * dt;
        this.acceleration = new Vector();

        this.mag = Math.pow(this.velocity.x + this.acceleration.x, 2) + Math.pow(this.velocity.y + this.force.y, 2);
    }    

    render() {
        // Implement rendering logic if needed
    }
}

export default Physics;
