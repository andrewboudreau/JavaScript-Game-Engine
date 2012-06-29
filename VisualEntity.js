function VisualEntity(x, y, render) {
	Entity.apply(this, arguments);
	this.position = [0, 0];
	this.boundingBox = [0, 0, 0, 0];
	
	if(render) {
		this.render = render;
	}
	
}

VisualEntity.prototype = new Entity();
VisualEntity.prototype.render = function() {
	var text = this.position[0].toString() + " " + this.position[1].toString();
	
	Game.writeText({ 
		text: text,
		x: this.position[0],
		y: this.position[1]
	});
	
};

VisualEntity.prototype.boundingBox = [];
