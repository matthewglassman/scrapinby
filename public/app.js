$(document).ready(function(){
	
	function saveNews(scrapedNews){
		$.post("/api/savingnews", scrapedNews, function(){
			window.location.href = "/savednews"
		});
	},

	function saveComments(newComment){
		$.post("/api/comments/:id", newComment, function(){
			window.location.href = "/api/savedcomments" + newComment.newsId;
		});
	},
	
})


//Functionality for pushing items to the database and deleting them from the database.
$("#scraperbutton").on("click", function(){
	$.get("/scrape", function(data){});
});

$("#savedarticles").on("click", function(){
	$.get("/saved")
});

$(document).on("click", "#save", function() {
	var newsId = $(this).attr("data-id");

	$.ajax({
		method: "POST",
		url: "/articles/" + newsId,
		data: {
			title: $("#newstitle").val(),
			link: $("#newslink").val()
		}
	})
	.done(function(data){
		console.log(data);
	});
});