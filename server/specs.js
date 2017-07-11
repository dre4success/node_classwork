
var app 		= require("./server.js"),
	request 	= require("supertest"),
	chai 	    = require("chai"),
	assert 		= chai.assert,
	expect 		= chai.expect,
	should 		= chai.should();


	describe("Student Endpoints", function() {

		it.skip("should fetch all students", function(next) {
			request(app)
				.get("/api/v1/students")
				.expect(200)  // expect used here belongs to supertest
				.expect("Content-Type", "Application/json")
				.end(function(err, res) {
					expect(res.body).to.be.an("array");
					assert.isArray(res.body);
					res.body.should.be.json;
					next();
				})

		});

		it("should fetch student by id", (next) => {
			var data = {'name': "James", 'role': "Lecturer"};
			request(app)
				.post("/api/v1/students")
				.send(data)
				.set("Content-Type", "Application/json")
				.end((err, res) => {
					request(app)
						.get("/api/v1/students/" + res.body._id)
						.expect(200)
						.expect("Content-Type", "Application/json")
						.end((err, res) => {
							expect(res.body).to.be.an("object");
							res.body.should.have.property('_id').eql(res.body._id);
							next();
						})
				})
		})

		it.skip("should post into the student database", (next) => {

			var data = {'name': "Jonny", 'role': "student"};
			request(app)
				.post("/api/v1/students")
				.send(data)
				.set("Content-Type", "Application/json")
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.be.an("object");
					expect(res.body.name).to.be.equal("Jonny");
					expect(res.body.role).to.be.equal("student");
					assert.isNotArray(res.body);
					res.body.should.be.json;
					next();
				})

		})

		it.skip("should delete from student", (next) => {
			var data = {'name': "TomTom", 'role': "student"};
			request(app)
				.post("/api/v1/students")
				.send(data)
				.set("Content-Type", "Application/json")
				.end((err, res) => {
					var id = res.body._id;
					request(app)
					.delete("/api/v1/students/" + id) 
					.end((err, res) => {
						request(app)
						.get("/api/v1/students/" + id)
						.end((err, res) => {
							expect(res.body).to.be.an.empty("object");
						})
						next();
					})
		})

	})


		it.skip("should update student", (next) => {
			var data = {'name': "P Square", 'role': "Artist"};
			var newData = {'name': "Tu Face", 'role': "Musician"};
			request(app)
				.post("/api/v1/students")
				.send(data)
				.set("Content-Type", "Application/json")
				.end((err, res) => {
					//var id = res.body._id;
							request(app)
								.put("/api/v1/students/" + res.body._id)
								.send(newData)
								.end((err, res) => {
									//console.log(newData)
									expect(res.body).to.be.an("object");
									//expect(res.body.name).to.be.equal("Supergirl");
									//expect(res.body.role).to.be.equal("protector");
									 //res.body.should.have.property('name').eql('Supergirl');
                    				//res.body.book.should.have.property('role').eql('protector');	
									//assert.isNotArray(res.body);
									res.body.should.be.json;
									next();
								})
								
						})
						
				})

});

	