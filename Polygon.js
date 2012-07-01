function Polygon(x, y, vertices, update, render) {
	VisualEntity.apply(this, [x, y]);
	this.position = [x, y];
	
	this.vertices = vertices || [ 5,5, 100,50, 50,100, 10,90 ]; 
	
	if(update) {
		this.update = update;
	}
	
	if(render) {
		this.render = render;
	}
	
}

Polygon.prototype = new VisualEntity();
Polygon.prototype.render = function(Game) {
	var poly = this.vertices,
		ctx = Game.context;
		
	ctx.save();	
	ctx.translate( this.position[0], this.position[1] );
	ctx.fillStyle = '#f00';
	ctx.beginPath();
	ctx.moveTo(poly[0], poly[1]);
	for( item = 2 ; item < poly.length-1 ; item += 2 ) {
		ctx.lineTo( poly[item] , poly[item+1] );
	}
	ctx.closePath();
	ctx.fill();
	ctx.restore();
};
