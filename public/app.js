// $(document).ready(function(){
	
// 	function saveNews(scrapedNews){
// 		$.post("/api/savingnews", scrapedNews, function(){
// 			window.location.href = "/savednews"
// 		});
// 	},

// 	function saveComments(newComment){
// 		$.post("/api/comments/:id", newComment, function(){
// 			window.location.href = "/api/savedcomments" + newComment.newsId;
// 		});
// 	},

// 	$('#')

// })


//Functionality for pushing items to the database and deleting them from the database.
// $("#scraperbutton").on("click", function(){
// 	$.get("/scrape", function(data){});
// });

// $("#savedarticles").on("click", function(){
// 	$.get("/saved")
// });

//save an article to database
$(document).on("click", "#save", function() {
	var newsId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/api/savednews/" + newsId,
		data: {
			title: $("#newstitle").val(),
			link: $("#newslink").val()
		}
	}).done(function(data){
		console.log(data);
	});
});

//delete an article from database
$(document).on("click", "#remove", function(){
	var newsId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/api/removenews/" + newsId,
		data: {
			title: $("#newstitle").val(),
			link: $("newslink").val()
		}
	}).done(function(data){
		console.log(data);
	});
});

//Save a Comment to database
$(document).on("click", "#save", function(){
	var commentId = $(this).attr("data-id:");
	$.ajax({
		method: "POST",
		url: "/api/comments/" + commentId,
		data: {

		}
	}).done(function(data){
		console.log(data);
	});
});