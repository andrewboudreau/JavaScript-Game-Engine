/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, indent:4, maxerr:50, white:true */
/*globals require */
require.config({
	paths: {
		"engine": "../../engine",
		"components": "../../engine/components"
    }
});

// Start the main app logic.
require(["jquery", "components/TextManager"], 
	function ($, TextManager) {
		"use strict";
		
		var context = document.getElementById("canvas").getContext("2d"),
			text = new TextManager(context);
			
		// generate some text
		text.writeLine("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
		text.writeLine("It has survived not only five centuries, but also the leap into electron");
		text.writeText({
			text: "rambled it to make a type specimen book. It", 
			x: 30, 
			y: 120,  
			font: "italic 20pt Calibri"
		});
		text.writeLine("more inline text is included even after we do a writeText it doesn't break the next time");
		// render text to the context.
		text.render({ screen: { context: context}});
	}
);
