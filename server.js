var express = require("express");

var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var News = require("./models/newsandreviews.js");
var Comments = require("./models/comments.js");

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scrapinby");
var db = mongoose.connection;

db.on("error", function(err){
	console.log("Mongoose Say: ", err);
});

db.once("open", function(){
	console.log("Winner Winner Chicken Dinner!");
});

var PORT = process.env.PORT || 8080;

app.get("/scrape", function(req, res){
	var url = "http://www.newsobserver.com/news/local/"; //website to scrape

	request(url, function(err, resp, body){
		var $ = cheerio.load(body);

		var result = {};

		$("article").each(function(i, element){

			var result.title = $(this).find("h4").find("a").text();

			var result.link = $(this).find("h4").find("a").attr("href");

			var entry = new newsandreviews(result);

			entry.save(function(err, data){
				if(err) {
					console.log(err);
				}else{
					console.log(data);
				}
			});
			// result.push({
			// 	title: title,
			// 	link: link,
			// });
		});
	});
	res.send("Done Scrapin");
});

app.get("/scrapedarticles", function(req, res){
	newsandreviews.find({}, function(error, articles){
		if(error){
			console.log(error);
		}else{
			res.json(articles);
		}
	});
});

app.get("/articles/:id", function(req, res){
	newsandreviews.findOne({"_id": req.params.id})
	.populate("comments")
	.exec(function(error, article){
		if (error){
			console.log(error);
		}else{
			res.json(article)
		}
	});
});

app.post("/articles/:id", function(req, res){
	var newComment = new Comment(req.body);

	newComment.save(function(error, comment){
		if(error){
			console.log(error);
		}else{
			newsandreviews.findOneAndUpdate({"_id": req.params.id}, {"comments": comment._id})
			.exec(function(err, doc){
				if (err) {
					console.log(err);
				}else{
					res.send(doc);
				}
			})
		}
	})
})
// app.listen(PORT, function(){
// 	console.log("The app is listening on port" + PORT);
// });