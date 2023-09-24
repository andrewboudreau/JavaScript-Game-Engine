// MessageBus.js

export default class MessageBus {
    constructor() {
        this.listeners = [];
    }

    subscribe(listener) {
        if (this.listeners.indexOf(listener) === -1) {
            this.listeners.push(listener);
        }
    }

    unsubscribe(listener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    publish(message, context) {
        for (const listener of this.listeners) {
            listener(message, context);
        }
    }
}

// Create a singleton instance and export it
const instance = new MessageBus();
export { instance };
