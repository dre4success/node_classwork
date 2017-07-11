
var express 	= require("express"),
	bps			= require("body-parser"),  //body parser, to process request data
	app			= express(),
	api 		= require("../api/api.js"),
	morgan		= require("morgan"), 
	cors        = require("cors");
	


	app.use(bps.json());
	app.use(bps.urlencoded({extended: true}));  

	// get details of incoming request
	app.use(morgan("dev"));

	app.use(cors());

	// mount routes
	app.use("/api/v1", api);

	// Your error handler must be the last endpoint in your list of routes
	// application error handler
	app.use((err, req, res, next) => {
		res.status(500).json(err.message);
		next();

	})



	module.exports = app;
	