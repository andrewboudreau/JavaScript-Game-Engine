function Square(x,y) {
	Polygon.apply(this, arguments);
	this.vertices = [ 0,0, 0,10, 10,10, 10,0 ];
};
Square.prototype = new Polygon();