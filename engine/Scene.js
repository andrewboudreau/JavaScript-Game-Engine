import Component from "./Component";
import CollectionManager from "./components/CollectionManager";
import TextManager from "./components/TextManager";
import MouseKeyboardController from "./input/MouseKeyboardController";

export default class Scene {
    constructor(canvas, context) {
        this.canvas = canvas || document.getElementById("canvas");
        this.context = context || this.canvas.getContext("2d");

        this.entityManager = new CollectionManager(Component);
        this.textManager = new TextManager(this.context);
        this.inputManager = new MouseKeyboardController().init(this.canvas);

        this.initialized = false;
        this.paused = false;
        this.exit = false;

        this.entityManager.add(this.textManager);
    }

    add(component) {
        this.entityManager.add(component);
        return this;
    }

    run(duration) {
        this.gameLoop(duration, this, this.inputManager, this.entityManager);

        if (!this.exit) {
            requestAnimationFrame(this.run);
        }
    }

    gameLoop(duration, game, inputManager, entityManager) {
        game.clear();

        entityManager.each((entity) => {
            if (!game.paused) {
                entity.update(duration, inputManager, entityManager);
            }
            if (entity.render) {
                entity.render(game, duration);
            }
        });
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
}
