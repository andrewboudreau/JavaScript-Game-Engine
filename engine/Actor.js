
	let Actor = Entity.inherit({
		init: (x, y, rotation) => {
			this.physics = new Physics();
			
			this.physics.position.x = x;
			this.physics.position.y = y;
			this.physics.protation = rotation;
		},
		position: () => {
			return this.physics.position();
		}
	});
	
