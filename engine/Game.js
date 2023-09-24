import Screen from "./Screen";
import CollectionManager from "./CollectionManager";
import TextManager from "./components/TextManager";
import MouseKeyboardController from "./input/MouseKeyboardController";
import Stats from "../lib/stats";

export default class Game {
    constructor(canvas, context) {
        this.lastTime = 0;

        this.screen = new Screen(canvas, context);
        this.entityManager = new CollectionManager();
        this.textManager = new TextManager(this.screen);
        this.inputManager = new MouseKeyboardController(this.screen);

        this.initialized = false;
        this.paused = false;
        this.exit = false;

        this.entityManager.add(this.textManager);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0%';
        this.stats.domElement.style.top = '0px';
        this.stats.setMode(0);
        document.body.appendChild(this.stats.domElement);
    }

    add(component) {
        this.entityManager.add(component);
        return this;
    }

    run(time) {
        this.stats.begin();

        let dt;

        if (!time) {
            time = performance.now();
            this.lastTime = time - 16;
        }

        dt = time - this.lastTime;
        this.lastTime = time;

        this.gameLoop(dt);

        if (!this.exit) {
            window.requestAnimationFrame(this.run.bind(this));
        }

        this.stats.end();
    }

    gameLoop(dt) {
        this.screen.clear();

        this.entityManager.each((entity) => {
            if (!this.paused) {
                entity.update(dt, this.inputManager, this.entityManager);
            }
            if (entity.render) {
                entity.render(this);
            }
        });
    }

    writeText(options) {
        this.textManager.writeText(options);
    }

    writeLine(text) {
        this.textManager.writeLine(text);
    }

    reset() {
        this.entityManager.clear();
        this.textManager.clear();

        this.initialized = false;
        this.paused = false;
        this.exit = false;
    }

    static singletonInstance = null;
}
