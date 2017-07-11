
/* global __dirname */

var express = require("express"),
	app 	= require("./server/server.js");
	

// serve static files
	app.use(express.static(__dirname + "/www"));

// listen for incoming requests
	app.listen(3000, () => {
		console.log("server started...");
	});
