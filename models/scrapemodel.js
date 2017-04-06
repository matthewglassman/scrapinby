var mongoose = require('mongoose');

var Schema = mongoose.Schema; //set the mongoose Schema method to a variable called Schema

var NewsAndReviewsSchema = new Schema({
	title: String,
	link: String,
	user: [{name: String}],
	comments: [{body: String, date: Date}]

});

module.export = mongoose.model('Notice', NewsAndReviewsSchema);