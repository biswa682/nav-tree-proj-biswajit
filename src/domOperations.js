async function createSeason(event){
	function getAllSeasons(){
		return $.ajax({
			url: '/seasons',
			type: 'GET',
			dataType:"json"
		});
	}
	let seasons = await getAllSeasons();
	for(i in seasons){
		let seasonNo = $('<ul></ul>').text(seasons[i]._id).attr({
			'id':seasons[i]._id,
			'class': 'season-list',
			'value': seasons[i]._id
		});
		let listItems = $('<li></li>');
		$(event).append(listItems);
		listItems.append(seasonNo);
	}

}
async function createTeam(event,season){
	function getAllTeam(season){
		return $.ajax({
			url: '/seasons/'+season,
			type: 'GET',
			dataType:"json"
		});
	}
	let team = await getAllTeam(season);
	for(i in team){
		let teamName = $('<ul></ul>').text(team[i]._id).attr({
			'id':team[i]._id,
			'class': 'team-list',
		});
		let listItems = $('<li></li>');
		$(event).append(listItems);
		listItems.append(teamName);
	}
}

async function createPlayer(event,season,team){
	function getAllTeam(season, team){
		return $.ajax({
			url: '/seasons/'+season+'/teams/'+team,
			type: 'GET',
			dataType:"json"
		});
	}
	let players = await getAllTeam(season, team);
	for(i in players){
		let player = $('<ul></ul>').text(players[i].playerName).attr({
			'id':+players[i].playerName,
			'class': 'player-list'
		});
		let listItems = $('<li></li>');
		$(event).append(listItems);
		listItems.append(player);
	}
}

$(document).ready(function(){
	$('#all-season').click(function(event){
		if(event.target.id === "all-season"){
			if($(event.target).children().length === 0){
				createSeason(event.target);
			}
			else{
				$(event.target).children().remove();
			}
		}
		if(event.target.className === "season-list"){
			if($(event.target).children().length === 0){
				createTeam(event.target, event.target.id);
			}
			else{
				$(event.target).children().remove();
			}
		}
		if(event.target.className === "team-list"){
			if($(event.target).children().length === 0){
				createPlayer(event.target, $(event.target).parent().parent()[0].id, event.target.id);
			}
			else{
				$(event.target).children().remove();
			}
		}
	});
})