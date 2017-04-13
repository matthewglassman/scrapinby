//Functionality for pushing items to the database and deleting them from the database.
$("#scraperbutton").on("click", function(){
	$.get("/articles", function(news){});
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