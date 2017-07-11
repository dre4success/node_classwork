var mongoose 	= require("mongoose"),
	bcrypt      = require("bcrypt-nodejs"),
	userSchema;

	mongoose.connect("mongodb://localhost/student");

	userSchema = new mongoose.Schema({
		username: {type:String, required: true, unique: true},
		password: {type:String, required: true}
	});

	userSchema.pre('save', function(next) {
		this.password = this.encryptPassword(this.password);
		next();
	})

	userSchema.methods = {
		authenticate: function(plainText) {
			return bcrypt.compareSync(plainText, this.password);
		},

		encryptPassword: (plainText) => {
			if(!plainText) { return ""; }

			var salt = bcrypt.genSaltSync();
			return bcrypt.hashSync(plainText, salt);
		}
	}

	module.exports = mongoose.model("user", userSchema);