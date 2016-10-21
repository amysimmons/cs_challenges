var input = {
	rows: 4,
	cols: 4,
	values: [
		[1, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[1, 0, 0, 0]
	]
}


var countRegionCells = function (grid, y, x) {
	var region = [];

		if(grid[y] != undefined) {
			region.push(
				grid[y][x],
				grid[y][x + 1],
				grid[y][x - 1]
			)
		}

		if(grid[y + 1] != undefined){
			region.push(
				grid[y + 1][x],
				grid[y + 1][x - 1],
				grid[y + 1][x + 1]
			)
		}

		if(grid[y - 1] != undefined) {
			region.push(
				grid[y - 1][x],
				grid[y - 1][x - 1],
				grid[y - 1][x + 1]
			)
		}

	var sum = 0;

	region.forEach((cell) => {
		if (cell != undefined){
			sum += cell;
		}
	})

	return sum;
}
