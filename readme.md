## JavaScript-Game-Engine
a 2d game engine written in JavaScript.  In each loop the game engine executes and updates followed by a render call for each entity in the system.

## Examples
http://www.blogfor.net/javascript-game-engine/

## Function.js
is the inheritance engine. This is essentially a strict and ecmascript 5 version of john resigs simple inheritance ideas. I've already found a few shortcomings by not supplying a constructor method directly in assuming init is the constructor.

## Game.js
Game.singletonInstance runs the main animation loop and is a very light engine, calls update and render on entities passing appropriate context for entities and input.  Game is the central component in the engine, it ties all of the subsystems together.

## Game.entityManager
a container for managing entites to be updated and rendered on demand of the game engine.  The core game engine implements a CollectionManager and exposes an add method directly upon the Game instance.

## Component.js
a simple objects managed by the engine, supports update and render methods. Differs from an actor as is applies to the game not in the game.

## TextManager.js
a reusable text management system. For simplicity Game initiliazes with a textManager. I like to think of this as an on-screen text buffer i can write to for debugging or HUD.

## Actor.js
from component, adds position and rotation to a component. I imagine this object being a visual component. It no longer works on the game but on the screen.

## CollectionManager.js
a base collection class implementing most basic needs of a collection, iteration, type-saftey using guard to some extent.

## Resources
* https://bitbucket.org/piemaster/artemoids/src
* https://github.com/gemserk/artemis/tree/master/src/com/artemis
* http://www.inverted-keystrokes.com/category/programming/2d-game-engine-tutorial/
* http://higherorderfun.com/blog/2012/05/20/the-guide-to-implementing-2d-platformers/
* http://www.html5rocks.com/en/tutorials/doodles/gamepad/

## Tools
* http://qunitjs.com/
* http://requirejs.org/
* http://code.google.com/p/dat-gui/
* https://github.com/mrdoob/stats.js




