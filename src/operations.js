async function getSeason(MongoClient, url, dbName, matchFile){
	const conn = await MongoClient.connect(url, {useNewUrlParser: true});
	const iplData = conn.db(dbName);
	let matchDetails = await iplData.collection(matchFile).aggregate([
	{
		$group:{
			_id: "$season"
		}
	},
	{
		$sort:{
			_id: 1
		}
	}
	]).toArray();
	return matchDetails;
}


async function getTeamName(MongoClient, url, dbName, matchFile, year){
	const y = Number(year)
	const conn = await MongoClient.connect(url, {useNewUrlParser: true});
	const iplData = conn.db(dbName);
	let matchDetails = await iplData.collection(matchFile).aggregate([
	{
		$match: {
			season : y
		}
	},
	{
		$group:{
			_id: "$team1"
		}
	},
	{
		$sort:{
			_id: 1
		}
	}
	]).toArray();
	return matchDetails;
}

// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017";
// const dbName = "ipl-data";
// const matchFile = "matches";
// const deliveryFile = "deliveries"
// getTeamName(MongoClient, url, dbName, matchFile, 2014).then(function(data){
// 	console.log((data));
// });
async function getPlayer(MongoClient, url, dbName, matchFile, deliveryFile, year, teamName){
	const y = parseInt(year);
	// console.log(typeof(year));
	// console.log(typeof(teamName));
	const conn = await MongoClient.connect(url, {useNewUrlParser: true});
	const iplData = conn.db(dbName);
	let matchDetails = await iplData.collection(matchFile).aggregate([
	{
		$match:{
			season: y
		}
	},
	{
		$lookup:{
			"from": deliveryFile,
			"localField": "id",
			"foreignField": "match_id",
			"as": "deliveryDetails"
		}
	},
	{
		$unwind: "$deliveryDetails"
	},
	{
		$project:{
			team: "$deliveryDetails.batting_team",
			playerName: "$deliveryDetails.batsman"

		}
	},
	{
		$match:{
			team: teamName
		}
	},
	{
		$group:{
			_id: {
				team: "$team",
				name: "$playerName"
			}
		}
	},
	{
		$project:{
			_id : 0,
			playerName : "$_id.name"
		}
	},
	{
		$limit: 5
	}
	]).toArray();
	return matchDetails;
}


module.exports = {
	getSeason : getSeason,
	getTeamName: getTeamName,
	getPlayer : getPlayer
}


// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017";
// const dbName = "ipl-data";
// const matchFile = "matches";
// const deliveryFile = "deliveries"
// getPlayer(MongoClient, url, dbName, matchFile, deliveryFile, 2017, "Delhi Daredevils").then(function(data){
// 	console.log(data);
// });