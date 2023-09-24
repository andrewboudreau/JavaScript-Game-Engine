import CollectionManager from "./CollectionManager";

class Entity {
    constructor() {
        this.components = new CollectionManager(Object, "components");
    }

    add(component) {
        console.log("component added and the type is " + typeof component );
        this.components.add(component);
    }

    update(duration, inputManager, componentManager) {
        this.components.each((component) => {
            if (component.update) {
                component.update(duration, inputManager, componentManager);
            }
        });
    }

    render(game, duration) {
        this.components.each((component) => {
            if (component.render) {
                component.render(game, duration);
            }
        });
    }
}

export default Entity;
