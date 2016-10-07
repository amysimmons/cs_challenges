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

]

var sorted = false;

var inAlphabeticalOrder = function(p1, p2) {
	if (p1.name <= p2.name) {
		return true
	}
	return false;
}

while(!sorted){
	sorted = true;

	for (var i = 0; i < players.length - 1; i++) {
		if (players[i].score < players[i + 1].score) {
			var playerToSwap = players[i];

			players[i] = players[i + 1];
			players[i + 1] = playerToSwap;

			sorted = false;
		}
		if (players[i].score == players[i + 1].score) {
			if (!inAlphabeticalOrder(players[i], players[i + 1])) {
				var playerToSwap = players[i];

				players[i] = players[i + 1];
				players[i + 1] = playerToSwap;

				sorted = false;
			}

		}
	}
	console.log(players);
}

