function Polygon(x, y, verticies) {
	VisualEntity.apply(this, arguments);
	this.position = [x, y];
	this.verticies = verticies || [ 5,5, 100,50, 50,100, 10,90 ]; 
}

Polygon.prototype = new VisualEntity();
Polygon.prototype.render = function() {
	
	var text = this.position[0].toString() + " " + this.position[1].toString();
	
	var poly = this.verticies,
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

function Square(x,y) {
	Polygon.apply(this, arguments);
	this.verticies = [ 0,0, 0,10, 10,10, 10,0 ];
};
Square.prototype = new Polygon();