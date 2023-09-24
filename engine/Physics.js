
function sign(number) {
    return (number) ? (number < 0 ? -1 : 1) : 0;
};

function parseVectorArgumentToArray(args) {
    if (args.length === 2) {
        return [args[0], args[1]];
    } else if (args.length === 1 && typeof args[0].x !== 'undefined' && typeof args[0].y !== 'undefined') {
        return [args[0].x, args[0].y];
    } else if (args.length === 1 && typeof args[0][0] !== 'undefined' && typeof args[0][1] !== 'undefined') {
        return [args[0][0], args[0][1]];
    }
    throw "could not parse vector from argument." + args;
};

function createVector() {
    let defaults = [0, 0];

    function vector() {
        if (!arguments.length) {
            return [vector.x, vector.y];
        }
        let v = parseVectorArgumentToArray(arguments);
        vector.x = v[0];
        vector.y = v[1];
        return this;
    };

    if (arguments.length) {
        defaults = parseVectorArgumentToArray(arguments);
    }

    vector.x = defaults[0];
    vector.y = defaults[1];

    return vector;
};

let defaults = {
    position: [0, 0],
    velocity: [0, 0],
    gravity: [0, 0],
    drag: 0,
    rotation: 0,
    mass: 1,
    thresholds: {
        velocity: 10,
        acceleration: 2
    }
};

let Physics = (opt) => {
    let self = this,
        options = $.extend({}, opt);

    // vector based properties
    $(['acceleration', 'drag', 'force', 'position', 'velocity', 'gravity']).each(() => {
        self[this] = createVector();
    });
    this.mag = 0;
    this.dt = 0;
    this.animationStartTime = 0;
    this.mass = options.mass || defaults.mass;
    this.rotation = options.rotation || defaults.rotation;
    this.position(options.position || defaults.position);
    this.velocity(options.velocity || defaults.velocity);
    this.drag([options.drag || defaults.drag, options.drag || defaults.drag]);
    this.gravity(options.gravity || defaults.gravity);

    this.thresholds = $.extend(true, {}, defaults.thresholds, options.thresholds);
};

Physics.prototype = {
    applyForce: () => {
        let f = parseVectorArgumentToArray(arguments);
        this.acceleration.x += f[0] / 1000.0;
        this.acceleration.y += f[1] / 1000.0;
    },

    update: (dt) => {
        this.dt = dt;

        if (this.rotation > (2 * Math.PI) || this.rotation < (-2 * Math.PI)) {
            this.rotation = 0;
        }

        this.applyForce(this.gravity);
        this.velocity.x += this.acceleration.x * dt;
        this.velocity.y += this.acceleration.y * dt;

        this.position.x += dt * this.velocity.x + 0.5 * this.acceleration.x * dt * dt;
        this.position.y += dt * this.velocity.y + 0.5 * this.acceleration.y * dt * dt;
        this.acceleration(0, 0);

        this.mag = Math.pow(this.velocity.x + this.acceleration.x, 2) + Math.pow(this.velocity.y + this.force.y, 2);
    },

    render: () => { }
};

export default Physics;
