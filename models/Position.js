var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const SECONDS = 1;
var EXPIRES = 60 * 60 * SECONDS; // change back to 1 min instead of 1 hour
var PositionSchema = new Schema({
	//Make sure that next line reflects your User-model
	user: { type: Schema.ObjectId, ref: 'User', required: true },
	created: { type: Date, expires: EXPIRES, default: Date.now },
	loc: {
		type: { type: String, enum: ['Point'], default: 'Point', required: true },
		coordinates: {
			type: [Number],
			required: true
		}
	}
});
PositionSchema.index({ loc: '2dsphere' }, { background: true });

module.exports = mongoose.model('Position', PositionSchema);
