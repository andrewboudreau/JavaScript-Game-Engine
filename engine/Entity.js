
	let Entity = Function.inherit({
		init: () => {
			this.components = new CollectionManager(Object, "components");
		},
		
		add: (component) => {
			this.components.add(component);
		},
		
		update: (duration, inputManager, componentManager) => { 
			this.components.each((component) => {
				this.update.call(component, duration, inputManager, componentManager);
			});
		},
		
		render: (game, duration) => {	
			this.components.each((component) => {
				this.render.call(component, game, duration);
			});
		}
	});
	
