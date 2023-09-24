import CollectionManager from "../CollectionManager";

class TextManager extends CollectionManager {

    constructor() {
        super();
        this.xOffset = 0;
        this.yOffset = 0;
        this.padding = 3;
        this.lineHeight = 10;
    }

    render(game, duration) {
        const ctx = game.screen.context;

        this.each((item) => {
            ctx.font = item.font;
            ctx.fillText(item.text, item.x, item.y);
        });

        this.clear();
    }

    update() {
        // Implement update logic if needed
    }

    writeText(options) {
        if (typeof options === "string") {
            options = { text: options };
        }
        if (!options || !options.text) {
            return;
        }

        this.items.push({
            text: options.text,
            x: options.x || this.padding,
            y: options.y || this.padding + this.lineHeight,
            font: options.font || "normal 12px sans-serif",
        });
    }

    writeLine(text) {
        this.yOffset += this.lineHeight + this.padding;
        this.items.push({
            text: text,
            x: this.padding + this.xOffset,
            y: this.yOffset,
            font: "normal 12px sans-serif",
        });
    }

    clear() {
        super.clear();
        this.xOffset = 0;
        this.yOffset = 0;
    }
}

export default TextManager;
