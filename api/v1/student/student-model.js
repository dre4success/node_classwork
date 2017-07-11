
var mongoose = require("mongoose"),
	StudentSchema;


	mongoose.connect("mongodb://localhost/student");

	StudentSchema = new mongoose.Schema({
		name: {type: String, required: true},
		role: {type: String, required: true},
		date: {type: Date, default: Date.now}
	});

	module.exports = mongoose.model("pupil", StudentSchema);


	