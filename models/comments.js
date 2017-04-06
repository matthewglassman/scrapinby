var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	comments: [{body: String, date: Date}]
});

module.export = mongoose.model('Comment', CommentSchema);