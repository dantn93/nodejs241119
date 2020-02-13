const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('../common/utils');

const userSchema = new Schema({
	_id: String,
	avatar: String,
	firstName: String,
	lastName: String,
	password: String,
	dob: Date,
	gender: String,
	country: String,
	phoneNumber: String,
	zipcode: Number,
	username: {
		type: String,
		validate: {
			validator: validator.validateUsername,
			message: 'invalid username',
		}
	},
	email: {
		type: String,
		validate: {
			validator: validator.validateEmail,
			message: 'invalid email',
		}
	},
	emailVerified: Boolean,
	role: String,
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
