JavaScript-Game-Engine
======================
a 2d game engine written in JavaScript.  

Game is the central component in the engine, it ties all of the other engine systems together. In each loop the game engine executes and update followed by a render method for each entity in the system. A simple TextManager live directly off of Game to support ea

=======================================================
Function.js - is the inheritance engine. This is essentially a strict and ecmascript 5 version of john resigs simple inheritance ideas. I've already found a few shortcomings by not supplying a constructor method directly in assuming init is the constructor.

Game.js - runs the main animation loop, calls update and render on entities passing appropriate context for entities and input.  Game is the central component in the engine, it ties all of the subsystems together.

Game.entityManager - a container for managing entites to be updated and rendered on demand of the game engine.  The core game engine implements a CollectionManager and exposes an add method directly upon the Game instance.

Component.js - a simple objects managed by the engine, supports update and render methods. Differs from an actor as is applies to the game not in the game.

TextManager.js - a reusable text management system. For simplicity Game initiliazes with a textManager. I like to think of this as an on-screen text buffer i can write to for debugging or HUD.

Actor.js - from component, adds position and rotation to a component. I imagine this object being a visual component. It no longer works on the game but on the screen.

CollectionManager.js - a base collection class implementing most basic needs of a collection, iteration, type-saftey using guard to some extent.

