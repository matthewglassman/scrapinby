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
$(document).on("click", "#save", function(e) {
	e.preventDefault();

	$(this).attr("data-status", true);

	var newsId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/api/savednews/" + newsId,
		data: {
			// title: $("#newstitle").val(),
			// link: $("#newslink").val()
			saved: true
		}
	}).done(function(data){
		console.log(data);
	});
});

//delete an article from database
$(document).on("click", "#remove", function(e){
	
	$("this").attr("data-status", false);

	var newsId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/api/removenews/" + newsId,
		data: {
			// title: $("#newstitle").val(),
			// link: $("newslink").val()
			saved: false
		}
	}).done(function(data){
		console.log(data);
	});
});


//Save a Comment to database
$(document).on("click", "#save", function(e){
	e.preventDefault();

	var commentId = $(this).attr("data-id:");
	
	$.ajax({
		method: "POST",
		url: "/api/comments/" + commentId,
		data: {
			title: $("#newstitle").val(),
			body: $("commentbody").val()

		}
	}).done(function(data){
		$(".addComment").empty();
		console.log(data);
	});
	$("#commenttitle").val("");
	$("#commentbody").val("");
});