var express = require('express');

var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

// var app = express();

// var PORT = process.env.PORT || 8080;

var url = "http://www.newsobserver.com/news/local/"; //website to scrape

	request(url, function(err, resp, body){
		var $ = cheerio.load(body);

		var result = [];

		$("article").each(function(i, element){

			var title = $(this).find("h4").find("a").text();

			var link = $(this).find("h4").find("a").attr("href");

			result.push({
				title: title,
				link: link,
			});
		});
		console.log(result);

	});

// app.listen(PORT, function(){
// 	console.log("The app is listening on port" + PORT);
// });