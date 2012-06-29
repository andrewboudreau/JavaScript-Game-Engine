Dot = function Dot() {
	VisualEntity.apply(this, arguments);
}

Dot.prototype = new VisualEntity();
Dot.prototype.render = function (Game) {
	Game.context.fillStyle = "black";  
	Game.context.fillRect(-2, -2, 4, 4);  
}