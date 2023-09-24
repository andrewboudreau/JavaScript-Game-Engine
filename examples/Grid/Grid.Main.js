// Assuming you have Screen and Grid as ES6 modules
import Screen from '../../engine/Screen';
import Grid from '../../engine/actors/Grid';

const screen = new Screen();
const grid = new Grid("orange", 20);

grid.render({ screen: screen });