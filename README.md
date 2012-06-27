JavaScript-Game-Engine
======================

a simple component based canvas engine written in JavaScript.  

The main engine consists of two methods, update and render. The request animation loop is initiailized using Game.run().
Entities can be added to the game and two very simple entities are included. No input is attached to the Game by default.

_Game is the constructor and Game singleton is created at the bottom of Game.js.  Game is assumed to be a singleton.


=======================================================
Game.js - runs the main animation loop, calls update and render on entities passing appropriate context for entities and input.

KeyboardInput.js - a very limited input abstraction, keyboard only.

Entity.js - base class for objects that that belong to a game.

VisualEntity.js - adds render to an entity.

Entities.Dot.js - a dot.

Entities.Bowtie.js - a bowtie with input support.

example.html - the simpliest example one could make.
