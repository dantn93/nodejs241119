const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: String,
	avatar: String,
	firstName: String,
	lastName: String,
	dob: Date,
	gender: String,
	country: String,
	phoneNumber: String,
	zipcode: Number,
	username: String,
	email: String,
	emailVerified: Boolean,
	role: String,
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
