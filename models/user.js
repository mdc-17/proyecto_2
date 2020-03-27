const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		//validate: /^[a-zA-Z]+(([‘,. -][a-zA-Z ])?[a-zA-Z]*)*$/g
	},
	email: {
		type: String,
		required: true,
		unique: true,
		//validate: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g
	},
	password: {
		type: String,
		required: true,
		//validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/g
	},
	photo_user:  { type: String },
	isHost: { type: Boolean, default: false },
	isGuest: { type: Boolean, default: true },
	requests: [ { type: String } ],
	phoneNumber: {type: Number, required: true} //validate: /1?-?\(?[0-9]{3}[\-\)][0-9]{3}-[0-9]{4}/g}
	
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
