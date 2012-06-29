document.write("<input type='text' id='mousedebugger' />");
function MouseDebugger(x, y) {
	VisualEntity.apply(this, arguments);
	this.position[0] = x || 0;
	this.position[1] = y || 0;
	this.output = document.getElementById("mousedebugger");
	this.size = 10;
}

MouseDebugger.prototype = new VisualEntity();
MouseDebugger.prototype.render = function (Game) { 
	
	var ctx = Game.context,
		top = left = this.size / 2,
		width = height = this.size,
		wheelDelta = Game.input.wheelDelta();
	
	this.output.value = this.position[0].toString() 
		+ " " + this.position[1].toString();
		
	ctx.save(); 
	ctx.translate(this.position[0], this.position[1]);
	ctx.fillStyle = "rgba(200, 200, 200, 0.3)";  
	
	ctx.fillRect(-top, -left, width, height);  
	VisualEntity.prototype.render.apply(this, arguments);
	ctx.restore();
}

MouseDebugger.prototype.update = function(duration, input, entities) {

	if( input.x ) {
		this.position[0] = input.x || 0;
	}
	
	if( input.y ) {
		this.position[1] = input.y || 0;
	}
	
	var wheelDelta = input.wheelDelta();
	if( wheelDelta !== 0) {
		this.size += wheelDelta;
	}
	
}