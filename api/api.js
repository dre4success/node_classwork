
var express 		= require("express"),
	api				= express.Router(),
	studentRouter	= require("./v1/student/student-router.js"),
	userRouter		= require("./v1/user/user-router.js"),
	authRouter 		= require("./v1/auth/auth-router.js");

	//mounting routes
	api.use("/students", studentRouter);
	api.use("/user", userRouter);
	api.use("/auth", authRouter);

	module.exports = api;