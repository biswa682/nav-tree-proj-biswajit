const express = require("express");
const app = express();
const router = require('./routes/router');

app.set("view engine", "ejs");
app.use(router);
app.use(express.static('src'));
app.listen(4444, function(){
	console.log("Server is running............");
})

