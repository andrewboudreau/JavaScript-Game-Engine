// Removed the FunctionInherit import
// import FunctionInherit from "./Function";

// Polyfill for Array.prototype.forEach, if needed
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        for (let i = 0, len = this.length; i < len; ++i) {
            fn.call(scope || this, this[i], i, this);
        }
    };
}

// Polyfill for Array.prototype.each, if needed
if (!Array.prototype.each) {
    Array.prototype.each = function (fn, scope) {
        this.forEach(fn, scope);
    };
}

class CollectionManager {
    constructor(type) {
        this.type = type;
        this.items = [];
    }

    guard(item) {
        if (!this.type) {
            return;
        }
        if (!(item instanceof this.type)) {
            throw new Error(`item must be an instance of ${this.type.getName()}`);
        }
    }

    add(item) {
        this.guard(item);
        this.items.push(item);
        return this;
    }

    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    clear() {
        this.items.length = 0;
    }

    indexOf(item) {
        this.guard(item);
        return this.items.indexOf(item);
    }

    item(index) {
        if (index < 0 || index >= this.items.length) {
            throw new Error("argument out of range");
        }
        return this.items[index];
    }

    where(property, value) {
        return this.items.filter(item => item[property] === value);
    }

    find(predicate) {
        return this.items.find(item => predicate.call(item, item));
    }

    each(lambda) {
        this.items.forEach(item => lambda.call(item, item));
    }
}

export default CollectionManager;
