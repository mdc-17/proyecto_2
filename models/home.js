const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
	host: { type: Schema.Types.ObjectId, ref: 'User' },
	guest: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	hostRequest: String,
	location: String,
	address: String,
	homeImages: [ { type: String } ],
	services: [ { type: String } ]

	/* HE LEIDO QUE LOS CHECKBOX SE PUEDEN GESTIONAR COMO ARRAYS:
	https://dev.niamurrell.com/reference/2019-01-31-checkboxes-in-forms-with-body-parser/
	https://stackoverflow.com/questions/44266601/checkbox-data-with-mongodb

	wifi: { type: Boolean, default: false },
	washer: { type: Boolean, default: false },
	dryer: { type: Boolean, default: false },
	iron: { type: Boolean, default: false },
	hairDryer: { type: Boolean, default: false },
	towels: { type: Boolean, default: false },
	heating: { type: Boolean, default: false },
	airConditioner: { type: Boolean, default: false },
	tv: { type: Boolean, default: false } */
});

homeSchema.set('timestamps', true);

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
