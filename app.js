const express = require("express");
const app = express();
const router = require('./routes/router');

app.set("view engine", "ejs");
app.use(router);

app.listen(4444, function(){
	console.log("Server is running............");
})

