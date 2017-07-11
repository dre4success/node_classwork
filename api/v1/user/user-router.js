
var express 	= require("express"),
	router  	= express.Router(),
	controller  = require("./user-controller.js");


	router.route('/')
		.post(controller.registerUser);



	module.exports = router;