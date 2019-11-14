var express = require('express');

var app = express();

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	console.log("Received a request for /");
	res.write("This is the root");
	res.end();
});

app.get("/home", function(req, res) {
	// Controller
	console.log("Received a request for /home");
	var name = getCurrentUser();
	var email = "john@email.com";

	var params = {username: name, emailAddress: email};

	res.render("home", params);
});

app.listen(process.env.PORT || 5000, function(req, res) {
	console.log("The server is up and listening on port 5000");
});

// Model
function getCurrentUser() {
	return "John";
}