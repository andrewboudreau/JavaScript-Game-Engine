JavaScript-Game-Engine
======================

a simple component based canvas engine written in JavaScript.  

The main engine consists of two methods, update and render. The request animation loop is initiailized using Game.run().
Entities can be added to the game and two very simple entities are included. 

Input is abstracted out using a very niave approach at the moment, but input is passed to the update loop and then
on to the entities.

