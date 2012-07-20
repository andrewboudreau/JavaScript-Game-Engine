requirejs.config({
    baseUrl: 'js',
    paths: {
		"jquery": "require-jquery"
    }
});

require(["jquery", "engine/Game"], function($, Game) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
		Game.run();
		console.log("running");
    });
});
