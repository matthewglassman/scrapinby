var express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var News = require("./models/newsandreviews.js");
var Comments = require("./models/comments.js");

var PORT = process.env.PORT || 8080;

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.engine("handlebars", exphbs({deafultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"));

//require("./routes/apiroutes.js")(app);

mongoose.connect("mongodb://localhost/scrapinby");
var db = mongoose.connection;

db.on("error", function(err){
	console.log("Mongoose Say: ", err);
});

db.once("open", function(){
	console.log("Winner Winner Chicken Dinner!");
});

//When user requests the root, this route gets request and returns index or index.handlebars in this case.
app.get("/", function (req, res){
	res.render("index");
});


//When user clicks Scrape for New Articles this route will handle that call.
app.get("/scrapeit", function(req, res){
	var url = "http://www.newsobserver.com/news/local/"; //website to scrape

	request(url, function(err, resp, body){
		var $ = cheerio.load(body); //load the body of the document into Cheerio and assign it to $

		

		$("article").each(function(i, element){
			var result = [];

			result.title = $(element).find("h4").find("a").text();

			result.link = $(element).find("h4").find("a").attr("href");

			result.push({
				title: result.title,
				link: result.link
			});
		});

		var handlebarsObject = {
			scraped: true,
			News: result

		}
		res.render("index", handlebarsObject);
	});
	// now need to save freshly scraped articles to db.
	// 		var entry = new News(result);

	// 		console.log(entry);

	// 		entry.save(function(err, data){
	// 			if(err) {
	// 				console.log(err);
	// 			}else{
	// 				console.log(data);
	// 			}
	// 		});
	// 		// result.push({
	// 		// 	title: title,
	// 		// 	link: link,
	// 		// });
	// 	});
	// });
	// res.send("Done Scrapin");
});

//save a news article
app.post('/api/savingnews', function(req, res){

	//create a new instance of the news and reviews schema
	var entryinDB = new News(req.body);

	News.save(function(err, doc){
		if(err){
			console.log(err);
		}
	});
});

//get saved articles from the DB
app.get("/api/savednews", function(req, res){
	News.find({}, function(error, News){
		if(error){
			console.log(error);
		}else{
			var handlebarsObject = {
				savedDIV: true,
				KeptNews: News

			};

			res.render("news", handbarsObject);
		}
	});
});

//route for saving comments
app.post("/api/comments/:id", funciton(req, res){

	var newComment = new Comment(req.body);
	var id = req.params.id;

	newComment.save(function(error, comment){
		if(error){
			console.log("You tried to save a comment but " + error);
		}else{
			//find News Story to associate with this comment and update it with a new comment
			News.findOneAndUpdate({"_id":req.params.id}, {$push: {"comments": doc._id}}, {new: true})
			.exec(function(error, comment){
				if (error){
					console.log(err);
				}else{
					console.log(comment);
				}
			});
		}
	});
});

//route for returning saved comments and news article for a news item
app.get("/api/savedcomment/:id", function(req, res){
	News.findOne({"_id": req.params.id})
	.populate("comments")
	.exec(function(error, article){
		if (error){
			console.log(error);
		}else{
			sonsole.log(article)
			res.json(article)
		}
	});
});

//route for removing comments
app.delete("/api/removecomment/:id", function(req, res){
	Comments.findByIdAndRemove(req.params.id, function(error){
		if (error){
			console.log(error);
			res.send("Can not delete this because " + error);
		}else{
			console.log("The comment has been removed");
		}
	});
});

//route for removing saved News Article
app.delete("/api/removenews/:id", function(req, res){
	News.findByIdAndRemove(req.params.id, function(error){
		if (error){
			console.log(error);
			res.send("Can not remove this article because " + error);
		}else{
			console.log(Article removed);
			res.redirect("/news");
		}
	});
});


app.listen(PORT, function(){
	console.log("The app is listening on port" + PORT);
});