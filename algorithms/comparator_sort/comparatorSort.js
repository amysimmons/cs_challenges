/*
Given an array of n Player objects, write a comparator that sorts them in order of decreasing score;
if 2 or more players have the same score, sort those players alphabetically by name.
*/

var players = [
	{
		name: 'david',
		score: 100
	},
	{
		name: 'amy',
		score: 100
	},
	{
		name: 'heraldo',
		score: 50
	},
	{
		name: 'aakansha',
		score: 75
	},
	{
		name: 'aleksa',
		score: 150
	},
	{
		name: 'tom',
		score: 200
	},
	{
		name: 'amy',
		score: 200
	},
	{
		name: 'steve',
		score: -10
	}
]

var sorted = false;

var swapPlayers = function(i) {
	var playerToSwap = players[i];

	players[i] = players[i + 1];
	players[i + 1] = playerToSwap;

	sorted = false;
}

var inOrder = function(p1, p2) {
	if (p1.score < p2.score) {
		return false;
	}

	if (p1.score == p2.score && p1.name > p2.name) {
		return false;
	}

	return true;
}

while(!sorted){
	sorted = true;

	for (var i = 0; i < players.length - 1; i++) {
		if (!inOrder(players[i], players[i + 1])) {
			swapPlayers(i)
		}
	}
}

console.log(players);

