
var express 	= require("express"),
	router 		= express.Router(), 
	auth 		= require("../auth/auth.js"),
	controller	= require("./student-controller.js");


	router.param("id", controller.interceptIDs);

	router.route("/")
	.get(auth.decodeToken, controller.fetchAllStudents)
	.post(controller.addStudent);

	router.route("/:id")
	.get(controller.getStudent)
	.delete(controller.removeStudent)
	.put(controller.updateStudent);

	module.exports = router;