const express = require("express");
const router = express.Router();
const operations = require('../src/operations');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "ipl-data";
router.get('/', function(req,res){
	res.send("Main index");
});
router.get('/seasons', async function(req, res){
	const matchFile = "matches";
	const data = await operations.getSeason(MongoClient, url, dbName, matchFile)
	res.send(JSON.stringify(data));
});
router.get('/seasons/:year', async function(req, res){
	const matchFile = "matches";
	let year = parseInt(req.params.year)
	const data = await operations.getTeamName(MongoClient, url, dbName, matchFile, year);
	res.send(JSON.stringify(data));
});

module.exports = router;