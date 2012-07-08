function Bowtie(x, y) {
	VisualEntity.apply(this, arguments);
	this.position[0] = x;
	this.position[1] = y;
	this.dot = new Dot();
}
Bowtie.prototype = new VisualEntity();
Bowtie.prototype.render = function (Game) { 
	Game.context.save(); 
	Game.context.translate(this.position[0], this.position[1]); 
	Game.context.rotate(this.rotation);
	Game.context.fillStyle = "rgba(200,200,200,0.3)";  
	Game.context.fillRect(-30, -30, 60, 60);  

	Game.context.fillStyle = "red";  
	Game.context.beginPath();  
	Game.context.moveTo(25, 25);  
	Game.context.lineTo(-25, -25);  
	Game.context.lineTo(25, -25);  
	Game.context.lineTo(-25, 25);  
	Game.context.closePath();  
	Game.context.fill();  
	this.dot.render(Game);
	Game.context.restore();
}
Bowtie.prototype.update = function(duration, input, entities) {
	if(input.isPressed(input.left) && input.isPressed(input.down)) {
		this.rotation += 1;
	}
	if(input.isPressed(input.right) && input.isPressed(input.up)) {
		this.rotation -= 1;
	}
	
	if(input.isPressed(input.left)) {
		this.position[0] -= 1;
	}
	if(input.isPressed(input.right)) {
		this.position[0] += 1;
	}
	if(input.isPressed(input.up)) {
		this.position[1] -= 1;
	}
	if(input.isPressed(input.down)) {
		this.position[1] += 1;
	}
	
}