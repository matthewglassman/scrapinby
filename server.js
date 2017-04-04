var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
	console.log("The app is listening on port" + PORT);
});