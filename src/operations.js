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
	const conn = await MongoClient.connect(url, {useNewUrlParser: true});
	const iplData = conn.db(dbName);
	let matchDetails = await iplData.collection(matchFile).aggregate([
	{
		$match: {
			season : year
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

async function getPlayer(MongoClient, url, dbName, matchFile, year, playerName){
	const conn = await MongoClient.connect(url, {useNewUrlParser: true});
	const iplData = conn.db(dbName);
	let matchDetails = await iplData.collection(matchFile).aggregate([

	]).toArray();
	return matchDetails;
}
module.exports = {
	getSeason : getSeason,
	getTeamName: getTeamName
}


// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017";
// const dbName = "ipl-data";
// const matchFile = "matches";
// getTeamName(MongoClient, url, dbName, matchFile, 2016).then(function(data){
// 	console.log(data);
// });
