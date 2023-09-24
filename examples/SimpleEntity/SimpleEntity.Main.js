import Dot from '../../engine/actors/Dot';

const context = document.getElementById('canvas').getContext('2d');

const dot = new Dot({
    x: 50,
    y: 50,
    rotation: 30,
    size: 40,
});

dot.render({ context: context });