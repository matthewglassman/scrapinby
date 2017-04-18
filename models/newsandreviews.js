var mongoose = require('mongoose');

var Schema = mongoose.Schema; //set the mongoose Schema method to a variable called Schema

var NewsAndReviewsSchema = new Schema({
	title: String,
	link: String,
	saved:{
		type: Boolean,
		default: false
	},
	comments:[{
		type: Schema.ObjectId,
		ref: 'Comment'
	}]
	// user: [{name: String}],
	// comments: [{body: String, date: Date}]

});

var News = mongoose.model('News', NewsAndReviewsSchema);
module.exports = News;
