var Article = require("../models/newsandreviews.js");
var Comments = require("../models/comments.js");

var express = require("express");

var cheerio = require("cheerio");
var requrest = require("request");

var exphbs = require("express-handlebars");

module.exports = function(app){
	app.get("/scrape", function(req, res){
	var url = "http://www.newsobserver.com/news/local/"; //website to scrape

	request(url, function(err, resp, body){
		var $ = cheerio.load(body);

		var result = {};

		$("article").each(function(i, element){

			var title = $(this).find("h4").find("a").text();

			var link = $(this).find("h4").find("a").attr("href");

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
		Article.find({}, function(error, articles){
			if(error){
				console.log(error);
			}else{
				res.json(articles);
			}
		});
	});

	app.get("/articles/:id", function(req, res){
		News.findOne({"_id": req.params.id})
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
		var newComment = new Comments(req.body);

		newComment.save(function(error, comment){
			if(error){
				console.log(error);
			}else{
				News.findOneAndUpdate({"_id": req.params.id}, {"comments": comment._id})
				.exec(function(err, doc){
					if (err) {
						console.log(err);
					}else{
						res.send(doc);
					}
				})
			}
		});
	});

		app.get("/delete/:id", function(req, res){
			News.remove({
				"_id": req.params.id
			})
			.exec(function(err, doc){
				if (err){
					console.log(err);			
				}else{
					res.send(doc);
				}
			});
	});

}
