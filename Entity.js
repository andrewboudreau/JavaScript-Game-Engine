function Entity() {
	this.position = 0;
	this.rotation = 0;
}

Entity.prototype = {
	position : [0, 0],
	rotation: 0,
	update: function() { return; }	
};
