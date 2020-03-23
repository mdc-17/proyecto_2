const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		match: [ /^[a-zA-Z]+(([‘,. -][a-zA-Z ])?[a-zA-Z]*)*$/g, 'is invalid' ]
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [ /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g, 'is invalid' ]
	},
	password: {
		type: String,
		required: true,
		match: [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/g, 'is invalid' ]
	},
	photo_user: String,
	isHost: { type: Boolean, default: false },
	isGuest: { type: Boolean, default: false },
	requests: [ { type: String } ],
	statusRequest: { type: String, enum: [ 'Aceptado', 'Denegado', 'Pendiente' ] },
	phoneNumber: {type: Number, required: true},
	
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
