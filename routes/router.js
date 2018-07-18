const express = require("express");
const router = express.Router();
const operations = require('../src/operations');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "ipl-data";
router.get('/', async function(req,res){
	res.render('index');
});
router.get('/seasons', async function(req, res){
	const matchFile = "matches";
	const data = await operations.getSeason(MongoClient, url, dbName, matchFile)
	res.send(data);
});
router.get('/seasons/:season', async function(req, res){
	const matchFile = "matches";
	const data = await operations.getTeamName(MongoClient, url, dbName, matchFile, req.params.season);
	res.send(JSON.stringify(data));
});
router.get('/seasons/:season/teams/:teamName',async function(req, res){
	const matchFile = "matches";
	const deliveryFile = "deliveries";
	const data = await operations.getPlayer(MongoClient, url, dbName, matchFile, deliveryFile, req.params.season, req.params.teamName);
	res.send(data);
});
module.exports = router;