
var studentModel = require("./student-model.js");


module.exports.interceptIDs = (req, res, next, id) => {
		studentModel.findById(id)
		.then((data) => {
			if(!data) {return next(new Error("Can't find student ID")); }
			req.student = data;
			next();
		}, (err) => {return next(err); })

	}


module.exports.fetchAllStudents = (req, res, next) => {

		studentModel.find((err, data) => {
			if(err) { return next(new Error("failed to get students")); }

			res.status(200).json(data);
		})

	}

module.exports.addStudent =  (req, res, next) => {
		var student = req.body;

		var pupil = new studentModel(student);
		pupil.save((err, data) => {
			if(err) { return next(new Error("failed to add student")); }

			res.status(200).json(data);
		})

	}

module.exports.getStudent = (req, res, next) => { 

			if(!req.student) {return next(new Error("failed to get student")); }

			res.status(200).json(req.student);
		
	}

module.exports.removeStudent = (req, res, next) => {
		 
			/*if(!req.student.remove()) {return next(new Error("failed to delete student")); }

			res.status(200).json(req.student); */

			studentModel.remove({_id: req.student._id}, (err, res) => {

				if(err) {return next(new Error("failed to delete student")); }

			})

			res.status(200).json(req.student);
		}

module.exports.updateStudent =  (req, res, next) => {

			studentModel.update({_id: req.student['_id']}, req.body, (err, res) => {

				if(err) {return next(new Error("failed to update")); }
			})

			res.status(200).json(req.student);
		}


