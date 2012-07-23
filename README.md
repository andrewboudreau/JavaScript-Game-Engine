JavaScript-Game-Engine
======================
a 2d game engine written in JavaScript.  

Game is the central component in the engine, it ties all of the other engine systems together. In each loop the game engine executes and update followed by a render method for each entity in the system. A simple TextManager live directly off of Game to support ea

=======================================================
Game.js - runs the main animation loop, calls update and render on entities passing appropriate context for entities and input.  Game is the central component in the engine, it ties all of the subsystems together.

Game.entityManager - a container for managing entites to be updated and rendered on demand of the game engine.  The core game engine implements a CollectionManager and exposes an add method directly upon the Game instance.

CollectionManager.js - a base collection class implementing most basic needs of a collection, iteration, type-saftey using guard to some extent.

TextManager.js - a reusable text management system. For simplicity Game initiliazes with a textManager. I like to think of this as an on-screen text buffer i can write to for debugging or HUD.



